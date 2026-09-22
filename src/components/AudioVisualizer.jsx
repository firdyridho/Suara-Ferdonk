import { motion } from 'framer-motion';

const bars = [
  { delay: 0, duration: 0.8 },
  { delay: 0.1, duration: 0.6 },
  { delay: 0.2, duration: 1.0 },
  { delay: 0.15, duration: 0.7 },
  { delay: 0.05, duration: 0.9 },
];

export default function AudioVisualizer({ isPlaying = true, size = 'md' }) {
  const heights = {
    sm: { max: 16, min: 4, barWidth: 2, gap: 2 },
    md: { max: 24, min: 6, barWidth: 3, gap: 3 },
    lg: { max: 40, min: 8, barWidth: 4, gap: 4 },
  };

  const s = heights[size] || heights.md;

  return (
    <div className="flex items-end justify-center" style={{ gap: `${s.gap}px`, height: `${s.max}px` }}>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-gradient-to-t from-primary to-primary-light"
          style={{ width: `${s.barWidth}px` }}
          animate={isPlaying ? {
            height: [s.min, s.max, s.min * 1.5, s.max * 0.7, s.min],
          } : {
            height: s.min,
          }}
          transition={isPlaying ? {
            duration: bar.duration,
            delay: bar.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {
            duration: 0.3,
          }}
        />
      ))}
    </div>
  );
}
