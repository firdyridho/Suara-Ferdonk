import { useState, useEffect, useCallback, useRef } from 'react';

export function useNetworkStatus() {
  const [status, setStatus] = useState({
    online: navigator.onLine,
    latency: null,
    connectionType: navigator.connection?.effectiveType || 'unknown',
    quality: 'checking',
    lastChecked: null,
  });

  const intervalRef = useRef(null);

  const checkLatency = useCallback(async () => {
    if (!navigator.onLine) {
      setStatus(prev => ({ ...prev, online: false, quality: 'offline' }));
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const start = performance.now();
      await fetch('https://uk15freenew.listen2myradio.com/', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const latency = Math.round(performance.now() - start);

      let quality = 'good';
      if (latency > 500) quality = 'poor';
      else if (latency > 200) quality = 'fair';

      setStatus(prev => ({
        ...prev,
        online: true,
        latency,
        quality,
        lastChecked: Date.now(),
      }));
    } catch {
      // Offline or timeout — don't mark as poor if just a slow CORS response
      setStatus(prev => ({
        ...prev,
        online: navigator.onLine,
        latency: null,
        quality: navigator.onLine ? 'good' : 'offline',
        lastChecked: Date.now(),
      }));
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({ ...prev, online: true, quality: 'checking' }));
      checkLatency();
    };
    const handleOffline = () => setStatus(prev => ({ ...prev, online: false, quality: 'offline', latency: null }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

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

    checkLatency();
    intervalRef.current = setInterval(checkLatency, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [checkLatency]);

  return status;
}
