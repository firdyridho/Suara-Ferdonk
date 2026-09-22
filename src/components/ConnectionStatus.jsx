import { Wifi, WifiOff, Signal, SignalHigh, SignalMedium, SignalLow } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ConnectionStatus({ networkStatus }) {
  const { theme } = useTheme();
  const { online, latency, connectionType, quality } = networkStatus;

  const qualityConfig = {
    good: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', label: 'Excellent' },
    fair: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', label: 'Good' },
    poor: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', label: 'Weak' },
    unknown: { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', label: 'Unknown' },
  };

  const q = qualityConfig[quality] || qualityConfig.unknown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-wrap items-center gap-3 text-xs font-medium ${
        theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
      }`}
    >
      {/* Online Status */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
        online
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          : 'bg-red-500/10 text-red-400 border-red-500/20'
      }`}>
        {online ? <Wifi size={12} /> : <WifiOff size={12} />}
        <span>{online ? 'Connected' : 'Disconnected'}</span>
      </div>

      {/* Latency */}
      {latency !== null && (
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${q.bg} ${q.color} ${q.border}`}>
          {quality === 'good' && <SignalHigh size={12} />}
          {quality === 'fair' && <SignalMedium size={12} />}
          {quality === 'poor' && <SignalLow size={12} />}
          {quality === 'unknown' && <Signal size={12} />}
          <span>{latency}ms</span>
        </div>
      )}

      {/* Connection Type */}
      {connectionType && connectionType !== 'unknown' && (
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
          theme === 'dark'
            ? 'bg-dark-card border-dark-border'
            : 'bg-light-bg border-light-border'
        }`}>
          <span className={`uppercase tracking-wider ${q.color}`}>{connectionType}</span>
        </div>
      )}

      {/* Quality Label */}
      {quality !== 'unknown' && (
        <span className={`hidden sm:inline ${q.color}`}>{q.label}</span>
      )}
    </motion.div>
  );
}
