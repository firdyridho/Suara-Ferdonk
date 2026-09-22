import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ScheduleCard from '../components/ScheduleCard';

export default function Schedule() {
  const { theme } = useTheme();

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            <Calendar size={12} />
            Schedule
          </span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-dark-text'
          }`}>
            Jadwal <span className="text-gradient">Siaran</span>
          </h1>
          <p className={`mt-4 text-base sm:text-lg max-w-xl mx-auto ${
            theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
          }`}>
            Lihat jadwal program siaran {station.name} minggu ini
          </p>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {station.schedule.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <div className={`rounded-2xl overflow-hidden transition-all ${
                day.day === today
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/10'
                  : ''
              } ${
                theme === 'dark'
                  ? 'bg-dark-card/50 border border-dark-border'
                  : 'bg-white border border-light-border shadow-sm'
              }`}>
                {/* Day header */}
                <div className={`px-5 py-3 flex items-center justify-between ${
                  day.day === today
                    ? 'bg-primary/10'
                    : theme === 'dark'
                      ? 'bg-dark-surface/50'
                      : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-dark-text'
                    }`}>
                      {day.day}
                    </span>
                  </div>
                  {day.day === today && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-white">
                      Hari Ini
                    </span>
                  )}
                </div>

                {/* Programs */}
                <div className="p-4 space-y-2">
                  {day.programs.map((program, j) => (
                    <ScheduleCard key={j} program={program} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-center text-xs mt-8 ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}
        >
          * Jadwal dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu
        </motion.p>
      </div>
    </div>
  );
}
