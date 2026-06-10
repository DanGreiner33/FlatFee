import { useApp } from "../App";

export default function Filed() {
  const { state, reset } = useApp();
  const ref = state.filingRef || "FF-MO-PENDING";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Your filing package is ready
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          A licensed Missouri attorney has reviewed and approved your uncontested
          dissolution documents. Your packet has been queued for filing with the
          appropriate circuit court.
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-left">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Reference number</dt>
              <dd className="font-medium text-slate-900">{ref}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">County</dt>
              <dd className="font-medium text-slate-900">{state.county || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Status</dt>
              <dd className="font-medium text-emerald-700">Submitted for filing</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>We e-file your petition and pay the court filing fee on your behalf.</li>
          <li>You will receive a case number from the court within 1–3 business days.</li>
          <li>Your spouse is served or signs an entry of appearance / waiver.</li>
          <li>After the statutory waiting period, the court enters your judgment of dissolution.</li>
        </ol>
        <p className="mt-4 text-xs text-slate-500">
          FlatFee provides self-help document preparation reviewed by a licensed
          attorney. This is not a substitute for full legal representation.
        </p>
      </div>

      <button
        onClick={reset}
        className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Start a new matter
      </button>
    </div>
  );
}
