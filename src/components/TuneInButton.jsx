import { useTheme } from '../context/ThemeContext';
import { ExternalLink, Radio } from 'lucide-react';
import { station } from '../config/station';

export default function TuneInButton() {
  const { theme } = useTheme();

  return (
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
      <Radio size={13} />
      TuneIn
      <ExternalLink size={10} className="opacity-40" />
    </a>
  );
}
