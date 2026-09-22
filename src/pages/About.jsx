import { useTheme } from '../context/ThemeContext';
import { station } from '../config/station';

const features = [
  { title: 'Live Streaming', desc: 'Dengarkan siaran langsung 24/7 tanpa jeda.' },
  { title: 'Audio Kualitas Tinggi', desc: 'Streaming MP3 128kbps, jernih dan stabil.' },
  { title: 'Komunitas', desc: 'Bergabung dengan pendengar radio online Indonesia.' },
  { title: 'Global', desc: 'Dapat diakses dari seluruh penjuru dunia.' },
  { title: 'Zero Cost', desc: 'Gratis tanpa biaya apapun, selamanya.' },
  { title: 'Multi Platform', desc: 'Dengarkan di web, TuneIn, atau app favorit kamu.' },
];

export default function About() {
  const { theme } = useTheme();
  const text = theme === 'dark' ? 'text-[#E4E4E7]' : 'text-[#18181B]';
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';
  const border = theme === 'dark' ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const cardBg = theme === 'dark' ? 'bg-[#18181B]' : 'bg-white';

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#DD7C2B] mb-2">About</p>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${text}`}>
            Tentang {station.name}
          </h1>
          <p className={`text-sm mt-3 max-w-xl leading-relaxed ${muted}`}>
            {station.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f.title} className={`p-4 rounded-xl border ${cardBg} ${border}`}>
              <h3 className={`text-sm font-semibold ${text}`}>{f.title}</h3>
              <p className={`text-xs mt-1.5 leading-relaxed ${muted}`}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className={`mt-10 p-6 rounded-xl border ${cardBg} ${border}`}>
          <h2 className={`text-lg font-bold ${text} mb-2`}>Misi Kami</h2>
          <p className={`text-sm leading-relaxed ${muted}`}>
            Memberikan hiburan audio berkualitas tinggi yang dapat diakses oleh semua orang secara gratis.
            Kami percaya radio online memiliki kekuatan untuk menyatukan orang-orang melalui musik
            dan konten menarik, tanpa batasan waktu dan tempat.
          </p>
        </div>
      </div>
    </div>
  );
}
