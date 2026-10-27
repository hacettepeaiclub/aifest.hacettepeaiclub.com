import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, ClipboardCheck, MapPin } from 'lucide-react';
import Countdown from './Countdown';
import { REGISTER_URL } from '../lib/links';
import { fetchFestConfig } from '../lib/attendance';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] as const },
});

export default function Hero({ onAttend }: { onAttend: () => void }) {
  // /yonetim/ panelindeki anahtarla açılan mobil "Yoklamaya Gir" butonu
  const [checkinButton, setCheckinButton] = useState(false);
  useEffect(() => {
    fetchFestConfig().then(c => setCheckinButton(c.checkin_button));
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center pb-16 pt-28 sm:pt-32">
      <div className="container-page flex flex-col items-center text-center">
        {/* Topluluk künyesi (afişin üst ortası) */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-4">
          <img src={`${import.meta.env.BASE_URL}aiclub_logo.png`} alt="" className="h-12 w-auto sm:h-16" />
          <span className="border-l border-white/40 pl-4 text-left font-display leading-[1.1] text-fg">
            <span className="block text-xs font-semibold sm:text-sm">Hacettepe Üniversitesi</span>
            <span className="block text-lg font-extrabold uppercase sm:text-2xl">Yapay Zeka</span>
            <span className="block text-xs font-semibold sm:text-sm">Topluluğu</span>
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="mt-10 font-display text-[clamp(3.5rem,15vw,10rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-fg"
        >
          AI FEST<span className="text-gradient">'26</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 font-display text-sm font-medium uppercase tracking-[0.28em] text-fg sm:text-xl sm:tracking-[0.4em]"
        >
          Ankara'nın en büyük yapay zeka zirvesi
        </motion.p>

        {checkinButton && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onAttend}
            className="btn btn-primary btn-lg mt-8 w-full sm:hidden"
          >
            <ClipboardCheck className="h-5 w-5" />
            Yoklamaya Gir
          </motion.button>
        )}

        {/* Bilgi şeridi — afişteki konum | tarih | saat satırı */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-12 grid w-full max-w-4xl grid-cols-1 border-y border-white/20 sm:grid-cols-3 sm:divide-x sm:divide-white/20"
        >
          <InfoCell icon={<MapPin className="h-7 w-7" strokeWidth={1.5} />}>
            <span className="block font-bold">Mehmet Akif Ersoy</span>
            <span className="block text-fg-muted">K Salonu</span>
          </InfoCell>
          <InfoCell icon={<CalendarDays className="h-7 w-7" strokeWidth={1.5} />} className="border-t border-white/10 sm:border-t-0">
            <span className="block font-bold">3 – 4 Kasım</span>
            <span className="block text-fg-muted">Salı · Çarşamba</span>
          </InfoCell>
          <div className="flex items-center justify-center border-t border-white/10 px-4 py-5 sm:border-t-0">
            <Countdown />
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="mt-12 flex flex-col items-center gap-4">
          <a id="hero-register-btn" href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg">
            Kayıt Ol
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-fg-subtle">#AIForAll</p>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCell({ icon, children, className = '' }: { icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 px-4 py-5 ${className}`}>
      <span className="text-fg">{icon}</span>
      <span className="text-left font-display text-sm uppercase tracking-[0.12em] text-fg sm:text-[15px]">{children}</span>
    </div>
  );
}
