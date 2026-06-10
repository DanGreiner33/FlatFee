import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useCase } from '../App';

/**
 * Client Dashboard. Shows the case status, the gating state
 * (qualification + attorney review) and links into each step of
 * the flat-fee divorce workflow. Styled with Tailwind to match
 * the rest of the app (uses the shared Layout shell).
 */
interface Step {
key: string;
label: string;
path: string;
done: boolean;
locked: boolean;
}

export default function Dashboard() {
const nav = useNavigate();
const { bundle, qualified, attorneyApproved } = useCase();
const pet = bundle.parties.find((p) => p.role === 'petitioner');

const steps: Step[] = [
{ key: 'qualify', label: 'Qualification', path: '/qualify', done: qualified, locked: false },
{ key: 'intake', label: 'Case Intake', path: '/intake', done: false, locked: !qualified },
{ key: 'upload', label: 'Document Upload', path: '/upload', done: false, locked: !qualified },
{ key: 'assembly', label: 'Document Assembly', path: '/assembly', done: false, locked: !qualified },
{ key: 'review', label: 'Attorney Review', path: '/review', done: attorneyApproved, locked: !qualified },
{ key: 'sign', label: 'Sign & Pay', path: '/sign-pay', done: false, locked: !attorneyApproved },
{ key: 'filed', label: 'Filed', path: '/filed', done: false, locked: !attorneyApproved },
];

return (
<Layout title="Your Divorce Case" subtitle={pet?.first_name ? `Welcome back, ${pet.first_name}.` : 'Welcome back.'}>
<div className="space-y-6">
<section className="flex flex-wrap gap-3">
<span className={qualified ? 'inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700' : 'inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600'}>
{qualified ? 'Qualified' : 'Not yet qualified'}
</span>
<span className={attorneyApproved ? 'inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700' : 'inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700'}>
{attorneyApproved ? 'Attorney approved' : 'Awaiting attorney review'}
</span>
</section>

<section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
<ul className="divide-y divide-slate-100">
{steps.map((s, i) => (
<li key={s.key} className="flex items-center justify-between gap-4 px-5 py-4">
<div className="flex items-center gap-3">
<span className={s.done ? 'flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700' : s.locked ? 'flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400' : 'flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700'}>
{i + 1}
</span>
<span className={s.locked ? 'font-medium text-slate-400' : 'font-medium text-slate-900'}>{s.label}</span>
</div>
{s.locked ? (
<span className="text-sm text-slate-400">Locked</span>
) : (
<button
onClick={() => nav(s.path)}
className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
>
{s.done ? 'Review' : 'Open'}
</button>
)}
</li>
))}
</ul>
</section>
</div>
</Layout>
);
}
