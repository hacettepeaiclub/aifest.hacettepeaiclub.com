import { useEffect, useState } from 'react';
import { EVENT_START } from '../lib/links';

function remaining() {
  const diff = Math.max(0, EVENT_START.getTime() - Date.now());
  return {
    done: diff === 0,
    parts: [
      { value: Math.floor(diff / 86_400_000), label: 'Gün' },
      { value: Math.floor(diff / 3_600_000) % 24, label: 'Saat' },
      { value: Math.floor(diff / 60_000) % 60, label: 'Dk' },
      { value: Math.floor(diff / 1000) % 60, label: 'Sn' },
    ],
  };
}

/** Afişteki bilgi şeridine oturan sade geri sayım. */
export default function Countdown() {
  const [state, setState] = useState(remaining);

  useEffect(() => {
    const id = window.setInterval(() => setState(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (state.done) {
    return <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-fg">Etkinlik başladı!</p>;
  }

  return (
    <div className="flex items-end gap-3 sm:gap-4" role="timer" aria-label="Etkinliğe kalan süre">
      {state.parts.map(p => (
        <div key={p.label} className="flex flex-col items-center">
          <span className="font-display text-2xl font-extrabold tabular-nums leading-none text-fg sm:text-3xl">
            {String(p.value).padStart(2, '0')}
          </span>
          <span className="mt-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-subtle">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
