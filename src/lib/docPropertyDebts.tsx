import type { CaseBundleExt, PartyRole } from "../types";
import { fullName, partyBy, money, roleName, sumValues, fill } from "./docHelpers";

// Statement of Property and Debts (Missouri). Each party files their OWN.
// Reads the shared assets[]/debts[] so it stays correlated with the MSA.
export function PropertyDebtsDoc({ b, role }: { b: CaseBundleExt; role: PartyRole }) {
  const party = partyBy(b, role);
  const totalAssets = sumValues(b.assets, (a) => a.estimated_value);
  const totalDebts = sumValues(b.debts, (d) => d.balance);
  const netWorth = totalAssets - totalDebts;

  return (
    <div className="doc">
      <p className="doc-court">IN THE CIRCUIT COURT OF {fill(b.case.county).toUpperCase()} COUNTY, MISSOURI</p>
      <h2 className="doc-title">STATEMENT OF PROPERTY AND DEBTS</h2>
      <p className="doc-subtitle">Filed by {role === "petitioner" ? "Petitioner" : "Respondent"}: {fullName(party)}</p>

      <h3 className="doc-h3">I. ASSETS</h3>
      <table className="doc-table">
        <thead>
          <tr><th>Description</th><th>Type</th><th>Estimated Value</th><th>Awarded To</th></tr>
        </thead>
        <tbody>
          {b.assets.length === 0 ? (
            <tr><td colSpan={4} className="doc-empty">No assets listed.</td></tr>
          ) : (
            b.assets.map((a, i) => (
              <tr key={i}>
                <td>{fill(a.description)}</td>
                <td>{a.type.replace(/_/g, " ")}</td>
                <td>{money(a.estimated_value)}</td>
                <td>{roleName(b, a.awarded_to)}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr><td colSpan={2}>Total Assets</td><td colSpan={2}>{money(totalAssets)}</td></tr>
        </tfoot>
      </table>

      <h3 className="doc-h3">II. DEBTS</h3>
      <table className="doc-table">
        <thead>
          <tr><th>Creditor</th><th>Type</th><th>Balance</th><th>Responsible Party</th></tr>
        </thead>
        <tbody>
          {b.debts.length === 0 ? (
            <tr><td colSpan={4} className="doc-empty">No debts listed.</td></tr>
          ) : (
            b.debts.map((d, i) => (
              <tr key={i}>
                <td>{fill(d.creditor)}</td>
                <td>{d.type.replace(/_/g, " ")}</td>
                <td>{money(d.balance)}</td>
                <td>{roleName(b, d.responsible_party)}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr><td colSpan={2}>Total Debts</td><td colSpan={2}>{money(totalDebts)}</td></tr>
        </tfoot>
      </table>

      <h3 className="doc-h3">III. NET MARITAL ESTATE</h3>
      <p>Total assets {money(totalAssets)} less total debts {money(totalDebts)} = net estate of {money(netWorth)}.</p>

      <p className="doc-attest">I declare under penalty of perjury that the foregoing is true and accurate to the best of my knowledge and belief.</p>
      <div className="doc-sign">
        <p className="doc-sigline">________________________</p>
        <p>{fullName(party)}, {role === "petitioner" ? "Petitioner" : "Respondent"}</p>
      </div>
    </div>
  );
}
