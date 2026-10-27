import { Globe } from 'lucide-react';
import { InstagramIcon, LinkedInIcon, XIcon, YoutubeIcon } from './icons';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

interface Sponsor {
  name: string;
  logo: string;
  link?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  x?: string;
}

interface Tier {
  title: string;
  size: 'xl' | 'lg' | 'md';
  sponsors: Sponsor[];
}

const tiers: Tier[] = [
  {
    title: 'Dönem Sponsoru',
    size: 'xl',
    sponsors: [
      { name: 'DeePix', logo: 'sponsors/deepix.png', link: 'https://deepixai.com', linkedin: 'https://www.linkedin.com/company/deepixai' },
    ],
  },
  {
    title: 'Altın Sponsor',
    size: 'lg',
    sponsors: [
      {
        name: 'ASELSAN',
        logo: 'sponsors/aselsan.png',
        link: 'https://www.aselsan.com',
        instagram: 'https://www.instagram.com/aselsan/',
        youtube: 'https://www.youtube.com/@aselsantv',
        linkedin: 'https://www.linkedin.com/company/aselsan',
        x: 'https://x.com/aselsan',
      },
    ],
  },
  {
    title: 'Fuaye Sponsorları',
    size: 'md',
    sponsors: [
      { name: 'Nescafé', logo: 'sponsors/nescafe.png', link: 'https://www.nescafe.com/tr', instagram: 'https://www.instagram.com/nescafetr/', youtube: 'https://www.youtube.com/@NescafeTurkiye', linkedin: 'https://www.linkedin.com/company/nestle', x: 'https://x.com/nescafetr' },
      { name: 'Tea Co.', logo: 'sponsors/teaco.png', link: 'https://teaco.com.tr', instagram: 'https://www.instagram.com/teacotr/', youtube: 'https://www.youtube.com/@teaco.1790', linkedin: 'https://www.linkedin.com/company/drteaco/' },
      { name: 'The Purest Solutions', logo: 'sponsors/thepurestsolutions.png', link: 'https://thepurestsolutions.com', instagram: 'https://www.instagram.com/thepurestsolutions/', youtube: 'https://www.youtube.com/@ThePurestSolutions', linkedin: 'https://www.linkedin.com/company/the-purest-solutions/' },
      { name: 'Pure Choice', logo: 'sponsors/purechoice.png', link: 'https://purechoice.com.tr', instagram: 'https://www.instagram.com/purechoicecosmetics/', linkedin: 'https://www.linkedin.com/company/pure-choice-kozmetik-anonim-şirketi' },
      { name: 'Odi', logo: 'sponsors/odi.png', link: 'https://getodi.com', instagram: 'https://www.instagram.com/getodi_/', linkedin: 'https://www.linkedin.com/company/getodi/' },
      { name: 'AIESEC', logo: 'sponsors/aiesec.png', link: 'https://aiesec.org.tr', instagram: 'https://www.instagram.com/aiesecturkey/', youtube: 'https://www.youtube.com/@aiesec.turkiye', linkedin: 'https://www.linkedin.com/company/aiesec-turkey/' },
    ],
  },
];

const sizeClasses: Record<Tier['size'], { grid: string; tile: string; logo: string }> = {
  xl: { grid: '', tile: 'h-44 sm:h-56 p-8', logo: 'max-h-28 sm:max-h-36 max-w-[85%]' },
  lg: { grid: '', tile: 'h-44 sm:h-56 p-8', logo: 'max-h-16 sm:max-h-20 max-w-[85%]' },
  md: { grid: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6', tile: 'h-24 sm:h-28 p-4', logo: 'max-h-12 sm:max-h-14 max-w-[90%]' },
};

function SocialLinks({ sponsor }: { sponsor: Sponsor }) {
  const links = [
    { href: sponsor.link, icon: Globe, label: 'Website' },
    { href: sponsor.instagram, icon: InstagramIcon, label: 'Instagram' },
    { href: sponsor.youtube, icon: YoutubeIcon, label: 'YouTube' },
    { href: sponsor.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
    { href: sponsor.x, icon: XIcon, label: 'X' },
  ].filter(l => l.href);

  return (
    <div className="-mx-1.5 flex flex-wrap items-center">
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${sponsor.name} ${l.label}`}
          title={l.label}
          className="rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-white/[0.06] hover:text-fg"
        >
          <l.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsorlar" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Sponsorlar"
          title="AI FEST'26'yı mümkün kılanlar"
          description="Yapay zeka ekosistemine yatırım yapan, gençlere alan açan değerli destekçilerimiz."
        />

        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {tiers.map(tier => {
            const size = sizeClasses[tier.size];
            return (
              <Reveal key={tier.title} className={tier.size === 'md' ? 'md:col-span-2 md:mt-4' : ''}>
                <h3 className="eyebrow mb-5 block border-b border-white/15 pb-3 !text-fg">{tier.title}</h3>
                <div className={`grid w-full gap-4 ${size.grid}`}>
                  {tier.sponsors.map(s => (
                    <div key={s.name} className="flex flex-col gap-3">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className={`flex items-center justify-center rounded-lg bg-white transition-opacity hover:opacity-90 ${size.tile}`}
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}${s.logo}`}
                          alt={s.name}
                          loading="lazy"
                          className={`h-auto w-auto object-contain ${size.logo}`}
                        />
                      </a>
                      <div className={tier.size === 'md' ? 'flex flex-col gap-1' : 'flex flex-wrap items-center justify-between gap-1'}>
                        <p lang="en" className="font-display text-xs font-bold uppercase tracking-[0.12em] text-fg">{s.name}</p>
                        <SocialLinks sponsor={s} />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
