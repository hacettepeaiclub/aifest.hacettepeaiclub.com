import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Check, Gift, Loader2, LogOut, Maximize, Minimize, RefreshCw, Trophy, Users, UserX } from 'lucide-react';
import { allSessions, currentSessionId, programDays, sessionByline, type ProgramSession } from '../data/program';
import { ApiError, getToken, setToken } from '../lib/api';
import { fetchRafflePool, recordWinner, type RaffleAttendee, type RaffleWinner } from '../lib/fest-admin';
import AdminLogin from '../admin/AdminLogin';
import Confetti from './Confetti';
import logo from '../assets/aifest_logo.png';

/* ───────────────────────── helpers ───────────────────────── */

/** Unbiased crypto-random index. */
function randomIndex(n: number) {
  const max = Math.floor(0xffffffff / n) * n;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf);
  while (buf[0] >= max);
  return buf[0] % n;
}

const maskTail = (tail: string) => '•••• ' + tail;

/* ───────────────────────── page ───────────────────────── */

export default function RafflePage() {
  const [loggedIn, setLoggedIn] = useState(() => !!getToken());
  const logout = useCallback(() => { setToken(null); setLoggedIn(false); }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-indigo/25 blur-[160px]" />

        {loggedIn ? (
          <RaffleStage onLogout={logout} />
        ) : (
          <AdminLogin title="Çekiliş Paneli" onSuccess={() => setLoggedIn(true)} />
        )}
      </div>
    </MotionConfig>
  );
}

/* ───────────────────────── stage ───────────────────────── */

type Phase = 'idle' | 'rolling' | 'revealed' | 'confirmed';

function RaffleStage({ onLogout }: { onLogout: () => void }) {
  const [sessionId, setSessionId] = useState(() => currentSessionId());
  const [attendees, setAttendees] = useState<RaffleAttendee[]>([]);
  const [winners, setWinners] = useState<RaffleWinner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [excludePrevious, setExcludePrevious] = useState(true);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());

  const [phase, setPhase] = useState<Phase>('idle');
  const [display, setDisplay] = useState<RaffleAttendee | null>(null);
  const [winner, setWinner] = useState<RaffleAttendee | null>(null);
  const [saving, setSaving] = useState(false);
  const [burst, setBurst] = useState(0);
  const [redrawPending, setRedrawPending] = useState(false);
  const timers = useRef<number[]>([]);

  const current = allSessions.find(s => s.session.id === sessionId)!;

  const lastRequest = useRef(0);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    const requestId = ++lastRequest.current;
    try {
      const res = await fetchRafflePool(sessionId);
      // Oturum değiştiyse ya da daha yeni bir istek varsa eski yanıtı yok say.
      if (requestId !== lastRequest.current) return;
      setError('');
      setAttendees(res.attendees);
      setWinners(res.winners);
    } catch (err) {
      if (requestId !== lastRequest.current) return;
      if (err instanceof ApiError && err.status === 401) onLogout();
      setError((err as Error).message);
    } finally {
      if (requestId === lastRequest.current) setLoading(false);
    }
  }, [sessionId, onLogout]);

  // Session change → reset and load; refresh quietly every 20s while idle.
  useEffect(() => {
    setPhase('idle');
    setWinner(null);
    setDisplay(null);
    setSkipped(new Set());
    load();
  }, [load]);

  useEffect(() => {
    if (phase !== 'idle') return;
    const id = window.setInterval(() => load(true), 20_000);
    return () => clearInterval(id);
  }, [phase, load]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const sessionWinners = winners.filter(w => w.session_id === sessionId);
  const excludedIds = useMemo(() => {
    const ids = new Set(skipped);
    (excludePrevious ? winners : sessionWinners).forEach(w => ids.add(w.participant_id));
    return ids;
  }, [skipped, excludePrevious, winners, sessionWinners]);
  const pool = attendees.filter(a => !excludedIds.has(a.participant_id));

  const draw = useCallback(() => {
    if (pool.length === 0 || phase === 'rolling') return;
    const picked = pool[randomIndex(pool.length)];
    setWinner(picked);
    setPhase('rolling');

    // Slot-machine roll: fast at first, easing out over ~5s, landing on the picked name.
    timers.current.forEach(clearTimeout);
    timers.current = [];
    let delay = 45;
    let elapsed = 0;
    while (delay < 420) {
      elapsed += delay;
      timers.current.push(window.setTimeout(() => setDisplay(pool[randomIndex(pool.length)]), elapsed));
      delay *= 1.1;
    }
    timers.current.push(window.setTimeout(() => {
      setDisplay(picked);
      setPhase('revealed');
      setBurst(b => b + 1);
    }, elapsed + 450));
  }, [pool, phase]);

  const confirmWinner = async () => {
    if (!winner) return;
    setSaving(true);
    try {
      const res = await recordWinner(sessionId, winner.participant_id);
      setWinners(w => [...w, { ...winner, id: res.id, session_id: sessionId, created_at: new Date().toISOString() }]);
      setError('');
      setPhase('confirmed');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) onLogout();
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const skipWinner = () => {
    if (!winner) return;
    setSkipped(s => new Set(s).add(winner.participant_id));
    setPhase('idle');
    setDisplay(null);
    setRedrawPending(true);
  };

  // "Yeniden çek": draw again once the pool has been recomputed without the skipped person.
  useEffect(() => {
    if (!redrawPending || phase !== 'idle') return;
    setRedrawPending(false);
    draw();
  }, [redrawPending, phase, draw]);

  const reset = () => { setPhase('idle'); setDisplay(null); setWinner(null); };

  // Keyboard: Space/Enter = draw, F = fullscreen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('select, input, button')) return;
      if ((e.key === ' ' || e.key === 'Enter') && (phase === 'idle' || phase === 'confirmed')) { e.preventDefault(); draw(); }
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, draw]);

  const busy = phase === 'rolling' || phase === 'revealed';

  return (
    <div className="relative flex min-h-screen flex-col">
      {burst > 0 && (phase === 'revealed' || phase === 'confirmed') && <Confetti key={burst} />}

      {/* Top bar — fades while drawing so the stage stays clean */}
      <header className={`relative z-10 flex flex-wrap items-center gap-3 px-6 py-4 transition-opacity duration-500 lg:px-10 ${busy ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <div className="mr-auto flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-bold">AI FEST'26 · Çekiliş</span>
        </div>

        <select
          value={sessionId}
          onChange={e => setSessionId(e.target.value)}
          className="h-10 max-w-full rounded-full border border-white/15 bg-white/10 px-4 text-sm font-medium text-white focus:border-brand-soft focus:outline-none [&_option]:bg-night-3 [&_optgroup]:bg-night-3"
          aria-label="Oturum seç"
        >
          {programDays.map(day => (
            <optgroup key={day.day} label={`${day.day}. Gün · ${day.title} ${day.weekday}`}>
              {day.items.filter((i): i is ProgramSession => i.kind === 'session').map(s => (
                <option key={s.id} value={s.id}>{day.day}. Gün · {s.label} · {s.time.split(' – ')[0]} · {s.speaker ?? s.org ?? s.topic}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <label className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80">
          <input type="checkbox" checked={excludePrevious} onChange={e => setExcludePrevious(e.target.checked)} className="h-4 w-4 accent-brand-violet" />
          Önceki kazananlar hariç
        </label>

        <IconButton label="Listeyi yenile" onClick={() => load()}><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /></IconButton>
        <FullscreenButton />
        <IconButton label="Çıkış" onClick={onLogout}><LogOut className="h-4 w-4" /></IconButton>
      </header>

      {/* Stage */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <p className="eyebrow">{current.day.day}. Gün · {current.session.label} · {current.session.time}</p>
        <h1 className="mt-4 max-w-5xl text-3xl font-bold text-white sm:text-5xl">{current.session.topic}</h1>
        {sessionByline(current.session) && <p className="mt-3 text-lg text-fg-muted sm:text-xl">{sessionByline(current.session)}</p>}

        <div className="mt-12 flex min-h-[16rem] w-full max-w-6xl flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 'idle' ? (
              <motion.div key="idle" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="flex flex-col items-center">
                <div className="flex items-center gap-3 text-white/70">
                  <Users className="h-7 w-7" />
                  <span className="font-display text-7xl font-bold tabular-nums text-white sm:text-8xl">{loading ? '…' : pool.length}</span>
                </div>
                <p className="mt-2 text-lg text-white/60">
                  çekilişe katılan
                  {attendees.length !== pool.length && <span className="text-white/40"> (yoklama: {attendees.length})</span>}
                </p>
                <button
                  onClick={draw}
                  disabled={pool.length === 0 || loading}
                  className="btn btn-primary mt-10 !h-16 !px-10 !text-xl disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Gift className="h-6 w-6" />
                  Çekilişi Başlat
                </button>
                <p className="mt-4 text-xs text-white/40">Boşluk tuşu: çekiliş · F: tam ekran</p>
              </motion.div>
            ) : (
              <motion.div key="draw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-full flex-col items-center">
                <AnimatePresence>
                  {phase !== 'rolling' && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex items-center gap-2 font-display text-2xl font-bold uppercase tracking-[0.2em] text-brand-soft">
                      <Trophy className="h-7 w-7" /> Kazanan
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.p
                  key={phase === 'rolling' ? 'roll' : 'win'}
                  initial={phase === 'rolling' ? false : { scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 160 }}
                  className={`font-display font-bold leading-none tracking-tight ${phase === 'rolling' ? 'text-white/80' : 'text-gradient'} text-5xl sm:text-7xl lg:text-8xl`}
                >
                  {display?.full_name ?? '…'}
                </motion.p>
                {display && (
                  <p className={`mt-4 font-display text-xl tabular-nums tracking-widest ${phase === 'rolling' ? 'text-white/30' : 'text-white/60'}`}>
                    {maskTail(display.id_tail)}
                  </p>
                )}

                {phase === 'revealed' && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 flex flex-wrap justify-center gap-3">
                    <button onClick={confirmWinner} disabled={saving} className="btn btn-primary !h-14 !px-8 !text-lg">
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
                      Kazananı Onayla
                    </button>
                    <button onClick={skipWinner} className="btn btn-ghost !h-14 !px-8 !text-lg">
                      <UserX className="h-5 w-5" />
                      Salonda Değil · Yeniden Çek
                    </button>
                  </motion.div>
                )}

                {phase === 'confirmed' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex flex-wrap justify-center gap-3">
                    <span className="inline-flex h-14 items-center gap-2 rounded-full bg-emerald-400/15 px-6 text-emerald-200">
                      <Check className="h-5 w-5" /> Kaydedildi
                    </span>
                    <button onClick={reset} className="btn btn-ghost !h-14 !px-8 !text-lg">
                      <Gift className="h-5 w-5" /> Yeni Çekiliş
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && <p role="alert" className="mt-8 rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-200">{error}</p>}
      </main>

      {/* Winners of this session */}
      {sessionWinners.length > 0 && (
        <footer className={`relative z-10 border-t border-white/10 px-6 py-4 transition-opacity duration-500 lg:px-10 ${phase === 'rolling' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-2 inline-flex items-center gap-1.5 font-semibold text-white/70"><Trophy className="h-4 w-4 text-brand-soft" /> Bu oturumun kazananları:</span>
            {sessionWinners.map((w, i) => (
              <span key={`${w.id}-${i}`} className="rounded-full bg-white/10 px-3 py-1 text-white/85">{w.full_name}</span>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
}

/* ───────────────────────── small bits ───────────────────────── */

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
    >
      {children}
    </button>
  );
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen?.();
}

function FullscreenButton() {
  const [full, setFull] = useState(!!document.fullscreenElement);
  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  return (
    <IconButton label={full ? 'Tam ekrandan çık' : 'Tam ekran'} onClick={toggleFullscreen}>
      {full ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
    </IconButton>
  );
}
