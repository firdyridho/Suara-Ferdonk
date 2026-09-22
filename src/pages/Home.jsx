import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import Player from '../components/Player';

export default function Home({ networkStatus }) {
  const { theme } = useTheme();
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-5">
        {/* Hero */}
        <div className="text-center mb-10">
          <img
            src="/logo.png"
            alt="Suara Ferdonk"
            className="w-20 h-20 mx-auto mb-5 object-contain"
          />
          <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${text}`}>
            {station.name}
          </h1>
          <p className={`text-sm mt-2 ${muted}`}>
            {station.tagline}
          </p>
        </div>

        {/* Player */}
        <Player networkStatus={networkStatus} />

        {/* Info badges */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {['24/7 Live', 'High Quality', 'Crystal Clear'].map((item) => (
            <span key={item} className={`text-[11px] font-medium px-3 py-1 rounded-full ${
              theme === 'dark'
                ? 'bg-[#27272A] text-[#A1A1AA]'
                : 'bg-[#F4F4F5] text-[#71717A]'
            }`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
