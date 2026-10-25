import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Gift, CheckCircle, X, Sparkles, User, BookOpen, Clock, Coffee, UtensilsCrossed, Mic, DoorOpen, Flag, Calendar } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  topic: string;
  speaker: string;
  speakerTitle?: string;
  type?: 'session' | 'break' | 'registration' | 'opening' | 'closing';
}

const day1Schedule: ScheduleItem[] = [
  {
    id: 'd1-reg',
    time: '09:30 – 09:45',
    topic: 'Kayıt & Karşılama',
    speaker: '',
    type: 'registration',
  },
  {
    id: 'd1-open',
    time: '09:45 – 10:00',
    topic: 'Açılış Konuşması',
    speaker: '',
    type: 'opening',
  },
  {
    id: 'd1-1',
    time: '10:00 – 10:45',
    topic: 'Otomotiv Sektöründe Yapay Zeka',
    speaker: 'Merve Benlikaş Demirbağ',
    speakerTitle: 'Ford Otosan',
    type: 'session',
  },
  {
    id: 'd1-2',
    time: '11:00 – 11:45',
    topic: 'Yapay Zeka Yönetişimi ve Güvenliği',
    speaker: 'Bahar Serçin Halefoğlu',
    speakerTitle: 'ALSE Data CEO, AI Governance Advisor',
    type: 'session',
  },
  {
    id: 'd1-lunch',
    time: '11:45 – 12:30',
    topic: 'Öğle Arası',
    speaker: '',
    type: 'break',
  },
  {
    id: 'd1-3',
    time: '12:30 – 13:15',
    topic: 'TUSAŞ Oturumu',
    speaker: '',
    speakerTitle: 'TUSAŞ',
    type: 'session',
  },
  {
    id: 'd1-4',
    time: '13:30 – 14:15',
    topic: 'Şirketlerde Rota Yeniden Hesaplanıyor',
    speaker: 'Dr. Fatih Hattatoğlu',
    speakerTitle: 'Wise Maple / AI Strategist & Data Scientist',
    type: 'session',
  },
  {
    id: 'd1-coffee',
    time: '14:15 – 14:45',
    topic: 'Kahve & Networking',
    speaker: '',
    type: 'break',
  },
  {
    id: 'd1-5',
    time: '14:45 – 15:30',
    topic: 'Fintech Sektöründe Yapay Zeka',
    speaker: 'Burak Tunca',
    speakerTitle: 'PayTR',
    type: 'session',
  },
  {
    id: 'd1-6',
    time: '15:45 – 16:30',
    topic: '6. Oturum',
    speaker: '',
    speakerTitle: 'Yakında Açıklanacak',
    type: 'session',
  },
  {
    id: 'd1-close',
    time: '16:30',
    topic: 'Kapanış',
    speaker: '',
    type: 'closing',
  },
];

const day2Schedule: ScheduleItem[] = [
  {
    id: 'd2-reg',
    time: '09:30 – 09:45',
    topic: 'Kayıt & Karşılama',
    speaker: '',
    type: 'registration',
  },
  {
    id: 'd2-open',
    time: '09:45 – 10:00',
    topic: 'Açılış Konuşması',
    speaker: '',
    type: 'opening',
  },
  {
    id: 'd2-1',
    time: '10:00 – 10:45',
    topic: "Yapay Zeka'nın Geleceği",
    speaker: 'Çağdaş Hakan Aladağ',
    speakerTitle: 'İstatistik Akademisyen',
    type: 'session',
  },
  {
    id: 'd2-2',
    time: '11:00 – 11:45',
    topic: 'Siber Güvenlikte Yapay Zeka',
    speaker: 'Ata Seren & Azra Melis Ertan',
    speakerTitle: 'HAVELSAN & Trendyol',
    type: 'session',
  },
  {
    id: 'd2-lunch',
    time: '11:45 – 12:30',
    topic: 'Öğle Arası',
    speaker: '',
    type: 'break',
  },
  {
    id: 'd2-3',
    time: '12:30 – 13:15',
    topic: 'ASELSAN Oturumu',
    speaker: '',
    speakerTitle: 'ASELSAN',
    type: 'session',
  },
  {
    id: 'd2-4',
    time: '13:30 – 14:15',
    topic: 'Model Değil: Sistem',
    speaker: 'Ege Mert Gülderen',
    speakerTitle: 'DeePix',
    type: 'session',
  },
  {
    id: 'd2-coffee',
    time: '14:15 – 14:45',
    topic: 'Kahve & Networking',
    speaker: '',
    type: 'break',
  },
  {
    id: 'd2-5',
    time: '14:45 – 15:30',
    topic: "E-Ticaretin Geleceği ve Yapay Zeka",
    speaker: 'Aytaç Mestçi',
    speakerTitle: 'MarkeFront / Digital Ecosystem Innovator',
    type: 'session',
  },
  {
    id: 'd2-6',
    time: '15:45 – 16:30',
    topic: '6. Oturum',
    speaker: '',
    speakerTitle: 'Yakında Açıklanacak',
    type: 'session',
  },
  {
    id: 'd2-close',
    time: '16:30',
    topic: 'Kapanış',
    speaker: '',
    type: 'closing',
  },
];

function BreakIcon({ type }: { type: string }) {
  switch (type) {
    case 'break':
      return <Coffee className="w-5 h-5" />;
    case 'registration':
      return <DoorOpen className="w-5 h-5" />;
    case 'opening':
      return <Mic className="w-5 h-5" />;
    case 'closing':
      return <Flag className="w-5 h-5" />;
    default:
      return <UtensilsCrossed className="w-5 h-5" />;
  }
}

export default function ProgramSchedule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [selectedRaffle, setSelectedRaffle] = useState<ScheduleItem | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const SHOW_SCHEDULE = true;

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRaffle(null);
      setFormData({ name: '', email: '', phone: '' });
    }, 2500);
  };

  const isBreakType = (item: ScheduleItem) =>
    item.type === 'break' || item.type === 'registration' || item.type === 'opening' || item.type === 'closing';

  return (
    <section
      ref={sectionRef}
      id="programakisi"
      className="pt-14 pb-12 px-4 sm:pt-28 sm:pb-20 sm:px-6 w-full relative flex flex-col items-center bg-transparent overflow-hidden"
    >
      <div id="takvim" className="absolute -top-24 pointer-events-none" />

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-10 w-[350px] h-[350px] rounded-full bg-cta/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col items-center max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12 w-full"
        >
          {/* Date Badge */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-3">
            Program{' '}
            <span className="bg-gradient-to-r from-accent to-cta bg-clip-text text-transparent">
              Akışı & Takvim
            </span>
          </h2>
          <p className="text-text-muted italic font-body text-sm sm:text-base max-w-xl text-center">
            3 Kasım Salı ve 4 Kasım Çarşamba günleri boyunca ilham verici oturumlar ve özel sürpriz çekilişler
          </p>
        </motion.div>

        {/* Schedule Content */}
        {SHOW_SCHEDULE ? (
          <>
            {/* Day Selector Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 p-1.5 rounded-xl bg-[#f3f4f6]/60 backdrop-blur-xl border border-white/60 shadow-inner mb-8 sm:mb-12"
            >
              <button
                onClick={() => setActiveDay(1)}
                className={`flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg font-heading font-semibold text-sm sm:text-base transition-all duration-300 ${activeDay === 1
                  ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                  : 'text-text-muted hover:text-text hover:bg-white/40'
                  }`}
              >
                <span style={{ marginLeft: "10px" }}>1. Gün</span>
                <span className="opacity-50">·</span>
                <span style={{ marginRight: "10px" }}>3 Kasım Salı</span>
              </button>
              <button
                onClick={() => setActiveDay(2)}
                className={`flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg font-heading font-semibold text-sm sm:text-base transition-all duration-300 ${activeDay === 2
                  ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                  : 'text-text-muted hover:text-text hover:bg-white/40'
                  }`}
              >
                <span style={{ marginLeft: "10px" }}>2. Gün</span>
                <span className="opacity-50">·</span>
                <span style={{ marginRight: "10px" }}>4 Kasım Çarşamba</span>
              </button>
            </motion.div>

            {/* Schedule Grid Container */}
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 shadow-xl p-[10px]">
              {/* Day Sub-Header Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-white/60 border-b border-white/50 backdrop-blur-md">
                <div className="flex items-center" style={{ marginLeft: "10px" }}>
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="font-heading font-bold text-base sm:text-lg text-text" style={{ marginLeft: "10px" }}>
                    {activeDay === 1 ? '1. Gün Programı · 3 Kasım 2026 Salı' : '2. Gün Programı · 4 Kasım 2026 Çarşamba'}
                  </span>
                </div>
              </div>
              {/* Header Row (Desktop) */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-white/40 border-b border-white/40 font-heading font-bold text-sm sm:text-base text-text-muted uppercase tracking-wider" style={{ padding: '6px' }}>
                <div className="col-span-2 text-center flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>Saat</span>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span>Konu</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" />
                  <span>Konuşmacı</span>
                </div>
                <div className="col-span-3 text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-cta" />
                  <span>Çekiliş Katılımı</span>
                </div>
              </div>

              {/* Animated Schedule Items */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="divide-y divide-white/40"
                >
                  {currentSchedule.map((item) =>
                    isBreakType(item) ? (
                      /* Break / Registration / Opening / Closing Row */
                      <div
                        key={item.id}
                        className={`flex items-center justify-center gap-3 px-5 py-3 sm:py-4 ${item.type === 'break'
                          ? 'bg-gradient-to-r from-amber-50/60 to-orange-50/60'
                          : item.type === 'registration'
                            ? 'bg-gradient-to-r from-blue-50/60 to-indigo-50/60'
                            : item.type === 'opening'
                              ? 'bg-gradient-to-r from-emerald-50/60 to-teal-50/60'
                              : 'bg-gradient-to-r from-purple-50/60 to-pink-50/60'
                          }`}
                        style={{ padding: '12px' }}
                      >
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-white/60 text-text-muted whitespace-nowrap"
                          style={{ padding: '2.5px' }}
                        >
                          {item.time}
                        </span>
                        <div className={`flex items-center gap-2 font-heading font-semibold text-base ${item.type === 'break'
                          ? 'text-amber-700'
                          : item.type === 'registration'
                            ? 'text-blue-700'
                            : item.type === 'opening'
                              ? 'text-emerald-700'
                              : 'text-purple-700'
                          }`}>
                          <BreakIcon type={item.type || 'break'} />
                          <span>{item.topic}</span>
                        </div>
                      </div>
                    ) : (
                      /* Session Row */
                      <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 p-5 sm:p-6 hover:bg-white/40 transition-colors duration-200 items-center"
                        style={{ padding: '26px' }}
                      >
                        {/* Column 1: SAAT */}
                        <div className="md:col-span-2 flex items-center justify-center">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-accent/15 text-accent whitespace-nowrap"
                            style={{ padding: '8px' }}
                          >
                            {item.time}
                          </span>
                        </div>

                        {/* Column 2: KONU */}
                        <div className="md:col-span-4 flex flex-col items-start">
                          <h3 className="font-heading font-semibold text-text text-base sm:text-lg leading-snug">
                            {item.topic}
                          </h3>
                        </div>

                        {/* Column 3: Konuşmacı */}
                        <div className="md:col-span-3 flex flex-col items-start">
                          {item.speaker ? (
                            <>
                              <span className="font-body font-medium text-sm sm:text-base text-text">
                                {item.speaker}
                              </span>
                              {item.speakerTitle && (
                                <span className="font-body text-sm text-text-muted">
                                  {item.speakerTitle}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="font-body text-sm text-text-muted italic">
                              {item.speakerTitle || 'Yakında Açıklanacak'}
                            </span>
                          )}
                        </div>

                        {/* Column 4: Çekiliş Butonu */}
                        <div className="md:col-span-3 flex justify-center items-center mt-2 md:mt-0">
                          <button
                            onClick={() => setSelectedRaffle(item)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cta to-accent text-white font-body font-semibold text-sm leading-normal shadow-md shadow-cta/20 hover:shadow-lg hover:shadow-cta/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center w-full md:w-auto"
                          >
                            <Gift className="w-5 h-5 shrink-0" />
                            <span>Çekiliş Formu</span>
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl p-12 sm:p-12 mt-8 rounded-2xl bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 shadow-xl text-center flex flex-col items-center justify-center gap-2" style={{ margin: '1rem', padding: '1rem' }}
          >
            <div className="w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center text-cta mt-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-lg sm:text-xl font-heading font-semibold text-text leading-relaxed">
              Yakın zamanda program akışına sitemiz ve Instagram hesabımızdan ulaşabilirsiniz.
            </p>
            <p className="text-base text-text-light italic sm:text-lg text-text-muted font-body">
              Duyuruları kaçırmamak için takipte kalın.
            </p>
          </motion.div>
        )}
      </div>

      {/* Raffle Form Modal */}
      <AnimatePresence>
        {selectedRaffle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-deep/60 backdrop-blur-md"
              onClick={() => setSelectedRaffle(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-accent/20 text-left"
            >
              <button
                onClick={() => setSelectedRaffle(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-text-muted transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-text">Başarıyla Kaydolundu!</h3>
                  <p className="text-sm text-text-muted">
                    Çekiliş katılımınız alındı. Oturum sonunda kazananlar açıklanacaktır!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 text-accent font-heading font-bold text-lg">
                    <Sparkles className="w-5 h-5 text-cta" />
                    <h3>Seans Çekiliş Formu</h3>
                  </div>

                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 text-xs text-text-muted space-y-1">
                    <p className="font-semibold text-text">{selectedRaffle.topic}</p>
                    <p>{selectedRaffle.speaker ? `${selectedRaffle.speaker} · ` : ''}{selectedRaffle.time}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Ad Soyad *</label>
                    <input
                      type="text"
                      required
                      placeholder="Adınız Soyadınız"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">E-Posta *</label>
                    <input
                      type="email"
                      required
                      placeholder="ornek@hacettepe.edu.tr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Telefon (İsteğe Bağlı)</label>
                    <input
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cta to-accent text-white font-heading font-bold text-sm shadow-lg shadow-cta/30 hover:opacity-95 transition-all duration-200 mt-2"
                  >
                    Çekilişe Katıl
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
