import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { useCase } from '../App';
import type { DocumentStatus } from '../types';

export default function Assembly() {
  const { bundle } = useCase();
  const docs = bundle.documents;

  // Simulate document generation progressing to 'generated'.
  const [statuses, setStatuses] = useState<Record<string, DocumentStatus>>(
    () => Object.fromEntries(docs.map((d) => [d.id, 'pending' as DocumentStatus]))
  );

  useEffect(() => {
    const timers = docs.map((d, i) =>
      setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [d.id]: 'generated' }));
      }, 500 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [docs]);

  const allGenerated = docs.every((d) => statuses[d.id] === 'generated');

  return (
    <Layout
      title="Assembling your documents"
      subtitle="We generate Missouri court documents from your intake. Nothing is filed yet."
      currentPath="/assembly"
      footer={
        <Link
          to="/review"
          className={
            'rounded-md px-5 py-2.5 font-medium text-white ' +
            (allGenerated ? 'bg-indigo-600 hover:bg-indigo-700' : 'pointer-events-none bg-slate-300')
          }
        >
          Send for attorney review
        </Link>
      }
    >
      <ul className="space-y-3">
        {docs.map((d) => {
          const status = statuses[d.id];
          return (
            <li
              key={d.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
            >
              <span className="font-medium">{d.title}</span>
              {status === 'generated' ? (
                <span className="text-sm font-medium text-emerald-700">✓ Generated</span>
              ) : (
                <span className="text-sm text-slate-400">Generating…</span>
              )}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
