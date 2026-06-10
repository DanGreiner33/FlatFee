import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const FLAT_FEE = 899;
const COURT_FILING_FEE = 163; // Missouri dissolution filing fee (approx., varies by county)

export default function Estimator() {
  const [hasChildren, setHasChildren] = useState(true);
  const [ownsProperty, setOwnsProperty] = useState(true);

  const total = useMemo(() => {
    let fee = FLAT_FEE;
    if (hasChildren) fee += 150; // parenting plan + Form 14
    if (ownsProperty) fee += 100; // property/debt statement
    return fee;
  }, [hasChildren, ownsProperty]);

  return (
    <Layout
      title="Estimate your cost"
      subtitle="FlatFee charges one transparent price. Court filing fees are paid separately to the court."
    >
      <div className="space-y-6">
        <fieldset className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasChildren}
              onChange={(e) => setHasChildren(e.target.checked)}
              className="h-4 w-4"
            />
            <span>We have minor children together</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={ownsProperty}
              onChange={(e) => setOwnsProperty(e.target.checked)}
              className="h-4 w-4"
            />
            <span>We own real estate or have shared debts</span>
          </label>
        </fieldset>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex justify-between text-sm">
            <span>FlatFee service</span>
            <span>${total}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-slate-500">
            <span>Court filing fee (paid to court)</span>
            <span>~${COURT_FILING_FEE}</span>
          </div>
          <div className="mt-3 border-t border-slate-200 pt-3 flex justify-between font-semibold">
            <span>Estimated total</span>
            <span>${total + COURT_FILING_FEE}</span>
          </div>
        </div>

        <Link
          to="/qualify"
          className="inline-block rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          See if I qualify
        </Link>
      </div>
    </Layout>
  );
}
