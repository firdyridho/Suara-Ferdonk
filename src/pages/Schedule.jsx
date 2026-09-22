import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import ScheduleCard from '../components/ScheduleCard';

export default function Schedule() {
  const { theme } = useTheme();
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';
  const border = theme === 'dark' ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const cardBg = theme === 'dark' ? 'bg-[#18181B]' : 'bg-white';
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#DD7C2B] mb-2">Schedule</p>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${text}`}>
            Jadwal Siaran
          </h1>
          <p className={`text-sm mt-2 ${muted}`}>
            Program mingguan {station.name}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {station.schedule.map((day) => (
            <div
              key={day.day}
              className={`rounded-xl border overflow-hidden ${
                day.day === today ? 'border-[#DD7C2B] ring-1 ring-[#DD7C2B]/30' : border
              } ${cardBg}`}
            >
              {/* Day header */}
              <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
                day.day === today ? 'bg-[#DD7C2B]/10 border-[#DD7C2B]/20' : border
              }`}>
                <span className={`text-xs font-semibold ${text}`}>{day.day}</span>
                {day.day === today && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#DD7C2B] text-white">
                    Hari Ini
                  </span>
                )}
              </div>
              {/* Programs */}
              <div className="p-2.5 space-y-2">
                {day.programs.map((prog, j) => (
                  <ScheduleCard key={j} program={prog} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={`text-[11px] mt-6 ${muted}`}>
          * Jadwal dapat berubah sewaktu-waktu
        </p>
      </div>
    </div>
  );
}
