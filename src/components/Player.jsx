import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ConnectionStatus from './ConnectionStatus';

export default function Player({ networkStatus }) {
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const mountedRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const bg = theme === 'dark' ? 'bg-[#18181B]' : 'bg-white';
  const border = theme === 'dark' ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';
  const controlBg = theme === 'dark' ? 'bg-[#27272A]' : 'bg-[#F4F4F5]';

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.onplaying = null;
      audioRef.current.onpause = null;
      audioRef.current.onwaiting = null;
      audioRef.current.onerror = null;
      audioRef.current.oncanplay = null;
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; cleanup(); };
  }, [cleanup]);

  const startStream = useCallback(async () => {
    cleanup();
    if (!mountedRef.current) return;
    setIsLoading(true);
    setHasError(false);
    setErrorMsg('');

    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = isMuted ? 0 : volume;
    audio.src = station.streamUrl;

    audio.onplaying = () => {
      if (!mountedRef.current) return;
      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
    };
    audio.onpause = () => { if (mountedRef.current) setIsPlaying(false); };
    audio.onwaiting = () => { if (mountedRef.current) setIsLoading(true); };
    audio.oncanplay = () => { if (mountedRef.current) setIsLoading(false); };
    audio.onerror = () => {
      if (!mountedRef.current) return;
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
      setErrorMsg('Stream tidak tersedia dari jaringan ini');
    };

    audioRef.current = audio;

    try {
      const playPromise = audio.play();
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000));
      await Promise.race([playPromise, timeout]);
    } catch (err) {
      if (!mountedRef.current) return;
      setIsLoading(false);
      setHasError(true);
      if (err.message === 'timeout') {
        setErrorMsg('Stream lambat dari jaringan ini');
      } else if (err.name === 'NotAllowedError') {
        setErrorMsg('Klik play untuk memulai');
      } else {
        setErrorMsg('Tidak bisa terhubung ke stream');
      }
    }
  }, [volume, isMuted, cleanup]);

  const togglePlay = () => {
    if (isPlaying) { audioRef.current?.pause(); }
    else { startStream(); }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) { audioRef.current.volume = volume; setIsMuted(false); }
    else { audioRef.current.volume = 0; setIsMuted(true); }
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) audioRef.current.volume = val;
  };

  return (
    <div className={`w-full max-w-xl mx-auto rounded-xl border overflow-hidden ${bg} ${border}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${border}`}>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="w-6 h-6 object-contain" />
          <div>
            <p className={`text-[11px] uppercase tracking-wider font-semibold ${muted}`}>Now Playing</p>
            <p className={`text-sm font-semibold ${text}`}>{station.name}</p>
          </div>
        </div>
        <a
          href={station.tuneinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            theme === 'dark'
              ? 'bg-[#27272A] text-[#E4E4E7] hover:bg-[#DD7C2B]/20 hover:text-[#DD7C2B]'
              : 'bg-[#F4F4F5] text-[#18181B] hover:bg-[#DD7C2B]/10 hover:text-[#DD7C2B]'
          }`}
        >
          TuneIn
          <ExternalLink size={10} className="opacity-40" />
        </a>
      </div>

      {/* Controls */}
      <div className="px-4 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              isPlaying ? 'bg-[#DD7C2B] text-white' : `${controlBg} ${text}`
            } disabled:opacity-50`}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : hasError ? (
              <AlertCircle size={18} className="text-red-500" />
            ) : isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            {hasError ? (
              <div>
                <p className="text-sm font-medium text-red-500">{errorMsg}</p>
                <a
                  href={station.tuneinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#DD7C2B] hover:underline mt-1"
                >
                  Dengarkan via TuneIn
                  <ExternalLink size={9} />
                </a>
              </div>
            ) : isPlaying ? (
              <p className={`text-sm font-medium ${text}`}>Sedang diputar</p>
            ) : isLoading ? (
              <p className={`text-sm ${muted}`}>Menghubungkan...</p>
            ) : (
              <p className={`text-sm ${muted}`}>Tekan play untuk mendengarkan</p>
            )}
            {!hasError && <p className={`text-[11px] mt-0.5 ${muted}`}>MP3 &middot; 128kbps</p>}
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={toggleMute} className={`p-1.5 rounded-md ${muted} transition-colors`}>
              {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input
              type="range" min="0" max="1" step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-16 h-1 rounded-full appearance-none cursor-pointer bg-[#DD7C2B]/20 accent-[#DD7C2B]"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={`px-4 py-2.5 border-t ${border}`}>
        <ConnectionStatus networkStatus={networkStatus} />
      </div>
    </div>
  );
}
