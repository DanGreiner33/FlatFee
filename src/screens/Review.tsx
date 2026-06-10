import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useCase } from '../App';

// Gate 2: an attorney must review and approve before the case can be filed.
// In production this status is set by the reviewing attorney's account, not the client.
export default function Review() {
  const navigate = useNavigate();
  const { bundle, attorneyApproved, setAttorneyApproved } = useCase();
  const [submitted, setSubmitted] = useState(attorneyApproved);

  function submitForReview() {
    setSubmitted(true);
    // Demo: simulate the attorney completing their review shortly after submission.
    setTimeout(() => setAttorneyApproved(true), 1500);
  }

  return (
    <Layout
      title="Attorney review"
      subtitle="A licensed Missouri attorney reviews your documents before anything can be signed or filed."
      currentPath="/review"
      footer={
        attorneyApproved ? (
          <button
            onClick={() => navigate('/sign-pay')}
            className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
          >
            Continue to sign & pay
          </button>
        ) : (
          <button
            onClick={submitForReview}
            disabled={submitted}
            className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white disabled:bg-slate-300"
          >
            {submitted ? 'Submitted for review' : 'Submit for attorney review'}
          </button>
        )
      }
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="font-semibold">Documents in this packet</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {bundle.documents.map((d) => (
              <li key={d.id} className="flex justify-between">
                <span>{d.title}</span>
                <span className="text-slate-400">{d.kind}</span>
              </li>
            ))}
          </ul>
        </div>

        {!submitted && (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">
            When you submit, the attorney is notified to review your petition, parenting plan, and
            Form 14 calculation. You cannot proceed to filing until that review is complete.
          </div>
        )}

        {submitted && !attorneyApproved && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            Submitted. Awaiting attorney review… (Filing stays locked until the attorney approves.)
          </div>
        )}

        {attorneyApproved && (
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
            Attorney review complete. Your documents are approved and you may proceed to sign and pay.
          </div>
        )}
      </div>
    </Layout>
  );
}
