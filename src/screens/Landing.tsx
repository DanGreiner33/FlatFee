import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Landing() {
  return (
    <Layout
      title="Uncontested divorce in Missouri, done right."
      subtitle="A flat fee. Guided forms. Reviewed by a licensed Missouri attorney before anything is filed."
    >
      <div className="space-y-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold">1. Check eligibility</p>
            <p className="mt-1 text-sm text-slate-600">Answer a few questions to confirm your case qualifies.</p>
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold">2. Complete intake</p>
            <p className="mt-1 text-sm text-slate-600">We assemble your petition, parenting plan and Form 14.</p>
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold">3. Attorney review & file</p>
            <p className="mt-1 text-sm text-slate-600">An attorney reviews everything before you sign and file.</p>
          </li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/qualify"
            className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
          >
            Check if I qualify
          </Link>
          <Link
            to="/estimate"
            className="rounded-md border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
          >
            Estimate my cost
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          FlatFee is a document preparation and attorney-review service. Filing is completed only after
          a licensed Missouri attorney reviews your documents.
        </p>
      </div>
    </Layout>
  );
}
