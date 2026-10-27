import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';
import { programDays, type ProgramSession } from '../data/program';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const steps = [
  { title: 'Kodu gör', text: 'Oturum sırasında salondaki ekranda QR ve 4 haneli oturum kodu yansıtılır.' },
  { title: 'Yoklama ver', text: 'QR’ı okut ya da aifest.hacettepeaiclub.com/yoklama adresine gir; TC/okul no, telefonunun son 4 hanesi ve kodu yaz.' },
  { title: 'Çekilişe katıl', text: 'Yoklama veren herkes o oturumun sonunda sahnede yapılan çekilişe otomatik katılır.' },
];

export default function ProgramSchedule({ onAttend }: { onAttend: (sessionId: string) => void }) {
  const [activeDay, setActiveDay] = useState<1 | 2>(() => {
    const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' });
    return today === programDays[1].date ? 2 : 1;
  });
  const day = programDays.find(d => d.day === activeDay)!;

  return (
    <section id="programakisi" className="section">
      <div id="takvim" className="absolute -top-24" />
      <div className="container-page">
        <SectionHeader
          eyebrow="Program & Yoklama"
          title="Program akışı"
          description="3 Kasım Salı ve 4 Kasım Çarşamba boyunca ilham verici oturumlar gerçekleşecek."
          aside={
            <div className="flex shrink-0 border border-white/20" role="tablist" aria-label="Gün seç">
              {programDays.map(d => {
                const active = d.day === activeDay;
                return (
                  <button
                    key={d.day}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveDay(d.day)}
                    className={`px-5 py-3 text-left font-display uppercase transition-colors sm:px-7 ${
                      active ? 'bg-white text-night' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <span className="block text-sm font-extrabold">{d.day}. Gün</span>
                    <span className="block text-[11px] font-semibold tracking-[0.14em] opacity-75">{d.title} · {d.weekday}</span>
                  </button>
                );
              })}
            </div>
          }
        />

        {/* Yoklama nasıl çalışır */}
        <Reveal className="mb-12 grid border-y border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-white/15">
          {steps.map((s, i) => (
            <div key={s.title} className="border-b border-white/10 py-5 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <p className="font-display text-sm font-extrabold uppercase text-fg">
                <span className="mr-2 text-brand-soft">0{i + 1}</span>
                {s.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.ol
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/20"
          >
            {day.items.map(item =>
              item.kind === 'break' ? (
                <li key={item.label + item.time} className="grid grid-cols-[4.5rem_1fr] items-center gap-4 border-b border-white/10 py-3 sm:grid-cols-[8rem_1fr]">
                  <span className="font-display text-sm font-semibold tabular-nums text-fg-subtle">{item.time}</span>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">{item.label}</span>
                </li>
              ) : (
                <SessionRow key={item.id} session={item} onAttend={() => onAttend(item.id)} />
              ),
            )}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SessionRow({ session, onAttend }: { session: ProgramSession; onAttend: () => void }) {
  const tbd = !session.speaker && !session.org;
  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.025] sm:grid-cols-[8rem_1fr_auto] sm:items-center">
      <div>
        <p className="font-display text-xl font-extrabold tabular-nums leading-none text-fg sm:text-2xl">{session.time.split(' – ')[0]}</p>
        <p className="mt-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">{session.label}</p>
      </div>
      <div className="min-w-0">
        <h3 className={`text-lg font-extrabold uppercase leading-snug sm:text-xl ${tbd ? 'text-fg-subtle' : 'text-fg'}`}>{session.topic}</h3>
        {(session.speaker || session.org) && (
          <p className="mt-1 text-sm text-fg-muted">
            {session.speaker && <span className="font-semibold text-fg/90">{session.speaker}</span>}
            {session.speaker && session.org && ' · '}
            {session.org}
          </p>
        )}
      </div>
      <button onClick={onAttend} className="btn btn-ghost col-start-2 !h-10 justify-self-start sm:col-start-auto sm:justify-self-end">
        <ClipboardCheck className="h-4 w-4" />
        Yoklama Ver
      </button>
    </li>
  );
}
