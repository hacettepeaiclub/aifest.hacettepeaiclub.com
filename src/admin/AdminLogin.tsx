import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { ApiError, login } from '../lib/api';
import logo from '../assets/aifest_logo.png';

/** Ana sitenin (hacettepeaiclub.com) admin hesabıyla giriş. /cekilis/ ve /yonetim/ paylaşır. */
export default function AdminLogin({ title, onSuccess }: { title: string; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email.trim(), password);
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiError && err.status === 401 ? 'E-posta veya şifre hatalı.' : (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <form onSubmit={submit} className="glass w-full max-w-sm !rounded-[1.75rem] p-8">
        <img src={logo} alt="" className="mx-auto h-20 w-auto drop-shadow-[0_12px_40px_rgba(79,70,229,0.5)]" />
        <h1 className="mt-5 text-center text-2xl font-bold text-fg">{title}</h1>
        <p className="mt-1 text-center text-sm text-fg-muted">hacettepeaiclub.com yönetici hesabınla giriş yap.</p>

        <div className="mt-7 space-y-3">
          <input
            type="email"
            autoComplete="username"
            autoFocus
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-posta"
            className="input !h-12"
          />
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Şifre"
            className="input !h-12"
          />
        </div>

        {error && <p role="alert" className="alert-error mt-3">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary mt-5 w-full !h-12">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
