import type { CaseBundleExt, PartyRole } from "../types";
import { fullName, partyBy, money, sumValues, fill } from "./docHelpers";

// Statement of Income and Expenses (Missouri). Each party files their OWN.
// Gross monthly income here feeds the child support (Form 14) calculation.
export function IncomeExpensesDoc({ b, role }: { b: CaseBundleExt; role: PartyRole }) {
  const party = partyBy(b, role);
  const stmt = b.income_statements.find((s) => s.party_role === role);
  const incomeLines = stmt?.income_lines ?? [];
  const expenseLines = stmt?.expense_lines ?? [];
  const totalIncome = (stmt?.gross_monthly_income ?? 0) + sumValues(incomeLines, (l) => l.monthly_amount);
  const totalExpenses = sumValues(expenseLines, (l) => l.monthly_amount);
  const net = totalIncome - totalExpenses;

  return (
    <div className="doc">
      <p className="doc-court">IN THE CIRCUIT COURT OF {fill(b.case.county).toUpperCase()} COUNTY, MISSOURI</p>
      <h2 className="doc-title">STATEMENT OF INCOME AND EXPENSES</h2>
      <p className="doc-subtitle">Filed by {role === "petitioner" ? "Petitioner" : "Respondent"}: {fullName(party)}</p>

      <table className="doc-table">
        <tbody>
          <tr><td>Employer</td><td>{fill(stmt?.employer)}</td></tr>
          <tr><td>Occupation</td><td>{fill(stmt?.occupation)}</td></tr>
          <tr><td>Gross Monthly Income</td><td>{money(stmt?.gross_monthly_income)}</td></tr>
        </tbody>
      </table>

      <h3 className="doc-h3">I. ADDITIONAL MONTHLY INCOME</h3>
      <table className="doc-table">
        <thead><tr><th>Source</th><th>Monthly Amount</th></tr></thead>
        <tbody>
          {incomeLines.length === 0 ? (
            <tr><td colSpan={2} className="doc-empty">None reported.</td></tr>
          ) : (
            incomeLines.map((l, i) => (
              <tr key={i}><td>{fill(l.label)}</td><td>{money(l.monthly_amount)}</td></tr>
            ))
          )}
        </tbody>
        <tfoot><tr><td>Total Monthly Income</td><td>{money(totalIncome)}</td></tr></tfoot>
      </table>

      <h3 className="doc-h3">II. MONTHLY EXPENSES</h3>
      <table className="doc-table">
        <thead><tr><th>Category</th><th>Monthly Amount</th></tr></thead>
        <tbody>
          {expenseLines.length === 0 ? (
            <tr><td colSpan={2} className="doc-empty">None reported.</td></tr>
          ) : (
            expenseLines.map((l, i) => (
              <tr key={i}><td>{fill(l.label)}</td><td>{money(l.monthly_amount)}</td></tr>
            ))
          )}
        </tbody>
        <tfoot><tr><td>Total Monthly Expenses</td><td>{money(totalExpenses)}</td></tr></tfoot>
      </table>

      <h3 className="doc-h3">III. SUMMARY</h3>
      <p>Net monthly cash flow: {money(net)} ({money(totalIncome)} income less {money(totalExpenses)} expenses).</p>

      <p className="doc-attest">I declare under penalty of perjury that the foregoing is true and accurate to the best of my knowledge and belief.</p>
      <div className="doc-sign">
        <p className="doc-sigline">________________________</p>
        <p>{fullName(party)}, {role === "petitioner" ? "Petitioner" : "Respondent"}</p>
      </div>
    </div>
  );
}
