import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { theme } = useTheme();
  const border = theme === 'dark' ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';

  return (
    <footer className={`border-t ${border}`}>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/logo.png" alt="Suara Ferdonk" className="w-7 h-7 object-contain" />
              <span className={`text-sm font-semibold ${text}`}>{station.name}</span>
            </div>
            <p className={`text-xs leading-relaxed ${muted}`}>
              Radio online Indonesia. Dengarkan kapan saja, di mana saja.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${text}`}>Navigation</h4>
            <div className="space-y-1.5">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/schedule', label: 'Schedule' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link key={link.path} to={link.path} className={`block text-xs ${muted} hover:text-[#DD7C2B] transition-colors`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${text}`}>Follow</h4>
            <div className="flex gap-2">
              {Object.entries(station.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium uppercase ${
                    theme === 'dark'
                      ? 'bg-[#27272A] text-[#A1A1AA] hover:bg-[#DD7C2B]/20 hover:text-[#DD7C2B]'
                      : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#DD7C2B]/10 hover:text-[#DD7C2B]'
                  } transition-colors`}
                >
                  {platform[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-6 border-t flex items-center justify-between text-[11px] ${muted} ${border}`}>
          <span>&copy; {new Date().getFullYear()} {station.name}</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={10} className="text-[#DD7C2B] fill-[#DD7C2B]" /> for radio
          </span>
        </div>
      </div>
    </footer>
  );
}
