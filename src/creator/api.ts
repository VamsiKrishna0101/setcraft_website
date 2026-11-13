/** Backend base URL. Set VITE_API_URL in .env.local / the hosting provider (e.g. https://api.setcraft.fit). */
const API_URL = ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

const TOKEN_KEY = 'setcraft.creator.token';

export const session = {
  get(): string | null {
    try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
  },
  set(token: string) {
    try { sessionStorage.setItem(TOKEN_KEY, token); } catch { /* private mode: stay signed in for this page only */ }
  },
  clear() {
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
  },
};

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init.headers },
    });
  } catch {
    throw new ApiError('Could not reach Setcraft. Check your connection and try again.', 0);
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = response.status === 429
      ? 'Too many attempts. Please wait a few minutes and try again.'
      : (body as { error?: string }).error || 'Something went wrong. Please try again.';
    throw new ApiError(message, response.status);
  }
  return body as T;
}

export interface Totals { gross: number; tax: number; storeFee: number; net: number; earned: number; pending: number; payable: number; paid: number }
export interface Dashboard {
  creator: { name: string; email: string; revenueSharePct: number };
  holdDays: number;
  codes: { code: string; discountPercent: number; isActive: boolean; signups: number; paying: number }[];
  counts: { signups: number; paying: number; codeEnteredOnly: number; refunded: number };
  totals: Record<string, Totals>;
  monthly: { month: string; currency: string; payments: number; gross: number; net: number; earned: number }[];
  signups: { code: string; signedUpAt: string; status: 'Paying' | 'Code entered' | 'Refunded'; plan: string | null; payments: number; lastPaymentAt: string | null; earned: number; currency: string | null }[];
}

export const login = (email: string, password: string) =>
  request<{ token: string; creator: { name: string; email: string } }>('/api/creator/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  });

export const fetchDashboard = (token: string) =>
  request<{ data: Dashboard }>('/api/creator/me/dashboard', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
