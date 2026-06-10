import React from 'react';
import type { CaseBundleExt, Child } from '../types';
import { fullName, fill, petitioner, respondent, roleName } from './docHelpers';

function childName(k: Child): string {
const name = `${k.first_name ?? ''} ${k.last_name ?? ''}`.trim();
return name || '________________';
}

/**
 * Parenting Plan (Missouri CCFC179 Part A - Custody &
 * CCFC181 Part B - Child Support / Decision Making).
 * Rendered only when the case involves minor children.
 * Exact statutory form language is supplied by the reviewing attorney;
 * this template mirrors the section structure of the official forms.
 */
export default function ParentingPlanDoc({ c }: { c: CaseBundleExt }) {
const p = petitioner(c);
const r = respondent(c);
const kids = c.children ?? [];
const pp = c.parenting_plan;

if (!kids.length) return null;

return (
<article className="doc doc-parenting">
<h1 className="doc-title">Parenting Plan</h1>
<p className="doc-caption">In re the Marriage of {fullName(p)} and {fullName(r)}</p>

<section className="doc-section">
<h2 className="doc-h2">Case Information</h2>
<p>Petitioner: {fullName(p)}</p>
<p>Respondent: {fullName(r)}</p>
<p>County: {fill(c.case.county)}</p>
<p>Case Number: {fill(c.case.id)}</p>
</section>

<section className="doc-section">
<h2 className="doc-h2">Part A &mdash; Custody</h2>

<h3 className="doc-h3">1. Children's Information</h3>
<ul>
{kids.map((k, i) => (
<li key={i}>{childName(k)} (DOB {fill(k.dob)})</li>
))}
</ul>

<h3 className="doc-h3">2. Designation of Parties</h3>
<p>{fullName(p)} is the Petitioner. {fullName(r)} is the Respondent.</p>

<h3 className="doc-h3">3. Access to Records</h3>
<p>Unless otherwise provided in this plan, both parents are entitled to access to records and information pertaining to the children, including medical, dental, health, child care and educational records.</p>

<h3 className="doc-h3">4. Legal Custody</h3>
<p>The parents shall share {fill(pp?.legal_custody)} legal custody of the minor child(ren).</p>

<h3 className="doc-h3">5. Physical Custody &amp; Residence</h3>
<p>The parents shall share {fill(pp?.physical_custody)} physical custody. The child(ren) shall reside primarily with {pp ? roleName(c, pp.residential_parent) : '________________'}.</p>

<h3 className="doc-h3">6. Parenting Time &amp; Exchange</h3>
<p>Exchanges shall take place at {fill(pp?.exchange_location)}.</p>
{pp?.holiday_schedule ? (
<>
<h3 className="doc-h3">7. Holiday Schedule</h3>
<p>{pp.holiday_schedule}</p>
</>
) : null}
</section>

<section className="doc-section">
<h2 className="doc-h2">Part B &mdash; Child Support &amp; Decision Making</h2>

<h3 className="doc-h3">1. Child Support</h3>
<p>Child support shall be set pursuant to a completed Missouri Form 14 calculation. {fill(null)} [Form 14 amount and paying party to be supplied during attorney review.]</p>

<h3 className="doc-h3">2. Health Insurance</h3>
<p>{fill(null)} shall maintain health insurance coverage for the minor child(ren). [To be supplied during attorney review.]</p>

<h3 className="doc-h3">3. Uninsured Medical Expenses</h3>
<p>Uninsured medical, dental and vision expenses shall be divided {fill(null)} between the parents. [To be supplied during attorney review.]</p>

<h3 className="doc-h3">4. Income Tax Dependency Exemptions</h3>
<p>{fill(null)} [Allocation of dependency exemptions to be supplied during attorney review.]</p>

<h3 className="doc-h3">5. College &amp; Post-Secondary Expenses</h3>
<p>{fill(null)} [To be supplied during attorney review.]</p>

<h3 className="doc-h3">6. Decision Making</h3>
<p>Major decisions regarding education, health care, and religious upbringing shall be made {fill(pp?.decision_making)}.</p>
</section>

<section className="doc-section doc-signatures">
<p>______________________________</p>
<p>{fullName(p)}, Petitioner</p>
<p>______________________________</p>
<p>{fullName(r)}, Respondent</p>
</section>
</article>
);
}
