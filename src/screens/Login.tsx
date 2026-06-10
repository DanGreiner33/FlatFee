import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Login / Signup screen for FlatFee.
 * Uses Supabase email magic-link auth. On success the parent App
 * picks up the session and routes the client into the intake flow.
 */
export default function Login({ onAuthed }: { onAuthed?: () => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      setSent(true);
      onAuthed?.();
    } catch (err: any) {
      setError(err?.message ?? 'Unable to send login link.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">FlatFee</h1>
        <p className="auth-sub">Flat-fee, attorney-reviewed Missouri divorce filings.</p>

        {sent ? (
          <div className="auth-sent">
            <p>Check your inbox &mdash; we sent a secure sign-in link to <strong>{email}</strong>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="email" className="auth-label">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="auth-input"
            />
            {error ? <p className="auth-error">{error}</p> : null}
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? 'Sending\u2026' : 'Continue with email'}
            </button>
          </form>
        )}

        <p className="auth-fineprint">
          By continuing you agree to receive a one-time sign-in link. No password required.
        </p>
      </div>
    </div>
  );
}
