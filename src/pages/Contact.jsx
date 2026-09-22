import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';
import { ExternalLink } from 'lucide-react';

export default function Contact() {
  const { theme } = useTheme();
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';
  const border = theme === 'dark' ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const cardBg = theme === 'dark' ? 'bg-[#18181B]' : 'bg-white';

  const contactMethods = [
    { label: 'WhatsApp', value: station.social.whatsapp, href: station.social.whatsapp },
    { label: 'Email', value: station.social.email, href: `mailto:${station.social.email}` },
  ];

  const socialLinks = [
    { name: 'Instagram', href: station.social.instagram },
    { name: 'YouTube', href: station.social.youtube },
    { name: 'TikTok', href: station.social.tiktok },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#DD7C2B] mb-2">Contact</p>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${text}`}>
            Hubungi Kami
          </h1>
          <p className={`text-sm mt-2 ${muted}`}>
            Punya pertanyaan atau saran? Hubungi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact */}
          <div className="space-y-3">
            <h2 className={`text-xs font-semibold uppercase tracking-wider ${text}`}>Kontak Langsung</h2>
            {contactMethods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-4 rounded-xl border transition-colors hover:border-[#DD7C2B]/40 ${cardBg} ${border}`}
              >
                <p className={`text-[11px] uppercase tracking-wider font-semibold ${muted}`}>{m.label}</p>
                <p className={`text-sm font-medium mt-1 ${text}`}>{m.value}</p>
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h2 className={`text-xs font-semibold uppercase tracking-wider ${text}`}>Social Media</h2>
            <div className="grid grid-cols-3 gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors hover:border-[#DD7C2B]/40 ${cardBg} ${border}`}
                >
                  <span className={`text-xs font-semibold ${text}`}>{s.name}</span>
                  <ExternalLink size={12} className={muted} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
