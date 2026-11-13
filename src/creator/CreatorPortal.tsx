import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, LogOut, RefreshCw } from 'lucide-react';
import { ApiError, fetchDashboard, login, session, type Dashboard, type Totals } from './api';
import '../styles/creator.css';

const money = (amount: number, currency: string) => {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount); }
  catch { return `${amount.toFixed(2)} ${currency}`; }
};
const date = (iso: string | null) => iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const monthName = (ym: string) => new Date(`${ym}-01T00:00:00Z`).toLocaleDateString(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' });

export function CreatorPortal() {
  const [token, setToken] = useState<string | null>(() => session.get());
  const signOut = useCallback(() => { session.clear(); setToken(null); }, []);
  useEffect(() => { document.title = 'Creator portal — Setcraft'; }, []);
  return <div className="cp">
    <header className="cp__top wrap">
      <a className="brand" href="/" aria-label="Setcraft home">
        <img src="/assets/setcraft-logo.png" alt="" width="32" height="32" />
        <span>Setcraft <span className="cp__tag">Creators</span></span>
      </a>
      {token
        ? <button className="btn btn--ghost btn--sm" onClick={signOut}><LogOut size={16} /> Sign out</button>
        : <a className="btn btn--ghost btn--sm" href="/"><ArrowLeft size={16} /> Back to site</a>}
    </header>
    <main className="wrap cp__main">
      {token ? <DashboardView token={token} onExpired={signOut} /> : <Login onSignedIn={t => { session.set(t); setToken(t); }} />}
    </main>
  </div>;
}

function Login({ onSignedIn }: { onSignedIn: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true); setError(null);
    try { onSignedIn((await login(email, password)).token); }
    catch (e) { setError(e instanceof Error ? e.message : 'Sign-in failed.'); }
    finally { setBusy(false); }
  };
  return <section className="cp-login">
    <p className="label label--bare">Creator partners</p>
    <h1 className="display cp-login__title">Your code, <em>your numbers.</em></h1>
    <p className="lede">Sign in with the email and password Setcraft gave you to see who joined with your code and what you’ve earned.</p>
    <form className="cp-card cp-form" onSubmit={submit} noValidate>
      <label>Email<input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
      {error && <p className="cp-error" role="alert">{error}</p>}
      <button className="btn btn--solid" type="submit" disabled={busy || !email || !password}>{busy ? 'Signing in…' : 'Sign in'}</button>
      <p className="cp-note">Don’t have an account? Partner accounts are created by Setcraft. Contact your partner manager.</p>
    </form>
  </section>;
}

function DashboardView({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setData(await fetchDashboard(token)); }
    catch (e) {
      if (e instanceof ApiError && e.status === 401) { onExpired(); return; }
      setError(e instanceof Error ? e.message : 'Could not load your dashboard.');
    } finally { setLoading(false); }
  }, [token, onExpired]);
  useEffect(() => { void load(); }, [load]);

  if (!data) {
    return <section className="cp-state">
      {error ? <><p className="cp-error" role="alert">{error}</p><button className="btn btn--ghost btn--sm" onClick={load}><RefreshCw size={16} /> Try again</button></>
        : <p className="cp-note">Loading your dashboard…</p>}
    </section>;
  }

  const currencies = Object.keys(data.totals);
  return <section className="cp-dash" aria-busy={loading}>
    <div className="cp-dash__head">
      <div>
        <p className="label label--bare">Creator dashboard</p>
        <h1 className="display cp-dash__title">Hi, {data.creator.name}</h1>
      </div>
      <button className="btn btn--ghost btn--sm" onClick={load} disabled={loading}><RefreshCw size={16} /> {loading ? 'Refreshing…' : 'Refresh'}</button>
    </div>
    {error && <p className="cp-error" role="alert">{error}</p>}

    <div className="cp-codes">
      {data.codes.map(c => <div key={c.code} className="cp-code">
        <span className="cp-code__code">{c.code}</span>
        <span>{c.discountPercent}% off{!c.isActive && ' · inactive'}</span>
        <span>{c.signups} signups · {c.paying} paying</span>
      </div>)}
    </div>

    <div className="cp-stats">
      <Stat label="Signed up with your code" value={String(data.counts.signups)} />
      <Stat label="Paying members" value={String(data.counts.paying)} />
      <Stat label="Entered code, not paid yet" value={String(data.counts.codeEnteredOnly)} />
      <Stat label="Refunded" value={String(data.counts.refunded)} />
    </div>

    {currencies.length === 0
      ? <div className="cp-card"><p className="cp-note">No payments yet. Earnings appear here as soon as someone who used your code pays for a membership.</p></div>
      : currencies.map(cur => <Earnings key={cur} currency={cur} t={data.totals[cur]} share={data.creator.revenueSharePct} holdDays={data.holdDays} />)}

    {data.monthly.length > 0 && <div className="cp-card">
      <h2 className="cp-h2">By month</h2>
      <div className="cp-table-wrap"><table className="cp-table">
        <thead><tr><th>Month</th><th>Payments</th><th>Customers paid</th><th>After store fees & tax</th><th>Your earnings</th></tr></thead>
        <tbody>{data.monthly.map(m => <tr key={`${m.month}-${m.currency}`}>
          <td>{monthName(m.month)}</td><td>{m.payments}</td><td>{money(m.gross, m.currency)}</td><td>{money(m.net, m.currency)}</td><td><strong>{money(m.earned, m.currency)}</strong></td>
        </tr>)}</tbody>
      </table></div>
    </div>}

    <div className="cp-card">
      <h2 className="cp-h2">Signups</h2>
      <p className="cp-note">For privacy, members are shown without names or emails.</p>
      {data.signups.length === 0 ? <p className="cp-note">Nobody has used your code yet.</p> :
        <div className="cp-table-wrap"><table className="cp-table">
          <thead><tr><th>Joined</th><th>Code</th><th>Status</th><th>Plan</th><th>Payments</th><th>Last payment</th><th>You earned</th></tr></thead>
          <tbody>{data.signups.map((s, i) => <tr key={i}>
            <td>{date(s.signedUpAt)}</td><td>{s.code}</td>
            <td><span className={`cp-pill cp-pill--${s.status === 'Paying' ? 'ok' : s.status === 'Refunded' ? 'bad' : 'wait'}`}>{s.status}</span></td>
            <td>{s.plan ?? '—'}</td><td>{s.payments}</td><td>{date(s.lastPaymentAt)}</td>
            <td>{s.currency ? money(s.earned, s.currency) : '—'}</td>
          </tr>)}</tbody>
        </table></div>}
    </div>
  </section>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="cp-stat"><span className="cp-stat__value">{value}</span><span className="cp-stat__label">{label}</span></div>;
}

function Earnings({ currency, t, share, holdDays }: { currency: string; t: Totals; share: number; holdDays: number }) {
  const m = (n: number) => money(n, currency);
  return <div className="cp-earn">
    <div className="cp-card cp-earn__calc">
      <h2 className="cp-h2">How your earnings are calculated</h2>
      <dl className="cp-calc">
        <div><dt>Customers paid</dt><dd>{m(t.gross)}</dd></div>
        <div><dt>− VAT / sales tax</dt><dd>{m(-t.tax)}</dd></div>
        <div><dt>− App Store / Google Play fee</dt><dd>{m(-t.storeFee)}</dd></div>
        <div className="cp-calc__sub"><dt>= Net revenue</dt><dd>{m(t.net)}</dd></div>
        <div><dt>× Your share</dt><dd>{share}%</dd></div>
        <div className="cp-calc__total"><dt>= Your earnings</dt><dd>{m(t.earned)}</dd></div>
      </dl>
      <p className="cp-note">Refunds are subtracted automatically.</p>
    </div>
    <div className="cp-earn__buckets">
      <Bucket label="Pending" value={m(t.pending)} hint={`Held ${holdDays} days in case of refunds`} />
      <Bucket label="Ready to pay out" value={m(t.payable)} hint="Included in your next payout" accent />
      <Bucket label="Paid to you" value={m(t.paid)} hint="Already sent" />
    </div>
  </div>;
}

function Bucket({ label, value, hint, accent }: { label: string; value: string; hint: string; accent?: boolean }) {
  return <div className={`cp-card cp-bucket${accent ? ' cp-bucket--accent' : ''}`}>
    <span className="cp-stat__label">{label}</span><span className="cp-bucket__value">{value}</span><span className="cp-note">{hint}</span>
  </div>;
}
