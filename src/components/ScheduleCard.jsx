import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ScheduleCard({ program }) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`p-4 rounded-xl transition-all ${
        theme === 'dark'
          ? 'bg-dark-card border border-dark-border hover:border-primary/30'
          : 'bg-white border border-light-border hover:border-primary/30 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-sm font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
            {program.name}
          </p>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
            Hosted by <span className="text-primary font-medium">{program.dj}</span>
          </p>
        </div>
        <span className={`text-xs font-mono px-2.5 py-1 rounded-lg whitespace-nowrap ${
          theme === 'dark'
            ? 'bg-primary/10 text-primary border border-primary/20'
            : 'bg-primary/10 text-primary border border-primary/20'
        }`}>
          {program.time}
        </span>
      </div>
    </motion.div>
  );
}
