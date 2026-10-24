import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* Custom social SVG icons (matching footer style) */
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* 25 sponsors total: 12 sponsors (2 Platin, 4 Altın, 6 Gümüş), 8 Fuaye, 5 Medya */
interface Sponsor {
  name: string;
  color: string;
  logo?: string;
  link?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  x?: string;
}

const platinSponsors: Sponsor[] = [
  {
    name: 'DeePix',
    color: 'from-amber-300 to-amber-500',
    logo: 'deepix.png',
    link: 'https://deepixai.com',
    linkedin: 'https://www.linkedin.com/company/deepixai',
  },
];

const altinSponsors: Sponsor[] = [
  {
    name: 'ASELSAN',
    color: 'from-violet-400 to-purple-600',
    logo: 'aselsan.png',
    link: 'https://www.aselsan.com',
    instagram: 'https://www.instagram.com/aselsan/',
    youtube: 'https://www.youtube.com/@aselsantv',
    linkedin: 'https://www.linkedin.com/company/aselsan',
    x: 'https://x.com/aselsan',
  },
];

const gumusSponsors: Sponsor[] = [];

const fuayeSponsors: Sponsor[] = [
  {
    name: 'Nescafé',
    color: 'from-red-500 to-amber-600',
    logo: 'nescafe.png',
    link: 'https://www.nescafe.com/tr',
    instagram: 'https://www.instagram.com/nescafetr/',
    youtube: 'https://www.youtube.com/@NescafeTurkiye',
    linkedin: 'https://www.linkedin.com/company/nestle',
    x: 'https://x.com/nescafetr',
  },
  {
    name: 'Tea Co.',
    color: 'from-emerald-400 to-teal-600',
    logo: 'teaco.png',
    link: 'https://teaco.com.tr',
    instagram: 'https://www.instagram.com/teacotr/',
    youtube: 'https://www.youtube.com/@teaco.1790',
    linkedin: 'https://www.linkedin.com/company/drteaco/',
  },
  {
    name: 'The Purest Solutions',
    color: 'from-stone-600 to-neutral-800',
    logo: 'thepurestsolutions.png',
    link: 'https://thepurestsolutions.com',
    instagram: 'https://www.instagram.com/thepurestsolutions/',
    youtube: 'https://www.youtube.com/@ThePurestSolutions',
    linkedin: 'https://www.linkedin.com/company/the-purest-solutions/',
  },
  {
    name: 'Pure Choice',
    color: 'from-rose-400 to-pink-600',
    logo: 'purechoice.png',
    link: 'https://purechoice.com.tr',
    instagram: 'https://www.instagram.com/purechoicecosmetics/',
    linkedin: 'https://www.linkedin.com/company/pure-choice-kozmetik-anonim-şirketi',
  },
  {
    name: 'Odi',
    color: 'from-orange-400 to-amber-500',
    logo: 'odi.png',
    link: 'https://getodi.com',
    instagram: 'https://www.instagram.com/getodi_/',
    linkedin: 'https://www.linkedin.com/company/getodi/',
  },
  {
    name: 'AIESEC',
    color: 'from-blue-500 to-sky-600',
    logo: 'aiesec.png',
    link: 'https://aiesec.org.tr',
    instagram: 'https://www.instagram.com/aiesecturkey/',
    youtube: 'https://www.youtube.com/@aiesec.turkiye',
    linkedin: 'https://www.linkedin.com/company/aiesec-turkey/',
  },
];

const medyaSponsors: Sponsor[] = [];

function SponsorPill({ sponsor }: { sponsor: Sponsor }) {
  const hasSocials = sponsor.link || sponsor.instagram || sponsor.youtube || sponsor.linkedin || sponsor.x;

  return (
    <div className="flex-shrink-0 flex flex-col items-center group w-[130px] sm:w-[180px]">
      <a
        href={sponsor.link || '#'}
        target={sponsor.link ? '_blank' : undefined}
        rel={sponsor.link ? 'noopener noreferrer' : undefined}
        className="w-28 h-28 sm:w-40 sm:h-40 rounded-3xl bg-white/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 shadow-sm border border-white/60 hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative cursor-pointer"
        aria-label={sponsor.name}
      >
        {sponsor.logo ? (
          <img
            src={`${import.meta.env.BASE_URL}${sponsor.logo}`}
            alt={sponsor.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center text-white font-heading font-bold text-3xl sm:text-5xl`}>
            {sponsor.name.charAt(0)}
          </div>
        )}
      </a>
      <div className="flex flex-col items-center gap-1.5 mt-3 sm:mt-4">
        <span className="font-body font-semibold text-xs sm:text-sm text-text text-center w-full truncate px-2">{sponsor.name}</span>

        {hasSocials ? (
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap justify-center" style={{ marginBottom: '20px' }}>
            {sponsor.link && (
              <a
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg text-text/75 hover:text-cta hover:bg-white/50 transition-colors"
                aria-label={`${sponsor.name} Website`}
                title="Website"
              >
                <GlobeIcon className="w-4 h-4" />
              </a>
            )}
            {sponsor.instagram && (
              <a
                href={sponsor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg text-text/75 hover:text-pink-500 hover:bg-white/50 transition-colors"
                aria-label={`${sponsor.name} Instagram`}
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {sponsor.youtube && (
              <a
                href={sponsor.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg text-text/75 hover:text-red-500 hover:bg-white/50 transition-colors"
                aria-label={`${sponsor.name} YouTube`}
                title="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            )}
            {sponsor.linkedin && (
              <a
                href={sponsor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg text-text/75 hover:text-blue-600 hover:bg-white/50 transition-colors"
                aria-label={`${sponsor.name} LinkedIn`}
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {sponsor.x && (
              <a
                href={sponsor.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg text-text/75 hover:text-gray-900 hover:bg-white/50 transition-colors"
                aria-label={`${sponsor.name} X`}
                title="X"
              >
                <XIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : (
          <span className="h-6" />
        )}
      </div>
    </div>
  );
}

interface MarqueeRowProps {
  sponsors: Sponsor[];
  direction?: 'left' | 'right';
  speed?: string;
}

function MarqueeRow({ sponsors }: MarqueeRowProps) {
  return (
    <div className="w-full pb-2 px-4 sm:px-8">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
        {sponsors.map((sponsor, i) => (
          <SponsorPill key={`${sponsor.name}-${i}`} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

interface TierSectionProps {
  title: string;
  sponsors: Sponsor[];
  tierColor: string;
  direction?: 'left' | 'right';
  speed?: string;
}

function TierSection({ title, sponsors, tierColor, direction = 'left', speed = '30s' }: TierSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-[5px] w-full"
    >
      <div className="flex items-center justify-center gap-3 mb-4 px-4 sm:px-8 lg:px-16 xl:px-32 w-full" style={{ marginBottom: '20px' }}>
        <div className="h-px flex-1 bg-accent/15" />
        <h3 className={`font-heading font-bold text-base sm:text-3xl whitespace-nowrap ${tierColor}`}>{title}</h3>
        <div className="h-px flex-1 bg-accent/15" />
      </div>
      <MarqueeRow sponsors={sponsors} direction={direction} speed={speed} />
    </motion.div>
  );
}

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sponsorlar" className="py-12 sm:py-28 relative overflow-hidden w-full bg-transparent">

      <div ref={ref} className="relative z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 px-4 sm:px-8 lg:px-16 xl:px-32 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center" style={{ marginBottom: '20px' }}>
            <span className="bg-gradient-to-r from-accent to-cta bg-clip-text text-transparent">
              Sponsorlar
            </span>
          </h2>
        </motion.div>

        {/* Financial Sponsors */}
        <TierSection
          title="Platin Sponsor"
          sponsors={platinSponsors}
          tierColor="bg-gradient-to-r from-cyan-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent"
          direction="left"
          speed="60s"
        />

        <TierSection
          title="Altın Sponsor"
          sponsors={altinSponsors}
          tierColor="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
          direction="left"
          speed="75s"
        />

        <TierSection
          title="Gümüş Sponsor"
          sponsors={gumusSponsors}
          tierColor="bg-gradient-to-r from-gray-600 via-zinc-500 to-gray-600 bg-clip-text text-transparent"
          direction="left"
          speed="84s"
        />

        {/* Divider */}
        {fuayeSponsors.length > 0 && (platinSponsors.length > 0 || altinSponsors.length > 0) && (
          <div className="my-[15px] mx-auto max-w-md h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        )}

        {/* Foyer & Media */}
        <TierSection
          title="Fuaye Sponsorları"
          sponsors={fuayeSponsors}
          tierColor="text-cta"
          direction="left"
          speed="96s"
        />

        <TierSection
          title="Medya Tanıtım Sponsorları"
          sponsors={medyaSponsors}
          tierColor="text-badge"
          direction="left"
          speed="72s"
        />
      </div>
    </section>
  );
}
