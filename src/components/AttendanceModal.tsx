import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Gift, Loader2, X } from 'lucide-react';
import { findSession, programDays, sessionByline } from '../data/program';
import { checkIn, loadSavedAttendee, saveAttendee } from '../lib/attendance';

interface AttendanceModalProps {
  /** Açılışta seçili oturum; katılımcı formdan değiştirebilir. */
  initialSessionId: string;
  onClose: () => void;
}

const digitsOnly = (v: string) => v.replace(/\D/g, '');

export default function AttendanceModal({ initialSessionId, onClose }: AttendanceModalProps) {
  const [sessionId, setSessionId] = useState(initialSessionId);
  const [saved] = useState(loadSavedAttendee);
  const [idNumber, setIdNumber] = useState(saved?.idNumber ?? '');
  const [phoneLast4, setPhoneLast4] = useState(saved?.phoneLast4 ?? '');
  const [code, setCode] = useState('');
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<{ name: string; already: boolean } | null>(null);

  const current = findSession(sessionId) ?? findSession(initialSessionId)!;
  const { day, session } = current;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await checkIn({ sessionId: session.id, idNumber, phoneLast4, code: code.trim() });
    if (res.ok) {
      saveAttendee(remember ? { idNumber, phoneLast4 } : null);
      setResult({ name: res.name, already: res.alreadyCheckedIn });
      setStatus('success');
    } else {
      setMessage(res.error);
      setStatus('error');
    }
  };

  const byline = sessionByline(session);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-night/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="relative max-h-[92svh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-white/12 bg-night-2 p-6 sm:rounded-2xl sm:p-8"
      >
        <button onClick={onClose} className="icon-btn absolute right-4 top-4" aria-label="Kapat">
          <X className="h-4 w-4" />
        </button>

        {status === 'success' && result ? (
          <div className="flex flex-col items-center py-4 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="text-emerald-300"
            >
              <CheckCircle2 className="h-16 w-16" strokeWidth={1.5} />
            </motion.div>
            <h3 className="mt-5 text-2xl font-extrabold uppercase text-fg">
              {result.already ? 'Yoklaman zaten alınmış' : 'Yoklaman alındı'}
            </h3>
            <p className="mt-2 text-sm text-fg-muted">
              {result.name && <>Teşekkürler {result.name}. </>}
              {day.day}. Gün · {session.label} için katılımın kaydedildi.
            </p>
            <p className="mt-6 flex w-full items-center gap-3 border-y border-white/10 py-4 text-left text-sm text-fg-muted">
              <Gift className="h-5 w-5 shrink-0 text-brand-soft" />
              Oturum sonundaki çekilişe otomatik olarak dahil oldun. Salondan ayrılma!
            </p>
            <button onClick={onClose} className="btn btn-primary mt-6 w-full">Tamam</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="pr-12">
              <p className="eyebrow">AI FEST'26</p>
              <h3 id="attendance-title" className="mt-1 text-2xl font-extrabold uppercase text-fg">Oturum Yoklaması</h3>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-fg">Oturum</span>
              <select className="input" value={sessionId} onChange={e => { setSessionId(e.target.value); setStatus('idle'); }}>
                {programDays.map(d => (
                  <optgroup key={d.day} label={`${d.day}. Gün · ${d.title} ${d.weekday}`}>
                    {d.items.flatMap(i => (i.kind === 'session' ? [i] : [])).map(s => (
                      <option key={s.id} value={s.id}>
                        {d.day}. Gün · {s.time.split(' – ')[0]} · {s.speaker ?? s.topic}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <span className="mt-1.5 block text-xs text-fg-subtle">
                {session.topic}{byline && ` — ${byline}`}
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-fg">TC Kimlik No / Okul No</span>
              <input
                className="input"
                inputMode="numeric"
                autoComplete="off"
                required
                placeholder="Kayıt olurken girdiğin numara"
                value={idNumber}
                onChange={e => setIdNumber(digitsOnly(e.target.value).slice(0, 11))}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-fg">Tel. son 4 hane</span>
                <input
                  className="input text-center font-display font-bold tracking-[0.3em]"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                  pattern="\d{4}"
                  maxLength={4}
                  placeholder="XXXX"
                  value={phoneLast4}
                  onChange={e => setPhoneLast4(digitsOnly(e.target.value).slice(0, 4))}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-fg">Oturum kodu</span>
                <input
                  className="input text-center font-display text-lg font-extrabold tracking-[0.3em]"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                  placeholder="••••"
                  value={code}
                  onChange={e => setCode(digitsOnly(e.target.value).slice(0, 6))}
                />
              </label>
            </div>
            <p className="-mt-1 text-xs text-fg-subtle">Oturum kodu salondaki ekranda gösteriliyor.</p>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-fg-muted">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="h-4 w-4 accent-brand-indigo"
              />
              Numaramı bu cihazda hatırla
            </label>

            {status === 'error' && <p role="alert" className="alert-error">{message}</p>}

            <button type="submit" disabled={status === 'loading'} className="btn btn-primary w-full !h-12">
              {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
              Yoklama Ver
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
