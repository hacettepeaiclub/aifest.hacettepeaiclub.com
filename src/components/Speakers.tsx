import { motion, useInView, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface Speaker {
  name: string;
  title: string;
  org: string;
  color: string;
  linkedin: string;
  image?: string;
}

const row1Speakers: Speaker[] = [
  { name: 'Merve Benlikaş Demirbağ', title: 'Otomotiv Sektöründe Yapay Zeka', org: 'Ford Otosan', color: 'from-cta to-accent', linkedin: 'https://www.linkedin.com/in/merve-benlika%C5%9F-8b045b12a', image: 'speakers/merve_benlikas.png' },
  { name: 'Bahar Serçin Halefoğlu', title: 'AI Governance Advisor', org: 'ALSE Data CEO', color: 'from-accent to-deep', linkedin: 'https://www.linkedin.com/in/baharsercinhalefoglu/', image: 'speakers/bahar_sercin_halefoglu.png' },
  { name: 'Dr. Fatih Hattatoğlu', title: 'AI Strategist & Data Scientist', org: 'Wise Maple', color: 'from-badge to-accent', linkedin: 'https://www.linkedin.com/in/fatih-hattatoglu-phd/', image: 'speakers/fatih_hattatoglu.png' },
  { name: 'Burak Tunca', title: 'Fintech Sektöründe Yapay Zeka', org: 'PayTR', color: 'from-deep to-cta', linkedin: 'https://www.linkedin.com/in/buraktunca01', image: 'speakers/burak_tunca.png' },
  { name: 'Çağdaş Hakan Aladağ', title: "Yapay Zeka'nın Geleceği", org: 'Hacettepe Üniversitesi', color: 'from-cta to-badge', linkedin: 'https://www.linkedin.com/in/cagdas-hakan-aladag-279b9221/', image: 'speakers/cagdas_hakan_aladag.png' },
];

const row2Speakers: Speaker[] = [
  { name: 'Ata Seren', title: 'Siber Güvenlikte Yapay Zeka', org: 'HAVELSAN', color: 'from-deep to-accent', linkedin: 'https://www.linkedin.com/in/ataseren', image: 'speakers/ata_seren.png' },
  { name: 'Azra Melis Ertan', title: 'Siber Güvenlik Uzmanı', org: 'Trendyol', color: 'from-cta to-accent', linkedin: 'https://www.linkedin.com/in/azra-melis-ertan/', image: 'speakers/azra_melis_ertan.png' },
  { name: 'Ege Mert Gülderen', title: 'Model Değil: Sistem', org: 'DeePix', color: 'from-accent to-deep', linkedin: 'https://www.linkedin.com/in/egemertg%C3%BClderen/', image: 'speakers/ege_mert_gulderen.jpg' },
  { name: 'Aytaç Mestçi', title: 'Digital Ecosystem Innovator', org: 'MarkeFront', color: 'from-badge to-cta', linkedin: 'https://www.linkedin.com/in/aytacmestci/', image: 'speakers/aytac_mestci.png' },
  { name: 'Gürçin Gökçebağ', title: 'Educator & Strategist | Speaker', org: 'WeAcademyTR', color: 'from-cta to-badge', linkedin: 'https://www.linkedin.com/in/gürçin-gökçebağ/', image: 'speakers/gurcin_gokcebag.png' },
];

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [flipped, setFlipped] = useState(false);
  const initials = speaker.name
    .split(' ')
    .filter(part => !['Dr.', 'Prof.'].includes(part))
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      className="flex-shrink-0 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] [perspective:1500px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${flipped ? '[transform:translateZ(-150px)_rotateX(90deg)]' : '[transform:translateZ(-150px)]'}`}>

        {/* FRONT FACE */}
        <div className="absolute inset-0 bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 rounded-3xl overflow-hidden shadow-xl flex flex-col items-center justify-center p-4 sm:p-6 [backface-visibility:hidden] [transform:rotateX(0deg)_translateZ(150px)]">

          {/* Round photo frame */}
          <div
            className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center shadow-lg ring-4 ring-white shrink-0 ${speaker.image ? 'bg-white/40' : `bg-gradient-to-br ${speaker.color} text-white font-heading font-bold text-xl sm:text-3xl`
              }`}
            style={{ marginBottom: "24px" }}
          >
            {speaker.image ? (
              <img
                src={`${import.meta.env.BASE_URL}${speaker.image}`}
                alt={speaker.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              initials
            )}
          </div>

          {/* Name & title */}
          <h3 className="font-heading font-bold text-text text-sm sm:text-lg text-center mt-3 sm:mt-4 leading-tight line-clamp-2 px-2" style={{ marginBottom: "8px" }}>
            {speaker.name}
          </h3>
          <p className="text-xs sm:text-sm text-cta font-body font-semibold text-center mt-1 sm:mt-1.5 leading-tight line-clamp-1 px-2">
            {speaker.title}
          </p>
          <p className="text-[10px] sm:text-xs text-text-muted font-body text-center mt-0.5 sm:mt-1 line-clamp-1 px-2">
            {speaker.org}
          </p>
        </div>

        {/* BOTTOM FACE (Revealed on hover/tap) */}
        <div className="absolute inset-0 bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 rounded-3xl overflow-hidden shadow-xl flex flex-col items-center justify-center p-4 sm:p-6 [backface-visibility:hidden] [transform:rotateX(-90deg)_translateZ(150px)]">

          <h3 className="font-heading font-bold text-text text-base sm:text-xl text-center mb-4 sm:mb-6">
            Bağlantı Kurun
          </h3>
          <p className="text-xs sm:text-sm text-text-muted font-body text-center mb-4 sm:mb-6" style={{ marginBottom: "12px" }}>
            {speaker.name} ile profesyonel ağınızı genişletin.
          </p>

          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/25 text-[#0A66C2] transition-colors duration-200 hover:scale-110 transform"
            aria-label={`${speaker.name} LinkedIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkedInIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </div>

      </div>
    </div>
  );
}

export default function Speakers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const allSpeakers = [...row1Speakers, ...row2Speakers];
  // 3 copies to safely allow dragging left or right without seeing empty space
  const marqueeSpeakers = [...allSpeakers, ...allSpeakers, ...allSpeakers];

  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  // Initialize position to the middle copy so dragging right doesn't immediately hit the left edge
  useEffect(() => {
    if (trackRef.current) {
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      x.set(-singleSetWidth);
    }
  }, [x]);

  useAnimationFrame((_, delta) => {
    let currentX = x.get();

    // Only auto-scroll if not hovered and not dragging
    if (!isHovered && !isDragging) {
      currentX -= 0.065 * delta; // speed factor (approx 80px/s)
    }

    // Seamless wrap check
    if (trackRef.current) {
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      if (currentX <= -singleSetWidth * 2) {
        currentX += singleSetWidth;
      } else if (currentX >= 0) {
        currentX -= singleSetWidth;
      }
    }

    x.set(currentX);
  });

  return (
    <section id="konusmacilar" className="py-12 sm:py-64 relative overflow-hidden w-full bg-transparent">

      <div ref={ref} className="relative z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center mb-10 sm:mb-24 px-4 sm:px-8 lg:px-16 xl:px-32 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text w-full">
            <br />Alanında Uzman{' '}
            <span className="bg-gradient-to-r from-cta to-accent bg-clip-text text-transparent">
              Konuşmacılar
            </span>
          </h2>
          <p className="mt-4 italic text-accent/80 font-body max-w-xl w-full text-base text-center" style={{ marginBottom: '15px' }}>
            Yapay zekâ dünyasının en ilham verici lider isimlerini ağırlıyoruz.
          </p>
        </motion.div>

        {/* Marquee with stagger */}
        <div className="relative w-full overflow-hidden py-4 sm:py-10" style={{ marginBottom: '10px' }}>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

          {/* Marquee track */}
          <motion.div
            ref={trackRef}
            style={{ x, marginBottom: "20px", marginTop: "10px" }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }} // high limits, wrapping handles the rest
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="flex w-max gap-4 sm:gap-8 items-center cursor-grab active:cursor-grabbing"
          >
            {marqueeSpeakers.map((speaker, i) => (
              <div key={`marquee-${speaker.name}-${i}`} className={`flex-shrink-0 group transition-transform ${i % 2 === 0 ? 'mb-[120px] sm:mb-[250px]' : 'mt-[120px] sm:mt-[250px]'}`}>
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
