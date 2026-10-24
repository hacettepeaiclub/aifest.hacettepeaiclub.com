import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const venueName = 'Mehmet Akif Ersoy K Salonu';
  const googleMapsEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.607!2d32.7337!3d39.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f8a0a4a7e2d%3A0x9c6b1e3b8e0a1234!2sTun%C3%A7alp%20%C3%96zgen%20Kongre%20ve%20Konferans%20Merkezi!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str';
  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir//Tun%C3%A7alp+%C3%96zgen+Kongre+ve+Konferans+Merkezi,+Hacettepe+%C3%9Cniversitesi,+Ankara';

  return (
    <section id="konum" className="py-12 px-4 sm:pt-28 sm:pb-16 sm:px-8 lg:px-16 xl:px-32 w-full relative flex flex-col items-center bg-transparent">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-cta/5 blur-[80px]" />

      <div ref={ref} className="w-full relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 w-full"
        >

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white from-white to-white/50 bg-clip-text" style={{ marginBottom: '8px' }}>
            <span className="bg-gradient-to-r from-cta via-accent to-badge bg-clip-text text-transparent">
              Nasıl Ulaşılır?
            </span>
          </h2>
        </motion.div>

        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
          {/* 1. Google Maps */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full rounded-3xl overflow-hidden border border-accent/10 shadow-lg shadow-accent/5"
          >
            <iframe
              title="Etkinlik Konumu"
              src={googleMapsEmbedUrl}
              className="w-full h-[250px] sm:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* 2. Address Info Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full p-5 sm:p-8 rounded-3xl bg-[#f3f4f6]/95 backdrop-blur-xl border-1 border-purple-700/8 hover:border-purple-700/95 transition-all duration-300 shadow-lg shadow-purple-700/25 flex flex-col items-center text-center gap-2"
            style={{ marginBottom: '-16px', marginTop: '-20px' }}
          >
            {/* Centered venue name & address */}
            <div className="flex flex-col items-center text-center max-w-2xl">
              <div className="">
                <MapPin className="w-8 h-8 text-deep" />
              </div>
              <h3 className="font-heading font-bold text-text text-xl sm:text-2xl">{venueName}</h3>
              <p className="text-base text-text-muted font-body mt-1 sm:mt-2">
                Hacettepe Üniversitesi, Beytepe Kampüsü, Ankara
              </p>
            </div>

            {/* Horizontal features list */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-10 pt-5 border-t border-accent/10 w-full">
              <div className="flex items-center gap-1 text-sm sm:text-base text-text-muted font-body">
                <span className="w-2 h-2 rounded-full bg-cta flex-shrink-0" />
                300 kişi kapasiteli konferans salonu
              </div>
              <div className="flex items-center gap-1 text-sm sm:text-base text-text-muted font-body">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Geniş fuaye alanı
              </div>
              <div className="flex items-center gap-1 text-sm sm:text-base text-text-muted font-body">
                <span className="w-2 h-2 rounded-full bg-badge flex-shrink-0" />
                Ücretsiz otopark imkânı
              </div>
            </div>
          </motion.div>

          {/* 3. Directions Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            /* mb-[10px] yerine mb-12 veya mb-16 kullanarak mesafeyi artırın */
            className="w-full mb-12 sm:mb-16"
          >
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full p-4 sm:p-5 rounded-2xl bg-gray-200/90 hover:bg-gray-300 active:bg-gray-300 text-text font-body font-bold text-base sm:text-lg border border-gray-300/80 shadow-sm transition-all duration-300 hover:shadow-md active:shadow-md active:scale-95"
              style={{ marginBottom: '5px' }}
            >
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:rotate-45 group-active:rotate-45 transition-transform duration-300" />
              <span>Yol Tarifi Al</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
