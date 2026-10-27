/*
 * Hacettepe AI Club API istemcisi (ana sitenin FastAPI backend'i, routers/aifest.py).
 * Farklı bir sunucuya bağlanmak için .env içinde VITE_API_URL verilebilir.
 */

export const API_URL: string = (import.meta.env.VITE_API_URL || 'https://api.hacettepeaiclub.com').replace(/\/$/, '');

const TOKEN_KEY = 'aifest26-admin-token';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* storage unavailable */ }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
}

/** Fetch wrapper. Backend errors come back as `{ message }` (main.py exception handler). */
export async function request(path: string, { method = 'GET', body, auth = false }: RequestOptions = {}): Promise<Response> {
  const headers: Record<string, string> = {};
  let payload: BodyInit | undefined;

  if (body instanceof FormData || body instanceof URLSearchParams) {
    payload = body;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new ApiError('Sunucuya ulaşılamadı. İnternet bağlantını kontrol edip tekrar dene.', 0);
  }

  if (!res.ok) {
    if (res.status === 401 && auth) setToken(null);
    let message = 'Beklenmeyen bir hata oluştu, lütfen tekrar dene.';
    try {
      const data = await res.json();
      const detail = data?.message ?? data?.detail;
      if (typeof detail === 'string') message = detail;
      else if (res.status === 422) message = 'Girilen bilgiler geçersiz.';
    } catch { /* not JSON */ }
    if (res.status === 429 && !message.includes('deneme')) message = 'Çok fazla istek gönderildi. Biraz bekleyip tekrar dene.';
    throw new ApiError(message, res.status);
  }
  return res;
}

export async function requestJson<T>(path: string, options?: RequestOptions): Promise<T> {
  return (await request(path, options)).json() as Promise<T>;
}

/** Ana sitenin admin hesabıyla giriş (POST /auth/login). */
export async function login(email: string, password: string) {
  const form = new URLSearchParams({ username: email, password });
  const data = await requestJson<{ access_token: string }>('/auth/login', { method: 'POST', body: form });
  setToken(data.access_token);
}
