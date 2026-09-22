import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { station } from '../config/station';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const bg = theme === 'dark'
    ? 'bg-[#0C0C0C]/90 border-b border-[#27272A]'
    : 'bg-white/90 border-b border-[#E4E4E7]';

  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#71717A]';
  const hoverBg = theme === 'dark' ? 'hover:bg-[#27272A]' : 'hover:bg-[#F4F4F5]';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${bg}`}>
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Suara Ferdonk" className="w-8 h-8 object-contain" />
          <span className={`text-base font-semibold tracking-tight ${text}`}>
            {station.name}
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-[#DD7C2B] bg-[#DD7C2B]/10'
                  : `${muted} ${hoverBg}`
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#DD7C2B] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Live
            </span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg ${hoverBg} ${muted}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-5 py-3 ${
          theme === 'dark' ? 'bg-[#0C0C0C] border-[#27272A]' : 'bg-white border-[#E4E4E7]'
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 text-sm font-medium rounded-lg px-3 mb-1 ${
                location.pathname === link.path
                  ? 'text-[#DD7C2B] bg-[#DD7C2B]/10'
                  : `${muted} ${hoverBg}`
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-3 pt-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#DD7C2B] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Live
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
