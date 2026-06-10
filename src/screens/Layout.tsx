import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  { path: '/qualify', label: 'Qualify' },
  { path: '/intake', label: 'Intake' },
  { path: '/upload', label: 'Documents' },
  { path: '/assembly', label: 'Assembly' },
  { path: '/review', label: 'Attorney Review' },
  { path: '/sign-pay', label: 'Sign & Pay' },
  { path: '/filed', label: 'Filed' },
];

interface LayoutProps {
  title: string;
  subtitle?: string;
  currentPath?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Layout({ title, subtitle, currentPath, children, footer }: LayoutProps) {
  const activeIndex = STEPS.findIndex((s) => s.path === currentPath);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-indigo-600">
            FlatFee
          </Link>
          <span className="text-sm text-slate-500">Missouri Uncontested Divorce</span>
        </div>
      </header>

      {activeIndex >= 0 && (
        <nav className="border-b border-slate-200 bg-white">
          <ol className="mx-auto flex max-w-5xl flex-wrap gap-x-4 gap-y-1 px-6 py-3 text-xs">
            {STEPS.map((step, i) => (
              <li
                key={step.path}
                className={
                  i === activeIndex
                    ? 'font-semibold text-indigo-600'
                    : i < activeIndex
                    ? 'text-slate-400'
                    : 'text-slate-300'
                }
              >
                {i + 1}. {step.label}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </main>

      {footer && (
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl justify-end gap-3 px-6 py-4">{footer}</div>
        </footer>
      )}
    </div>
  );
}
