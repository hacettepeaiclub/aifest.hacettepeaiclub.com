import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* Custom social SVG icon (Lucide doesn't include brand icons) */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const partners = [
  {
    name: 'Ankara Üniversitesi\nBÖTE Topluluğu',
    badge: 'ANKARA BÖTE',
    logo: 'ankaraunibote_logo.jpg',
    instagram: 'https://www.instagram.com/ankaraunibote/'
  },
  {
    name: 'ODTÜ\nBilgisayar Topluluğu',
    badge: 'METU CCLUB',
    logo: 'metu_cclub.png',
    instagram: 'https://www.instagram.com/metucclub/'
  },
  {
    name: 'Bilkent Üniversitesi\nİşletme ve Ekonomi Topluluğu',
    badge: 'BİLKENT MEC',
    logo: 'bilkent_mec.png',
    instagram: 'https://www.instagram.com/bilkentmec/'
  },
  {
    name: 'Atılım Üniversitesi\nIEEE Topluluğu',
    badge: 'IEEE ATILIM',
    logo: 'ieee_atilim.jpg',
    instagram: 'https://www.instagram.com/ieeeatilim/'
  },
  {
    name: 'Hacettepe Üniversitesi\nİstatistik Topluluğu',
    badge: 'HÜİST',
    logo: 'huist.png',
    instagram: 'https://www.instagram.com/huistatistik/'
  },
  {
    name: 'Gazi Üniversitesi\nSiber Güvenlik Topluluğu',
    badge: 'GAZİ CYBER',
    logo: 'gazi_cyber.png',
    instagram: 'https://www.instagram.com/gazicyber/'
  },
  {
    name: 'Atılım Üniversitesi\nYapay Zeka Topluluğu',
    badge: 'ATILIM AI',
    logo: 'atilim_logo.png',
    instagram: 'https://www.instagram.com/atilimai/'
  },
  {
    name: 'Bilkent Üniversitesi\nGenç Girişimciler Topluluğu',
    badge: 'BİLKENT YES',
    logo: 'bilkent_yes.png',
    instagram: 'https://www.instagram.com/bilkentyes/'
  },
  {
    name: 'Ankara Üniversitesi\nYapay Zeka ve Görüntü İşleme Topluluğu',
    badge: 'ANKARA YAZGIT',
    logo: 'ankara_yazgit.png',
    instagram: 'https://www.instagram.com/au_yazgit/'
  },
];

export default function Stakeholders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="paydaslar" className="py-24 px-4 sm:py-28 sm:px-8 lg:px-16 xl:px-32 w-full relative flex flex-col items-center bg-transparent">
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-badge/5 blur-[80px]" />

      <div ref={ref} className="w-full relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-center">
            <span className="bg-gradient-to-r from-cta to-badge bg-clip-text text-transparent">
              <br /> Paydaşlar
            </span>
          </h2>
          <p className="mt-4 text-white/80 font-body max-w-2xl mx-auto text-base sm:text-lg text-center italic mb-2">
            AI Fest'i birlikte şekillendirdiğimiz topluluklar ve kurumsal ortaklar
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="w-full max-w-7xl flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-6 mb-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.badge}
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="group w-[150px] sm:w-[190px] lg:w-[220px]"
            >
              <div className="relative p-5 sm:p-6 rounded-3xl bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 hover:bg-white/65 hover:border-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 text-center overflow-hidden h-full min-h-[260px] sm:min-h-[290px] flex flex-col items-center justify-between">
                {/* Logo container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300 overflow-hidden border border-white/80" style={{ marginTop: '25px' }}>
                  <img
                    src={`${import.meta.env.BASE_URL}${partner.logo}`}
                    alt={partner.badge}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                {/* Names */}
                <div className="my-auto py-2 flex flex-col items-center">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-text tracking-wide mb-1">
                    {partner.badge}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-text/80 leading-tight">
                    {partner.name.split('\n').map((line, idx, arr) => (
                      <span key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Instagram link */}
                {partner.instagram && (
                  <a
                    href={partner.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 p-1.5 rounded-full text-text/70 hover:text-[#E4405F] hover:bg-white/70 transition-all duration-300"
                    style={{ marginBottom: '32px' }}
                    aria-label={`${partner.badge} Instagram`}
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
