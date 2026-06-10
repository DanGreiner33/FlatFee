import React from 'react';
import type { CaseBundleExt } from '../types';
import { fullName, fill } from './docHelpers';

/**
 * Parenting Plan (Missouri CCFC179 Part A - Custody &
 * CCFC181 Part B - Child Support / Decision Making).
 * Rendered only when the case involves minor children.
 * Exact statutory form language is supplied by the reviewing attorney;
 * this template mirrors the section structure of the official forms.
 */
export default function ParentingPlanDoc({ c }: { c: CaseBundleExt }) {
  const p = c.petitioner;
  const r = c.respondent;
  const kids = c.children ?? [];
  const pp = c.parenting_plan;

  if (!kids.length) return null;

  const mother = p.sex === 'F' ? p : r;
  const father = p.sex === 'F' ? r : p;

  return (
    <article className="doc doc-parenting">
      <h1 className="doc-title">Parenting Plan</h1>
      <p className="doc-caption">In re the Marriage of {fullName(p)} and {fullName(r)}</p>

      <section className="doc-section">
        <h2 className="doc-h2">Case Information</h2>
        <p>Mother: {fullName(mother)}</p>
        <p>Father: {fullName(father)}</p>
        <p>County: {fill(c.county)}</p>
        <p>Case Number: {fill(c.case_number)}</p>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Part A &mdash; Custody</h2>

        <h3 className="doc-h3">1. Children's Information</h3>
        <ul>
          {kids.map((k, i) => (
            <li key={i}>{fullName(k)} (DOB {fill(k.dob)})</li>
          ))}
        </ul>

        <h3 className="doc-h3">2. Designation of Parties</h3>
        <p>{fullName(p)} is the Petitioner. {fullName(r)} is the Respondent.</p>

        <h3 className="doc-h3">3. Access to Records</h3>
        <p>Unless otherwise provided in this plan, both parents are entitled to access to records and information pertaining to the children, including medical, dental, health, child care and educational records.</p>

        <h3 className="doc-h3">4. Children's Activities</h3>
        <p>Both parents must attempt to accommodate the social and academic commitments of the children during their respective parenting time.</p>

        <h3 className="doc-h3">5. Legal Custody</h3>
        <p>The parents shall share {fill(pp?.legal_custody)} legal custody of the minor child(ren).</p>

        <h3 className="doc-h3">6. Physical Custody &amp; Residence</h3>
        <p>The child(ren) shall reside primarily with {fill(pp?.primary_residence)}.</p>

        <h3 className="doc-h3">7. Parenting Time Schedule</h3>
        <p>{fill(pp?.schedule_summary)}</p>

        {pp?.holiday_schedule ? (
          <>
            <h3 className="doc-h3">8. Holiday Schedule</h3>
            <p>{pp.holiday_schedule}</p>
          </>
        ) : null}
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Part B &mdash; Child Support &amp; Decision Making</h2>

        <h3 className="doc-h3">1. Child Support</h3>
        <p>Pursuant to a completed Form 14 calculation, {fill(pp?.support_payor)} shall pay child support of {fill(pp?.support_amount)} per month to {fill(pp?.support_payee)}.</p>

        <h3 className="doc-h3">2. Health Insurance</h3>
        <p>{fill(pp?.health_insurance_provider)} shall maintain health insurance coverage for the minor child(ren).</p>

        <h3 className="doc-h3">3. Uninsured Medical Expenses</h3>
        <p>Uninsured medical, dental and vision expenses shall be divided {fill(pp?.medical_split)} between the parents.</p>

        <h3 className="doc-h3">4. Income Tax Dependency Exemptions</h3>
        <p>{fill(pp?.tax_exemption)}</p>

        <h3 className="doc-h3">5. College &amp; Post-Secondary Expenses</h3>
        <p>{fill(pp?.college_expenses)}</p>

        <h3 className="doc-h3">6. Educational Decisions</h3>
        <p>Major decisions regarding education, health care, and religious upbringing shall be made {fill(pp?.decision_making)}.</p>
      </section>

      <div className="doc-sign doc-sign-two">
        <div>
          <p className="doc-sigline">_____________________________</p>
          <p>{fullName(p)}, Petitioner</p>
        </div>
        <div>
          <p className="doc-sigline">_____________________________</p>
          <p>{fullName(r)}, Respondent</p>
        </div>
      </div>
    </article>
  );
}
