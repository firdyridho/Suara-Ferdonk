import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ConnectionStatus from './ConnectionStatus';
import TuneInButton from './TuneInButton';

export default function Player({ networkStatus }) {
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const bg = theme === 'dark' ? 'bg-[#18181B]' : 'bg-white';
  const border = theme === 'dark' ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';
  const controlBg = theme === 'dark' ? 'bg-[#27272A]' : 'bg-[#F4F4F5]';

  const createAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    const audio = new Audio();
    audio.preload = 'none';
    audio.src = station.streamUrl;
    audio.volume = isMuted ? 0 : volume;

    audio.addEventListener('playing', () => { setIsPlaying(true); setIsLoading(false); setHasError(false); });
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('waiting', () => setIsLoading(true));
    audio.addEventListener('error', () => { setIsPlaying(false); setIsLoading(false); setHasError(true); });

    audioRef.current = audio;
    return audio;
  }, [volume, isMuted]);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  const togglePlay = async () => {
    if (hasError) {
      setHasError(false);
      const audio = createAudio();
      try { setIsLoading(true); await audio.play(); } catch { setHasError(true); setIsLoading(false); }
      return;
    }
    if (isPlaying) {
      audioRef.current?.pause();
    } else if (audioRef.current) {
      try { setIsLoading(true); await audioRef.current.play(); } catch { setHasError(true); setIsLoading(false); }
    } else {
      const audio = createAudio();
      try { setIsLoading(true); await audio.play(); } catch { setHasError(true); setIsLoading(false); }
    }
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
        <TuneInButton />
      </div>

      {/* Controls */}
      <div className="px-4 py-5">
        <div className="flex items-center gap-4">
          {/* Play Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading && !hasError}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isPlaying
                ? 'bg-[#DD7C2B] text-white'
                : `${controlBg} ${text}`
            } disabled:opacity-50`}
          >
            {isLoading && !hasError ? (
              <Loader2 size={18} className="animate-spin" />
            ) : hasError ? (
              <AlertCircle size={18} className="text-red-500" />
            ) : isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
          </button>

          {/* Status */}
          <div className="flex-1 min-w-0">
            {hasError ? (
              <p className="text-sm font-medium text-red-500">Koneksi gagal</p>
            ) : isPlaying ? (
              <p className={`text-sm font-medium ${text}`}>Sedang diputar</p>
            ) : isLoading ? (
              <p className={`text-sm ${muted}`}>Memuat...</p>
            ) : (
              <p className={`text-sm ${muted}`}>Tekan play untuk mendengarkan</p>
            )}
            <p className={`text-[11px] mt-0.5 ${muted}`}>MP3 &middot; 128kbps</p>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-1.5">
            <button onClick={toggleMute} className={`p-1.5 rounded-md ${muted} hover:${text} transition-colors`}>
              {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-16 h-1 rounded-full appearance-none cursor-pointer bg-[#DD7C2B]/20 accent-[#DD7C2B]"
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className={`px-4 py-2.5 border-t ${border}`}>
        <ConnectionStatus networkStatus={networkStatus} />
      </div>
    </div>
  );
}
