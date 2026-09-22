import { motion } from 'framer-motion';
import { Radio, Users, Globe, Zap, Heart, Music } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const features = [
  { icon: <Radio size={24} />, title: 'Live Streaming', desc: 'Dengarkan siaran langsung kapan saja dan di mana saja' },
  { icon: <Music size={24} />, title: 'Musik Berkualitas', desc: 'Streaming audio berkualitas tinggi untuk pengalaman mendengar terbaik' },
  { icon: <Users size={24} />, title: 'Komunitas', desc: 'Bergabung dengan komunitas pendengar radio online Indonesia' },
  { icon: <Globe size={24} />, title: 'Global Reach', desc: 'Dapat diakses dari seluruh penjuru dunia' },
  { icon: <Zap size={24} />, title: 'Zero Latency', desc: 'Teknologi streaming terbaru untuk minimal delay' },
  { icon: <Heart size={24} />, title: 'Free Forever', desc: 'Gratis tanpa biaya apapun, selamanya' },
];

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            <Radio size={12} />
            About Us
          </span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-dark-text'
          }`}>
            Tentang <span className="text-gradient">{station.name}</span>
          </h1>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
          }`}>
            {station.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl transition-all ${
                theme === 'dark'
                  ? 'bg-dark-card/50 border border-dark-border hover:border-primary/30'
                  : 'bg-white border border-light-border hover:border-primary/30 shadow-sm'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-dark-text'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-16 p-8 sm:p-10 rounded-2xl text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border'
              : 'bg-gradient-to-br from-white to-gray-50 border border-light-border shadow-sm'
          }`}
        >
          <h2 className={`text-2xl sm:text-3xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-dark-text'
          }`}>
            Misi Kami
          </h2>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
          }`}>
            Memberikan hiburan audio berkualitas tinggi yang dapat diakses oleh semua orang secara gratis.
            Kami percaya bahwa radio online memiliki kekuatan untuk menyatukan orang-orang melalui musik
            dan konten yang menarik, tanpa batasan waktu dan tempat.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
