import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../App';

/**
 * Login / Signup screen for FlatFee.
 * Email is prefilled from the qualification step. We attempt a
 * Supabase magic-link sign-in when configured; in all cases the
 * client can proceed into their dashboard to complete their forms.
 */
export default function Login() {
  const navigate = useNavigate();
  const { contactEmail, setContactEmail } = useCase();
  const [email, setEmail] = useState(contactEmail);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const value = email.trim();
    try {
      setContactEmail(value);
      // Attempt a Supabase magic-link when the client is configured.
      const mod = await import('../lib/supabase').catch(() => null);
      if (mod?.supabase) {
        const { error } = await mod.supabase.auth.signInWithOtp({
          email: value,
          options: { emailRedirectTo: window.location.origin + '/dashboard' },
        });
        if (error) throw error;
        setSent(true);
      } else {
        // No auth backend configured yet \u2013 continue to the dashboard.
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to send login link.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md px-4">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">FlatFee</h1>
        <p className="mt-1 text-sm text-slate-600">
          Flat-fee, attorney-reviewed Missouri divorce filings.
        </p>

        {sent ? (
          <div className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
            Check your inbox &mdash; we sent a secure sign-in link to <strong>{email}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'Working...' : 'Continue'}            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-slate-400">
          By continuing you agree to receive a one-time sign-in link. No password required.
        </p>
      </div>
    </div>
  );
}
