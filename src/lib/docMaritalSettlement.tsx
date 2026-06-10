import type { CaseBundleExt } from "../types";
import { fullName, petitioner, respondent, money, roleName, formatDate, fill } from "./docHelpers";

// Marital Settlement and Separation Agreement (Missouri).
// Property/debt sections are driven by the SAME assets[]/debts[] used by the
// Statement of Property and Debts, keeping the two documents correlated.
export function MaritalSettlementDoc({ b }: { b: CaseBundleExt }) {
  const p = petitioner(b);
  const r = respondent(b);
  const s = b.settlement;
  const m = b.marriage;
  const hasKids = b.children.length > 0;

  return (
    <div className="doc">
      <h2 className="doc-title">MARITAL SETTLEMENT AND SEPARATION AGREEMENT</h2>

      <p>This Agreement is made between {fullName(p)} (&ldquo;Petitioner&rdquo;) and {fullName(r)} (&ldquo;Respondent&rdquo;), who were married on {formatDate(m?.date_of_marriage)} and separated on {formatDate(m?.date_of_separation)}.</p>

      <h3 className="doc-h3">1. RECITALS</h3>
      <p>The parties desire to settle all rights and obligations arising from their marriage, including the division of property, allocation of debts, {hasKids ? "custody and support of their minor children, " : ""}and questions of maintenance.</p>

      <h3 className="doc-h3">2. DIVISION OF PROPERTY</h3>
      <p>The marital property shall be divided as follows:</p>
      <table className="doc-table">
        <thead><tr><th>Property</th><th>Value</th><th>Awarded To</th></tr></thead>
        <tbody>
          {b.assets.length === 0 ? (
            <tr><td colSpan={3} className="doc-empty">No marital property to divide.</td></tr>
          ) : (
            b.assets.map((a, i) => (
              <tr key={i}>
                <td>{fill(a.description)}</td>
                <td>{money(a.estimated_value)}</td>
                <td>{roleName(b, a.awarded_to)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3 className="doc-h3">3. ALLOCATION OF DEBTS</h3>
      <table className="doc-table">
        <thead><tr><th>Creditor</th><th>Balance</th><th>Responsible Party</th></tr></thead>
        <tbody>
          {b.debts.length === 0 ? (
            <tr><td colSpan={3} className="doc-empty">No marital debts to allocate.</td></tr>
          ) : (
            b.debts.map((d, i) => (
              <tr key={i}>
                <td>{fill(d.creditor)}</td>
                <td>{money(d.balance)}</td>
                <td>{roleName(b, d.responsible_party)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3 className="doc-h3">4. MAINTENANCE</h3>
      {s?.maintenance_waived ? (
        <p>Each party knowingly and voluntarily waives any claim to maintenance (spousal support), now and forever.</p>
      ) : (
        <p>{roleName(b, s?.maintenance_paying_party ?? null)} shall pay maintenance to the other party in the amount of {money(s?.maintenance_monthly_amount)} per month until modified or terminated by law.</p>
      )}

      <h3 className="doc-h3">5. ATTORNEY&rsquo;S FEES</h3>
      <p>{s?.attorney_fees_each_own ? "Each party shall be responsible for their own attorney's fees and costs." : "Attorney's fees shall be allocated as the parties have separately agreed."}</p>

      {s?.additional_provisions ? (
        <>
          <h3 className="doc-h3">6. ADDITIONAL PROVISIONS</h3>
          <p>{s.additional_provisions}</p>
        </>
      ) : null}

      {m?.restore_maiden_name ? (
        <>
          <h3 className="doc-h3">7. RESTORATION OF NAME</h3>
          <p>The wife&rsquo;s former name, {fill(m?.wife_maiden_name)}, shall be restored.</p>
        </>
      ) : null}

      <p className="doc-attest">The parties acknowledge this Agreement is fair, not unconscionable, and entered into voluntarily.</p>

      <div className="doc-sign doc-sign-two">
        <div>
          <p className="doc-sigline">________________________</p>
          <p>{fullName(p)}, Petitioner</p>
        </div>
        <div>
          <p className="doc-sigline">________________________</p>
          <p>{fullName(r)}, Respondent</p>
        </div>
      </div>
    </div>
  );
}
