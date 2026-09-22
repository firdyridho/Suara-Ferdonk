import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ConnectionStatus from './ConnectionStatus';
import TuneInButton from './TuneInButton';
import AudioVisualizer from './AudioVisualizer';

export default function Player({ networkStatus }) {
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [streamInfo] = useState({ bitrate: '128kbps', format: 'MP3' });

  const createAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none';
    audio.src = station.streamUrl + '?nocache=' + Date.now();
    audio.volume = isMuted ? 0 : volume;

    audio.addEventListener('playing', () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
    });

    audio.addEventListener('waiting', () => {
      setIsLoading(true);
    });

    audio.addEventListener('error', () => {
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    });

    audioRef.current = audio;
    return audio;
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
      }
    };
  }, []);

  const togglePlay = async () => {
    if (hasError) {
      setHasError(false);
      const audio = createAudio();
      try {
        setIsLoading(true);
        await audio.play();
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
      return;
    }

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    } else if (audioRef.current) {
      try {
        setIsLoading(true);
        await audioRef.current.play();
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    } else {
      const audio = createAudio();
      try {
        setIsLoading(true);
        await audio.play();
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const restartStream = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    setHasError(false);
    setIsPlaying(false);
    setIsLoading(false);
    const audio = createAudio();
    audio.load();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className={`rounded-2xl overflow-hidden transition-all ${
        theme === 'dark'
          ? 'bg-dark-card/50 border border-dark-border shadow-2xl shadow-black/30'
          : 'bg-white/80 border border-light-border shadow-xl shadow-black/5'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-3 border-b ${
          theme === 'dark' ? 'border-dark-border' : 'border-light-border'
        }`}>
          <div className="flex items-center gap-3">
            <AudioVisualizer isPlaying={isPlaying} size="sm" />
            <div>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                Now Playing
              </p>
              <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
                {station.name}
              </p>
            </div>
          </div>
          <TuneInButton />
        </div>

        {/* Player Controls */}
        <div className={`px-5 py-6 ${
          theme === 'dark' ? 'bg-dark-surface/30' : 'bg-gray-50/50'
        }`}>
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <motion.button
              onClick={togglePlay}
              disabled={isLoading && !hasError}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/30 disabled:opacity-60"
            >
              {isLoading && !hasError ? (
                <Loader2 size={24} className="animate-spin" />
              ) : hasError ? (
                <AlertCircle size={24} />
              ) : isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} className="ml-1" />
              )}

              {/* Pulse ring when playing */}
              {isPlaying && (
                <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
              )}
            </motion.button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hasError ? 'error' : isPlaying ? 'playing' : 'stopped'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  {hasError ? (
                    <span className="text-red-400 text-sm font-medium">Connection failed</span>
                  ) : isPlaying ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
                        Live Streaming
                      </span>
                    </>
                  ) : (
                    <span className={`text-sm ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                      {isLoading ? 'Buffering...' : 'Ready to play'}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                  {streamInfo.format} &middot; {streamInfo.bitrate}
                </span>
                {hasError && (
                  <button
                    onClick={restartStream}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-light"
                  >
                    <RotateCcw size={10} />
                    Retry
                  </button>
                )}
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-dark-muted hover:text-white hover:bg-white/5'
                    : 'text-light-muted hover:text-dark-text hover:bg-black/5'
                }`}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 rounded-full appearance-none cursor-pointer bg-primary/20 accent-primary
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:shadow-primary/30 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {/* Progress bar (indeterminate for live) */}
          <div className="mt-4 h-1 rounded-full overflow-hidden bg-primary/10">
            {isPlaying ? (
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ width: '40%' }}
              />
            ) : (
              <div className={`h-full rounded-full ${theme === 'dark' ? 'bg-dark-border' : 'bg-light-border'}`} />
            )}
          </div>
        </div>

        {/* Network Status */}
        <div className={`px-5 py-3 border-t ${
          theme === 'dark' ? 'border-dark-border' : 'border-light-border'
        }`}>
          <ConnectionStatus networkStatus={networkStatus} />
        </div>
      </div>
    </motion.div>
  );
}
