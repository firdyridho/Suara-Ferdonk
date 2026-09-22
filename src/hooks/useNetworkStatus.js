import { useState, useEffect } from 'react';

export function useNetworkStatus() {
  const [status, setStatus] = useState({
    online: navigator.onLine,
    latency: null,
    connectionType: navigator.connection?.effectiveType || 'unknown',
    quality: navigator.onLine ? 'good' : 'offline',
  });

  useEffect(() => {
    const handleOnline = () => setStatus(prev => ({ ...prev, online: true, quality: 'good' }));
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

    setStatus(prev => ({ ...prev, online: navigator.onLine }));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
}
