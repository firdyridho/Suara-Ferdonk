import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const contactMethods = [
  {
    icon: <MessageCircle size={22} />,
    title: 'WhatsApp',
    value: station.social.whatsapp,
    href: station.social.whatsapp,
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    icon: <Mail size={22} />,
    title: 'Email',
    value: station.social.email,
    href: `mailto:${station.social.email}`,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    icon: <Send size={22} />,
    title: 'Telegram',
    value: '@suaraferdonk',
    href: '#',
    color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: station.social.instagram,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: station.social.youtube,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: station.social.tiktok,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            <Mail size={12} />
            Contact
          </span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-dark-text'
          }`}>
            Hubungi <span className="text-gradient">Kami</span>
          </h1>
          <p className={`mt-4 text-base sm:text-lg max-w-xl mx-auto ${
            theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
          }`}>
            Punya pertanyaan atau saran? Jangan ragu untuk menghubungi kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
              Kirim Pesan
            </h2>

            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-dark-card/50 border border-dark-border hover:border-primary/30'
                    : 'bg-white border border-light-border hover:border-primary/30 shadow-sm'
                }`}
              >
                <div className={`p-3 rounded-xl border ${method.color}`}>
                  {method.icon}
                </div>
                <div>
                  <p className={`text-xs font-medium ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                    {method.title}
                  </p>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
              Ikuti Kami
            </h2>

            <div className={`p-6 rounded-2xl ${
              theme === 'dark'
                ? 'bg-dark-card/50 border border-dark-border'
                : 'bg-white border border-light-border shadow-sm'
            }`}>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex flex-col items-center gap-3 p-5 rounded-xl transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-dark-surface hover:bg-primary/10 text-dark-muted hover:text-primary border border-dark-border hover:border-primary/30'
                        : 'bg-gray-50 hover:bg-primary/10 text-light-muted hover:text-primary border border-light-border hover:border-primary/30'
                    }`}
                  >
                    {social.icon}
                    <span className="text-xs font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className={`mt-6 p-6 rounded-2xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10'
                : 'bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10'
            }`}>
              <div className="flex items-start gap-3">
                <Radio size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
                    Mendengarkan {station.name}
          </p>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                    Buka halaman utama kami dan nikmati siaran langsung dengan kualitas audio terbaik.
                    Tersedia 24/7 tanpa gangguan.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
