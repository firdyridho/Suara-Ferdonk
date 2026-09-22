import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ConnectionStatus from './ConnectionStatus';
import TuneInButton from './TuneInButton';
import AudioVisualizer from './AudioVisualizer';

export default function Player({ networkStatus }) {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const embedDiv = document.createElement('div');
    embedDiv.className = 'cstrEmbed';
    embedDiv.setAttribute('data-type', 'newStreamPlayer');
    embedDiv.setAttribute('data-publicToken', station.caster.publicToken);
    embedDiv.setAttribute('data-theme', station.caster.theme);
    embedDiv.setAttribute('data-color', station.caster.color);
    embedDiv.setAttribute('data-channelId', '');
    embedDiv.setAttribute('data-rendered', 'false');

    const link1 = document.createElement('a');
    link1.href = 'https://www.caster.fm';
    link1.textContent = 'Shoutcast Hosting';
    const link2 = document.createElement('a');
    link2.href = 'https://www.caster.fm';
    link2.textContent = 'Stream Hosting';
    const link3 = document.createElement('a');
    link3.href = 'https://www.caster.fm';
    link3.textContent = 'Radio Server Hosting';
    embedDiv.appendChild(link1);
    embedDiv.appendChild(link2);
    embedDiv.appendChild(link3);

    container.appendChild(embedDiv);

    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = '//cdn.cloud.caster.fm//widgets/embed.js';
      script.async = true;
      script.onload = () => setPlayerLoaded(true);
      document.body.appendChild(script);
      scriptRef.current = script;
    } else {
      setPlayerLoaded(true);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

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
            <AudioVisualizer isPlaying={playerLoaded} size="sm" />
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

        {/* Player embed */}
        <div className="relative">
          <div
            ref={containerRef}
            className={`min-h-[80px] flex items-center justify-center ${
              theme === 'dark' ? 'bg-dark-surface' : 'bg-gray-50'
            }`}
          />
          {!playerLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className={`text-xs ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                  Loading player...
                </p>
              </div>
            </div>
          )}
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
