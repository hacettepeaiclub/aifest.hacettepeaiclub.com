import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#2f5bff', '#7c3aed', '#ffffff', '#fde68a', '#8fa2ff', '#9b5cff'];

/** One-shot confetti burst; remount (change `key`) to fire again. */
export default function Confetti({ count = 140 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        drift: (Math.random() - 0.5) * 30,
        delay: Math.random() * 0.6,
        duration: 2.8 + Math.random() * 2.2,
        rotate: (Math.random() - 0.5) * 1080,
        w: 6 + Math.random() * 8,
        h: 10 + Math.random() * 12,
        color: COLORS[i % COLORS.length],
        round: Math.random() > 0.7,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {pieces.map(p => (
        <motion.span
          key={p.id}
          className="absolute top-0 block"
          style={{
            left: `${p.x}vw`,
            width: p.w,
            height: p.round ? p.w : p.h,
            background: p.color,
            borderRadius: p.round ? '9999px' : '2px',
          }}
          initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', x: `${p.drift}vw`, rotate: p.rotate, opacity: [1, 1, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.2, 0.6, 0.4, 1] }}
        />
      ))}
    </div>
  );
}
