import { motion } from 'framer-motion';
import Countdown3D from './Countdown3D';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 w-full bg-accent text-white"
    >
      {/* Animated Background Image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1700508672285-786060ccf960?q=80&w=3067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated gradient blobs for dark background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(57, 184, 186, 0.3) 0%, transparent 70%)', willChange: 'transform' }}
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(218, 93, 151, 0.3) 0%, transparent 70%)', willChange: 'transform' }}
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)', willChange: 'transform' }}
        />
      </div>

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full pt-20 sm:pt-24">
        {/* Logo */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 sm:mb-10 flex justify-center"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}aifest_hero_logo.png`}
            alt="AI Fest Hero Logo"
            className="w-36 h-36 sm:w-64 sm:h-64 lg:w-[320px] lg:h-[320px] object-contain drop-shadow-2xl rounded-2xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
        >
          AI Fest{' '}
          <span className="bg-gradient-to-r from-cta via-white to-badge bg-clip-text text-transparent">
            '26
          </span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-4 sm:mt-8 text-base sm:text-2xl lg:text-3xl text-white/90 font-body font-light max-w-3xl leading-relaxed"
        >
          Yapay zekanın geleceğini şekillendirmek için,{' '}
          <span className="text-cta font-bold"><br />bir araya geliyoruz.</span>
        </motion.p>

        {/* Sub-text & Date */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 5, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="mt-3 flex flex-col items-center gap-2"
          style={{ marginBottom: '-25px' }}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-[3px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cta animate-pulse" style={{ marginLeft: "10px" }} />
            <span className="font-semibold text-white">3 – 4 Kasım 2026</span>
            <span className="text-white/40"> ·</span>
            <span className="text-white/80" style={{ marginRight: "10px" }}>Salı & Çarşamba </span>

          </div>
          <p className="text-xs sm:text-sm text-white/40 font-body font-light">
            Hacettepe Üniversitesi Yapay Zeka Topluluğu · #AIForAll
          </p>
        </motion.div>

        {/* 3D Countdown */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          className="w-full pointer-events-none"
          style={{ marginTop: "-10px", marginBottom: "-30px" }}
        >
          <Countdown3D />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="relative z-50 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 w-full sm:w-auto -mt-4 sm:-mt-16"
        >
          <a
            href="#hakkinda"
            className="inline-flex items-center justify-center gap-1 px-8 py-4 sm:px-10 sm:py-5 bg-transparent text-white font-body font-bold text-base sm:text-xl rounded-2xl border-2 border-white/30 hover:border-white hover:bg-white/10 shadow-sm hover:shadow-md transition-all duration-300 whitespace-nowrap min-w-[180px] sm:min-w-[200px]"
          >
            Keşfet!
          </a>

          <a
            id="hero-register-btn"
            href="https://topluluklar.hacettepe.edu.tr/topluluklar/yapay-zeka-toplulugu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-8 py-4 sm:px-10 sm:py-5 bg-cta text-white font-body font-bold text-base sm:text-xl rounded-2xl shadow-lg shadow-cta/40 hover:bg-cta-hover hover:shadow-2xl hover:shadow-cta/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 whitespace-nowrap min-w-[180px] sm:min-w-[200px]"
          >
            <span>Kayıt Ol</span>
          </a>
        </motion.div>

        {/* Scroll indicator (Downward Arrow) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 sm:mt-32 flex justify-center pb-8 sm:pb-16"
        >
          <motion.a
            href="#hakkinda"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-4 sm:p-32 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            style={{ marginTop: '22px' }}
          >
            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
