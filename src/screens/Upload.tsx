import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

interface RequiredDoc {
  key: string;
  label: string;
  hint: string;
}

const REQUIRED_DOCS: RequiredDoc[] = [
  { key: 'id', label: 'Government-issued photo ID', hint: 'Driver license or passport for the petitioner.' },
  { key: 'marriage_cert', label: 'Marriage certificate', hint: 'Used to confirm marriage date and place.' },
  { key: 'income', label: 'Proof of income (most recent)', hint: 'Pay stub or recent statement — supports Form 14.' },
  { key: 'property', label: 'Property / debt statements (optional)', hint: 'Mortgage, titles, or account statements.' },
];

export default function Upload() {
  const [uploaded, setUploaded] = useState<Record<string, string>>({});

  function handleFile(key: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    // Demo only: we record the filename, no file is transmitted anywhere.
    setUploaded((prev) => ({ ...prev, [key]: files[0].name }));
  }

  const requiredKeys = REQUIRED_DOCS.filter((d) => !d.label.includes('optional')).map((d) => d.key);
  const allRequiredUploaded = requiredKeys.every((k) => uploaded[k]);

  return (
    <Layout
      title="Upload your documents"
      subtitle="These help the attorney verify your case. Files stay in your browser in this demo."
      currentPath="/upload"
      footer={
        <Link
          to="/assembly"
          className={
            'rounded-md px-5 py-2.5 font-medium text-white ' +
            (allRequiredUploaded ? 'bg-indigo-600 hover:bg-indigo-700' : 'pointer-events-none bg-slate-300')
          }
        >
          Assemble documents
        </Link>
      }
    >
      <div className="space-y-4">
        {REQUIRED_DOCS.map((doc) => (
          <div key={doc.key} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{doc.label}</p>
                <p className="text-sm text-slate-500">{doc.hint}</p>
              </div>
              {uploaded[doc.key] ? (
                <span className="text-sm font-medium text-emerald-700">✓ {uploaded[doc.key]}</span>
              ) : (
                <label className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
                  Choose file
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFile(doc.key, e.target.files)}
                  />
                </label>
              )}
            </div>
          </div>
        ))}
        {!allRequiredUploaded && (
          <p className="text-sm text-slate-500">Upload the required documents to continue.</p>
        )}
      </div>
    </Layout>
  );
}
