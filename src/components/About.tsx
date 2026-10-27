import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Reveal from './Reveal';

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);
  return value;
}

const stats = [
  { value: 6, suffix: '', label: 'yıldır AI FEST bizimle' },
  { value: 2500, suffix: '+', label: 'katılımcıya ulaştık' },
  { value: 60, suffix: '+', label: 'konuşmacıyı sahnemizde ağırladık' },
];

function Stat({ stat, start }: { stat: (typeof stats)[number]; start: boolean }) {
  const n = useCountUp(stat.value, start);
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/12 py-5 first:border-t">
      <p className="font-display text-5xl font-black tabular-nums leading-none text-fg sm:text-6xl">
        {n.toLocaleString('tr-TR')}
        {stat.suffix}
      </p>
      <p className="max-w-[12rem] text-right font-display text-xs font-semibold uppercase tracking-[0.16em] text-fg-muted">{stat.label}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="hakkinda" className="section">
      <div className="container-page">
        <div className="grid gap-12 border-t rule pt-6 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">Hakkında</span>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.05] sm:text-4xl lg:text-5xl">AI FEST nedir?</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
              <p>
                <strong className="font-semibold text-fg">AI FEST</strong>, Türkiye'nin en büyük öğrenci odaklı yapay zeka
                etkinliklerinden biridir. Her yıl sektörün önde gelen isimlerini, araştırmacıları ve teknoloji liderlerini
                bir araya getirerek yapay zekanın geleceğini şekillendiren ilham verici bir platform sunuyoruz.
              </p>
              <p>
                Konferanslar, paneller, workshoplar ve networking alanlarıyla dolu iki gün seni bekliyor. İster öğrenci ol
                ister profesyonel; yapay zeka ekosisteminin nabzını tutmak, yeni bağlantılar kurmak ve kariyerine yön vermek
                için <strong className="font-semibold text-fg">AI FEST'26</strong>'ya katıl!
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div ref={ref} className="lg:pt-14">
              {stats.map(s => (
                <Stat key={s.label} stat={s} start={inView} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
