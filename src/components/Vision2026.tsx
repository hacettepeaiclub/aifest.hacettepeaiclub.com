import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Users, Lightbulb, Globe } from 'lucide-react';

const goals = [
  {
    icon: Users,
    title: 'Çok Disiplinli Katılım',
    subtitle: 'Multidisipliner Güç',
    description:
      'Katılımcı profilimizi sadece Mühendislik Fakültesi ile sınırlı tutmayarak; İktisadi İdari Bilimler Fakültesi, Tıp Fakültesi, Fen ve Edebiyat Fakültesi gibi yapay zekanın dönüştürdüğü tüm dikey sektörlerdeki öğrencileri tek bir ekosistemde buluşturuyoruz. Böylece ağını farklı disiplenlerden kişilerle tanışıp genişletirsin.',
    tags: ['Müh. Fakültesi', 'İİBF', 'Fen Edb. Fakültesi', 'Tıp Fakültesi'],
    color: 'from-gray to-cta',
    borderColor: 'border-cta/20 hover:border-cta/40',
    bgColor: 'to-cta/95',
    textColor: 'text-cta',
    tagBgColor: 'bg-cta/10',
  },
  {
    icon: Lightbulb,
    title: 'İnteraktif Deneyim Alanları',
    subtitle: 'Deneyim Pazarlaması',
    description:
      'Şirketlerimizin teknik güçlerini ve kariyer olanaklarını sadece sahne sunumlarıyla değil; fuaye alanındaki özel stant etkinlikleri, anlık mini-case yarışmaları ve uygulamalı workshop\'lar ile doğrudan deneyimleyebilirsin. Belli mi olur belki de bir staj ayarlarsın.',
    tags: ['Fuaye Standları', 'Mini-Caseler', 'Workshoplar'],
    color: 'from-accent to-gray',
    borderColor: 'border-accent/20 hover:border-accent/40',
    bgColor: 'to-accent/95',
    textColor: 'text-accent',
    tagBgColor: 'bg-accent/10',
  },
  {
    icon: Globe,
    title: 'Genişletilmiş Ekosistem',
    subtitle: 'Çok Sesli Bir Gençlik Zirvesi',
    description:
      'Çeşitli öğrenci topluluklarıyla stratejik ortaklıklar kurarak, etkinliğin kampüs içi reklam ve tanıtım yayılımını maksimuma çıkarmak; iş birliği yaptığımız topluluklara fuaye alanında özel stant açma imkânı tanıyarak AI Fest\'i çok sesli bir gençlik zirvesine dönüştürürerek farklı üniversiteden öğrenciler ile tanışman için olanak sağlıyoruz.',
    tags: ['Stratejik İşbirlikleri', 'Çeşitli Topluluklar', 'Şirket Tanıtımları'],
    color: 'from-gray to-badge',
    borderColor: 'border-badge/20 hover:border-badge/20',
    bgColor: 'to-badge/95',
    textColor: 'text-badge',
    tagBgColor: 'bg-badge/10',
  },
];

function GoalCard({ goal, index, isInView }: { goal: typeof goals[0]; index: number; isInView: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      key={goal.title}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group relative w-full h-full cursor-pointer"
      style={{ perspective: '1000px', margin: '0 5px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${flipped ? '[transform:rotateX(180deg)]' : ''} group-hover:[transform:rotateX(180deg)]`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* INVISIBLE SPACER (Forces container height for absolute children) */}
        <div className="invisible p-6 sm:p-10 pointer-events-none flex flex-col items-center justify-center">
          <div className="flex flex-col items-start text-left p-4">
            <div className="w-14 h-14 mb-6" />
            <h3 className="text-xl mb-2">{goal.title}</h3>
            <p className="text-lg">{goal.subtitle}</p>
            <p className="text-sm sm:text-base mb-4 leading-relaxed">{goal.description}</p>
            <div className="flex flex-wrap gap-3 mt-[45px]">
              {goal.tags.map(tag => (
                <span key={tag} className="inline-block rounded-md border border-transparent text-xs sm:text-sm font-medium" style={{ margin: '-11px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FRONT FACE */}
        <div
          className={`absolute inset-0 p-6 sm:p-10 rounded-3xl bg-[#f3f4f6]/45  border ${goal.borderColor} overflow-hidden flex flex-col items-center justify-center shadow-lg backdrop-blur-3xl`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`absolute top-0 left-0 right-0 h-[1px] bg-[#f3f4f6]/45`} />

          <div className={`absolute top-5 left-3 sm:top-4 sm:left-3 inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${goal.color} text-white shadow-md`}>
            <goal.icon className="w-5 h-5" />
          </div>

          {/* Inner Content Wrapper */}
          <div className="flex flex-col items-start text-left w-full max-w-sm p-4">
            <div className="w-14 h-14 mb-6" style={{ marginBottom: '-20px' }} />

            <h2 className="font-heading font-bold text-text text-2xl mb-8">{goal.title}</h2>
            <p className="text-md italic text-slate-800 font-body font-light" style={{ marginBottom: '8px', marginTop: '6px' }}>
              {goal.subtitle}
            </p>

            <div className="flex items-center flex-wrap gap-3 mt-[45px]">
              {goal.tags.map(tag => (
                <span
                  key={tag}
                  className={`inline-block rounded-md backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-white-50 to-white-300/50 text-slate-800 font-bold text-xs sm:text-md shadow-md transition-all duration-300 hover:bg-white/80 hover:text-text hover:-translate-y-0.5`}
                  style={{ padding: '3.1px' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Mobile hint */}
            <p className="text-xs text-text-muted/60 absolute bottom-[5px] left-1/2 -translate-x-1/2 md:hidden whitespace-nowrap">Detaylar için dokun ↻</p>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 p-6 sm:p-10 rounded-3xl bg-[#f3f4f6]/45 border ${goal.borderColor} overflow-hidden flex flex-col items-center justify-center shadow-lg backdrop-blur-3xl`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
        >
          <div className={`absolute top-0 left-0 right-0 h-[1px] bg-[#f3f4f6]/45`} />

          {/* Inner Content Wrapper */}
          <div className="flex flex-col items-start text-left w-full max-w-sm p-4">
            <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
              {goal.description}
            </p>
            {/* Mobile hint */}
            <p className="text-xs text-text-muted/60 absolute bottom-[5px] left-1/2 -translate-x-1/2 md:hidden whitespace-nowrap">Geri dönmek için dokun ↻</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Vision2026() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="vizyon" className="py-12 px-4 sm:py-28 sm:px-8 lg:px-16 xl:px-32 w-full relative flex flex-col items-center bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cta/5 blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />

      <div ref={ref} className="w-full relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text">
            AI Fest 2026'da{' '}
            <span className="bg-gradient-to-r from-cta via-accent to-badge bg-clip-text text-transparent">
              Sizi Neler Bekliyor?
            </span>
          </h2>
          <p className="mt-4 text-text-muted italic text-md font-body max-w-2xl text-center text-base sm:text-md" style={{ marginBottom: '1rem' }}>
            Her yıl katılımcı sayımızı ve çeşitliliğimizi büyütmeye devam ediyoruz.
            <br />Üç ana hedef üzerinden ilerliyoruz.
          </p>
        </motion.div>

        {/* Goals grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {goals.map((goal, i) => (
            <GoalCard key={goal.title} goal={goal} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
