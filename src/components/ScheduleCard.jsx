import { useTheme } from '../context/ThemeContext';

export default function ScheduleCard({ program }) {
  const { theme } = useTheme();
  const bg = theme === 'dark' ? 'bg-[#27272A]/50' : 'bg-[#F4F4F5]';
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';

  return (
    <div className={`px-3 py-2.5 rounded-lg ${bg}`}>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-sm font-medium truncate ${text}`}>{program.name}</p>
        <span className={`text-[11px] font-mono whitespace-nowrap px-2 py-0.5 rounded bg-[#DD7C2B]/10 text-[#DD7C2B]`}>
          {program.time}
        </span>
      </div>
      <p className={`text-[11px] mt-1 ${muted}`}>
        {program.dj}
      </p>
    </div>
  );
}
