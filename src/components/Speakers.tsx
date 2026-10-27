import { Mic } from 'lucide-react';
import { LinkedInIcon } from './icons';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { host, speakerList, type Speaker } from '../data/speakers';

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
          <p lang="en" className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-soft">{speaker.org}</p>
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

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {speakerList.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.05} className="h-full">
              <SpeakerCard speaker={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
