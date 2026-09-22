import { useState, useEffect, useCallback, useRef } from 'react';

export function useNetworkStatus() {
  const [status, setStatus] = useState({
    online: navigator.onLine,
    latency: null,
    connectionType: 'unknown',
    quality: 'unknown',
    lastChecked: null,
  });

  const intervalRef = useRef(null);

  const checkLatency = useCallback(async () => {
    try {
      const start = performance.now();
      await fetch('https://cdn.cloud.caster.fm/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
      const latency = Math.round(performance.now() - start);

      let quality = 'good';
      if (latency > 300) quality = 'poor';
      else if (latency > 150) quality = 'fair';

      setStatus(prev => ({
        ...prev,
        latency,
        quality,
        lastChecked: Date.now(),
      }));
    } catch {
      setStatus(prev => ({
        ...prev,
        latency: null,
        quality: 'poor',
        lastChecked: Date.now(),
      }));
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => setStatus(prev => ({ ...prev, online: true }));
    const handleOffline = () => setStatus(prev => ({ ...prev, online: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Connection type
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const updateConnection = () => {
        setStatus(prev => ({
          ...prev,
          connectionType: conn.effectiveType || conn.type || 'unknown',
        }));
      };
      updateConnection();
      conn.addEventListener('change', updateConnection);
    }

    // Initial check
    checkLatency();

    // Periodic check every 30s
    intervalRef.current = setInterval(checkLatency, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [checkLatency]);

  return status;
}
