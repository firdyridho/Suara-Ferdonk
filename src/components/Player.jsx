import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ConnectionStatus from './ConnectionStatus';
import TuneInButton from './TuneInButton';

export default function Player({ networkStatus }) {
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const casterRef = useRef(null);
  const casterScriptRef = useRef(false);
  const mountedRef = useRef(true);

  const [mode, setMode] = useState('direct'); // 'direct' or 'embed'
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

  // Cleanup audio
  const cleanupAudio = useCallback(() => {
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

  // Switch to Caster FM embed fallback
  const switchToEmbed = useCallback(() => {
    if (mode === 'embed') return;
    cleanupAudio();
    setIsPlaying(false);
    setIsLoading(false);
    setHasError(false);
    setMode('embed');

    // Load Caster FM embed script after mount
    setTimeout(() => {
      if (!mountedRef.current || !casterRef.current) return;
      casterRef.current.innerHTML = '';

      const embedDiv = document.createElement('div');
      embedDiv.className = 'cstrEmbed';
      embedDiv.setAttribute('data-type', 'newStreamPlayer');
      embedDiv.setAttribute('data-publicToken', station.caster.publicToken);
      embedDiv.setAttribute('data-theme', station.caster.theme);
      embedDiv.setAttribute('data-color', station.caster.color);
      embedDiv.setAttribute('data-channelId', '');
      embedDiv.setAttribute('data-rendered', 'false');

      ['Shoutcast Hosting', 'Stream Hosting', 'Radio Server Hosting'].forEach((text) => {
        const a = document.createElement('a');
        a.href = 'https://www.caster.fm';
        a.textContent = text;
        embedDiv.appendChild(a);
      });

      casterRef.current.appendChild(embedDiv);

      if (!casterScriptRef.current) {
        const script = document.createElement('script');
        script.src = '//cdn.cloud.caster.fm//widgets/embed.js';
        script.async = true;
        document.body.appendChild(script);
        casterScriptRef.current = true;
      }
    }, 100);
  }, [mode, cleanupAudio]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cleanupAudio();
    };
  }, [cleanupAudio]);

  // Direct stream
  const startDirectStream = useCallback(async () => {
    cleanupAudio();
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
      setErrorMsg('Stream tidak tersedia — switch ke player online');
      // Auto-fallback to Caster FM embed
      setTimeout(() => switchToEmbed(), 500);
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
        setErrorMsg('Stream lambat — switch ke player online');
        setTimeout(() => switchToEmbed(), 500);
      } else if (err.name === 'NotAllowedError') {
        setErrorMsg('Klik play untuk memulai');
      } else {
        setErrorMsg('Gagal terhubung — switch ke player online');
        setTimeout(() => switchToEmbed(), 500);
      }
    }
  }, [volume, isMuted, cleanupAudio, switchToEmbed]);

  const togglePlay = () => {
    if (mode === 'embed') return; // Caster FM embed handles its own play
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      startDirectStream();
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
        <div className="flex items-center gap-2">
          {mode === 'direct' && (
            <button
              onClick={switchToEmbed}
              className={`text-[10px] font-medium px-2 py-1 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-[#27272A] text-[#A1A1AA] hover:text-[#DD7C2B]'
                  : 'bg-[#F4F4F5] text-[#71717A] hover:text-[#DD7C2B]'
              }`}
            >
              Player Online
            </button>
          )}
          <TuneInButton />
        </div>
      </div>

      {/* Direct mode */}
      {mode === 'direct' && (
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
                <p className="text-sm font-medium text-red-500">{errorMsg}</p>
              ) : isPlaying ? (
                <p className={`text-sm font-medium ${text}`}>Sedang diputar</p>
              ) : isLoading ? (
                <p className={`text-sm ${muted}`}>Menghubungkan...</p>
              ) : (
                <p className={`text-sm ${muted}`}>Tekan play untuk mendengarkan</p>
              )}
              <p className={`text-[11px] mt-0.5 ${muted}`}>Direct Stream &middot; MP3 &middot; 128kbps</p>
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
      )}

      {/* Embed mode */}
      {mode === 'embed' && (
        <div className="relative">
          <div
            ref={casterRef}
            className={`min-h-[80px] ${theme === 'dark' ? 'bg-[#0C0C0C]' : 'bg-[#F4F4F5]'}`}
          />
          <div className={`px-4 py-2 flex items-center justify-between border-t ${border}`}>
            <div className="flex items-center gap-2">
              <Radio size={12} className="text-[#DD7C2B]" />
              <span className={`text-[11px] ${muted}`}>Powered by Caster FM</span>
            </div>
            <button
              onClick={() => { setMode('direct'); setHasError(false); setErrorMsg(''); }}
              className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors ${
                theme === 'dark'
                  ? 'text-[#A1A1AA] hover:text-[#DD7C2B]'
                  : 'text-[#71717A] hover:text-[#DD7C2B]'
              }`}
            >
              Switch to Direct
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      <div className={`px-4 py-2.5 border-t ${border}`}>
        <ConnectionStatus networkStatus={networkStatus} />
      </div>
    </div>
  );
}
