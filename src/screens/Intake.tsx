import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import Layout from './Layout';
import { useCase } from '../App';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-slate-700">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export default function Intake() {
  const { bundle } = useCase();
  const { parties, children, assets, debts, support } = bundle;
  const petitioner = parties.find((p) => p.role === 'petitioner')!;
  const respondent = parties.find((p) => p.role === 'respondent')!;

  return (
    <Layout
      title="Case intake"
      subtitle="Confirm the details we'll use to prepare your documents. (Demo data is pre-filled.)"
      currentPath="/intake"
      footer={
        <Link
          to="/upload"
          className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Continue to documents
        </Link>
      }
    >
      <div className="space-y-4">
        <Section title="Petitioner">
          <Row label="Name" value={`${petitioner.first_name} ${petitioner.last_name}`} />
          <Row label="Date of birth" value={petitioner.dob} />
          <Row label="Address" value={`${petitioner.address_line1}, ${petitioner.city}, ${petitioner.state} ${petitioner.zip}`} />
        </Section>

        <Section title="Respondent">
          <Row label="Name" value={`${respondent.first_name} ${respondent.last_name}`} />
          <Row label="Date of birth" value={respondent.dob} />
          <Row label="Address" value={`${respondent.address_line1}, ${respondent.city}, ${respondent.state} ${respondent.zip}`} />
        </Section>

        <Section title={`Children (${children.length})`}>
          {children.map((c) => (
            <Row key={c.id} label={`${c.first_name} ${c.last_name}`} value={`DOB ${c.dob}`} />
          ))}
        </Section>

        <Section title={`Assets (${assets.length})`}>
          {assets.map((a) => (
            <Row key={a.id} label={a.description} value={`$${a.estimated_value.toLocaleString()} → ${a.awarded_to}`} />
          ))}
        </Section>

        <Section title={`Debts (${debts.length})`}>
          {debts.map((d) => (
            <Row key={d.id} label={`${d.creditor} (${d.type})`} value={`$${d.balance.toLocaleString()} → ${d.responsible_party}`} />
          ))}
        </Section>

        {support && (
          <Section title="Child support (Form 14 inputs)">
            <Row label="Petitioner monthly income" value={`$${support.petitioner_monthly_income.toLocaleString()}`} />
            <Row label="Respondent monthly income" value={`$${support.respondent_monthly_income.toLocaleString()}`} />
            <Row label="Presumed support" value={`$${support.presumed_support_amount.toLocaleString()} / mo (${support.paying_party} pays)`} />
          </Section>
        )}
      </div>
    </Layout>
  );
}
