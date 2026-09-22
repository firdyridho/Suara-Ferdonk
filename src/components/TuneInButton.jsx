import { ExternalLink, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';

export default function TuneInButton() {
  const { theme } = useTheme();

  return (
    <motion.a
      href={station.tuneinUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
        theme === 'dark'
          ? 'bg-dark-card text-dark-text border border-dark-border hover:border-primary/40 hover:bg-primary/10'
          : 'bg-white text-dark-text border border-light-border hover:border-primary/40 hover:bg-primary/5 shadow-sm'
      }`}
    >
      <Radio size={16} className="text-primary" />
      <span>Listen on TuneIn</span>
      <ExternalLink size={14} className="opacity-50" />
    </motion.a>
  );
}
