import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const muted = theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#71717A]';
  const hoverBg = theme === 'dark' ? 'hover:bg-[#27272A]' : 'hover:bg-[#F4F4F5]';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${hoverBg} ${muted}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
