import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const FLAT_FEE = 899;
const COURT_FILING_FEE = 163;

// NOTE: This is a demo. No real payment is collected and no card data is handled here.
// A production build would mount a PCI-compliant payment element (e.g. Stripe) instead.
export default function SignPay() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');

  const canSubmit = agreed && signature.trim().length > 1;

  return (
    <Layout
      title="Sign & pay"
      subtitle="Review the agreement, sign, and submit your flat fee to complete the engagement."
      currentPath="/sign-pay"
      footer={
        <button
          onClick={() => navigate('/filed')}
          disabled={!canSubmit}
          className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white disabled:bg-slate-300"
        >
          Sign & submit payment
        </button>
      }
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex justify-between text-sm">
            <span>FlatFee service</span>
            <span>${FLAT_FEE}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-slate-500">
            <span>Court filing fee</span>
            <span>~${COURT_FILING_FEE}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-semibold">
            <span>Total due today</span>
            <span>${FLAT_FEE + COURT_FILING_FEE}</span>
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4"
          />
          <span>
            I have reviewed the attorney-approved documents and authorize FlatFee to assist with filing
            my uncontested dissolution in Missouri.
          </span>
        </label>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <label className="block text-sm font-medium">Type your full legal name to sign</label>
          <input
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Full legal name"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <p className="text-xs text-slate-500">
          Payment is simulated in this demo — no card information is collected or transmitted.
        </p>
      </div>
    </Layout>
  );
}
