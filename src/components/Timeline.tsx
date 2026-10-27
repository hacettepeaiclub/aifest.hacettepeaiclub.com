import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './icons';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { REGISTER_URL } from '../lib/links';

const editions = [
  {
    year: '2021',
    highlight: 'TensorFlow Turkey işbirliği',
    description: 'TensorFlow Turkey işbirliğiyle gerçekleştirdiğimiz etkinliklerde birçok sektörden yapay zeka uzmanını ve deneyimli profesyonelleri ağırladık.',
    post: 'https://www.instagram.com/p/CXjjy24MsQU/',
  },
  {
    year: '2023',
    highlight: '500+ katılımcı',
    description: "TUSAŞ ve Massive Bio sponsorluğunda gerçekleştirdiğimiz etkinliklere 500'ü aşkın katılımcı büyük ilgi gösterdi.",
    post: 'https://www.instagram.com/p/Cz_77LAtD-G/',
  },
  {
    year: '2024',
    highlight: 'Rekor katılım',
    description: 'ASELSAN ve Anadolu Grubu sponsorluğunda gerçekleştirdiğimiz etkinlik, yapay zeka dünyasının en önemli isimlerini bir araya getirdi.',
    post: 'https://www.instagram.com/p/DCV_g12tv3K/',
  },
  {
    year: '2025',
    highlight: 'Genişleyen ekosistem',
    description: 'Platin sponsorumuz ASELSAN ve altın sponsorumuz DeePix başta olmak üzere, teknoloji dünyasına yön veren markaların desteğiyle zengin bir etkinlik gerçekleştirdik.',
    post: 'https://www.instagram.com/p/DRhfOuxDNsH/',
  },
];

export default function Timeline() {
  return (
    <section id="tarihce" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="AI FEST Yolculuğu"
          title="Her yıl daha büyük"
          description="2021'den bugüne büyüyen hikâyemizin kilometre taşları."
        />

        <ol className="border-t border-white/20">
          {editions.map((e, i) => (
            <Reveal key={e.year} delay={i * 0.05}>
              <li className="grid gap-3 border-b border-white/10 py-8 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-10">
                <span className="font-display text-5xl font-black leading-none text-fg sm:text-6xl">{e.year}</span>
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-soft">{e.highlight}</p>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-muted sm:text-base">{e.description}</p>
                </div>
                <a
                  href={e.post}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-fg"
                >
                  <InstagramIcon className="h-4 w-4" /> Kareler <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </Reveal>
          ))}

          {/* 2026 */}
          <Reveal>
            <li className="grid gap-5 border-b border-white/20 bg-white/[0.03] px-0 py-10 md:grid-cols-[12rem_1fr_auto] md:items-center md:gap-10">
              <span className="font-display text-5xl font-black leading-none sm:text-6xl">
                <span className="text-gradient">2026</span>
              </span>
              <p className="max-w-2xl text-base text-fg sm:text-lg">
                Sıradaki sayfayı birlikte yazalım. 3 – 4 Kasım'da Beytepe'deyiz.
              </p>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary justify-self-start">
                Kayıt Ol <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
