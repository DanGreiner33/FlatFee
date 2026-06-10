import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Result() {
  return (
    <Layout
      title="You're eligible to continue"
      subtitle="Your answers indicate an uncontested Missouri dissolution that fits the flat-fee flow."
      currentPath="/qualify"
      footer={
        <Link
          to="/intake"
          className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Start intake
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
          Great news — based on your responses, you qualify for FlatFee's guided uncontested divorce
          service for Missouri.
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="font-semibold">What happens next</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Complete a guided intake about you, your spouse, children, assets and debts.</li>
            <li>Upload any supporting documents.</li>
            <li>We assemble your court documents automatically.</li>
            <li>A licensed Missouri attorney reviews everything.</li>
            <li>You sign, pay, and we help you file.</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
