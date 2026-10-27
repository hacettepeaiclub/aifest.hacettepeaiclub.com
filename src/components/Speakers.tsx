import { Mic } from 'lucide-react';
import { LinkedInIcon } from './icons';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

interface Speaker {
  name: string;
  title: string;
  org: string;
  linkedin?: string;
  image: string;
}

/** Etkinlik sunucusu — bölümün en üstünde ayrı gösterilir. */
const host: Speaker = {
  name: 'Gürçin Gökçebağ',
  title: 'Educator & Strategist · Speaker',
  org: 'WeAcademyTR',
  linkedin: 'https://www.linkedin.com/in/gürçin-gökçebağ/',
  image: 'speakers/gurcin_gokcebag.png',
};

const speakers: Speaker[] = [
  { name: 'Merve Benlikaş Demirbağ', title: 'Otomotiv Sektöründe Yapay Zeka', org: 'Ford Otosan', linkedin: 'https://www.linkedin.com/in/merve-benlika%C5%9F-8b045b12a', image: 'speakers/merve_benlikas.png' },
  { name: 'Bahar Serçin Halefoğlu', title: 'AI Governance Advisor', org: 'ALSE Data CEO', linkedin: 'https://www.linkedin.com/in/baharsercinhalefoglu/', image: 'speakers/bahar_sercin_halefoglu.png' },
  { name: 'Dr. Fatih Hattatoğlu', title: 'AI Strategist & Data Scientist', org: 'Wise Maple', linkedin: 'https://www.linkedin.com/in/fatih-hattatoglu-phd/', image: 'speakers/fatih_hattatoglu.png' },
  { name: 'Burak Tunca', title: 'Fintech Sektöründe Yapay Zeka', org: 'PayTR', linkedin: 'https://www.linkedin.com/in/buraktunca01', image: 'speakers/burak_tunca.jpg' },
  { name: 'Çağdaş Hakan Aladağ', title: "Yapay Zeka'nın Geleceği", org: 'Hacettepe Üniversitesi', linkedin: 'https://www.linkedin.com/in/cagdas-hakan-aladag-279b9221/', image: 'speakers/cagdas_hakan_aladag.png' },
  { name: 'Prof. Dr. Süleyman Tosun', title: 'Bilgisayar Mühendisliği', org: 'Hacettepe Üniversitesi', image: 'speakers/suleyman_tosun.jpg' },
  { name: 'Ata Seren', title: 'Siber Güvenlikte Yapay Zeka', org: 'HAVELSAN', linkedin: 'https://www.linkedin.com/in/ataseren', image: 'speakers/ata_seren.png' },
  { name: 'Azra Melis Ertan', title: 'Siber Güvenlik Uzmanı', org: 'Trendyol', linkedin: 'https://www.linkedin.com/in/azra-melis-ertan/', image: 'speakers/azra_melis_ertan.png' },
  { name: 'Ege Mert Gülderen', title: 'Model Değil: Sistem', org: 'DeePix', linkedin: 'https://www.linkedin.com/in/egemertg%C3%BClderen/', image: 'speakers/ege_mert_gulderen.jpg' },
  { name: 'Aytaç Mestçi', title: 'Digital Ecosystem Innovator', org: 'MarkeFront', linkedin: 'https://www.linkedin.com/in/aytacmestci/', image: 'speakers/aytac_mestci.png' },
];

const photo = (s: Speaker) => `${import.meta.env.BASE_URL}${s.image}`;

function LinkedIn({ speaker, className = '' }: { speaker: Speaker; className?: string }) {
  if (!speaker.linkedin) return null;
  return (
    <a
      href={speaker.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${speaker.name} LinkedIn`}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-[#0A66C2] hover:text-white ${className}`}
    >
      <LinkedInIcon className="h-4 w-4" />
    </a>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-night-3">
        <img
          src={photo(speaker)}
          alt={speaker.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-[15px] font-extrabold uppercase leading-snug text-fg sm:text-base">{speaker.name}</h3>
          <p className="mt-1 text-sm leading-snug text-fg-muted">{speaker.title}</p>
          <p className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-soft">{speaker.org}</p>
        </div>
        <LinkedIn speaker={speaker} className="-mr-1.5 shrink-0" />
      </div>
    </article>
  );
}

export default function Speakers() {
  return (
    <section id="konusmacilar" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Konuşmacılar"
          title="Alanında uzman konuşmacılar"
          description="Yapay zeka dünyasının en ilham verici isimlerini iki gün boyunca sahnede ağırlıyoruz."
        />

        {/* Etkinlik sunucusu */}
        <Reveal className="mb-14">
          <article className="grid items-center gap-6 border-y border-white/15 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
            <img
              src={photo(host)}
              alt={host.name}
              className="h-28 w-28 rounded-lg border border-white/10 object-cover object-top sm:h-32 sm:w-32"
            />
            <div>
              <span className="eyebrow inline-flex items-center gap-2 !text-brand-soft">
                <Mic className="h-3.5 w-3.5" /> Etkinlik Sunucusu
              </span>
              <h3 className="mt-2 text-2xl font-black uppercase text-fg sm:text-3xl">{host.name}</h3>
              <p className="mt-1 text-fg-muted">
                {host.title} <span className="text-fg-subtle">·</span> {host.org}
              </p>
            </div>
            <LinkedIn speaker={host} />
          </article>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-5">
          {speakers.map((s, i) => (
            <Reveal key={s.name} delay={(i % 5) * 0.05} className="h-full">
              <SpeakerCard speaker={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
