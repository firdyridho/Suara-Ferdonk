import { motion } from 'framer-motion';
import { Radio, Headphones, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import Player from '../components/Player';
import AudioVisualizer from '../components/AudioVisualizer';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Home({ networkStatus }) {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <img
                src="/logo.png"
                alt="Suara Ferdonk"
                className="w-28 h-28 sm:w-36 sm:h-36 mx-auto drop-shadow-2xl animate-float"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <AudioVisualizer isPlaying={true} size="md" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-dark-text'
            }`}>
              {station.name}
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.35 }}
            className={`mt-4 text-lg sm:text-xl max-w-xl mx-auto ${
              theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
            }`}
          >
            {station.tagline}
          </motion.p>

          {/* Tagline badges */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {[
              { icon: <Radio size={14} />, text: '24/7 Live' },
              { icon: <Headphones size={14} />, text: 'High Quality' },
              { icon: <Volume2 size={14} />, text: 'Crystal Clear' },
            ].map((badge) => (
              <span
                key={badge.text}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                  theme === 'dark'
                    ? 'bg-dark-card/50 text-dark-muted border-dark-border'
                    : 'bg-white/50 text-light-muted border-light-border'
                }`}
              >
                <span className="text-primary">{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Player Section */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Player networkStatus={networkStatus} />
        </div>
      </section>
    </div>
  );
}
