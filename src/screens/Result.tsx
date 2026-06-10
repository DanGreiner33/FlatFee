import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useCase } from '../App';

/**
 * Eligibility result. The user has cleared the qualification gate.
 * Before entering the document workflow we capture their email so
 * they can log in and resume, and so the attorney can reach them.
 */
export default function Result() {
  const navigate = useNavigate();
  const { setQualified, contactEmail, setContactEmail } = useCase();
  const [email, setEmail] = useState(contactEmail);
  const [error, setError] = useState<string | null>(null);

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    setContactEmail(value);
    setQualified(true);
    navigate('/login');
  }

  return (
    <Layout
      title="You're eligible to continue"
      subtitle="Your answers indicate an uncontested Missouri dissolution that fits the flat-fee flow."
      currentPath="/qualify"
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
          Great news! Based on your responses, you qualify for FlatFee's guided uncontested
          divorce service for Missouri.
        </div>

        <form onSubmit={handleContinue} className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="font-semibold">Create your account to continue</p>
          <p className="mt-1 text-sm text-slate-600">
            Enter your email. We'll send you a secure sign-in link so you can complete your
            forms and the attorney can reach you about your case.
          </p>
          <label htmlFor="email" className="mt-4 block text-sm font-medium text-slate-700">
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
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="mt-4 rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="font-semibold">What happens next</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Log in with the secure link we email you.</li>
            <li>Complete guided forms about you, your spouse, children, assets and debts.</li>
            <li>We automatically assemble your court documents from your answers.</li>
            <li>A licensed Missouri attorney reviews everything.</li>
            <li>You sign, pay, and we help you file.</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
