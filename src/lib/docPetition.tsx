import type { CaseBundleExt } from "../types";
import { fullName, petitioner, respondent, formatDate, fill, BLANK } from "./docHelpers";

// Petition for Dissolution of Marriage (Missouri, settled/uncontested).
// Conditional paragraphs included for children, pregnancy, and maiden-name restoration.
export function PetitionDoc({ b }: { b: CaseBundleExt }) {
  const p = petitioner(b);
  const r = respondent(b);
  const hasKids = b.children.length > 0;
  const m = b.marriage;

  return (
    <div className="doc">
      <p className="doc-court">IN THE CIRCUIT COURT OF {fill(b.case.county).toUpperCase()} COUNTY, MISSOURI</p>
      <table className="doc-caption">
        <tbody>
          <tr>
            <td>
              In re the Marriage of:<br />
              {fullName(p)}, Petitioner,<br />
              and<br />
              {fullName(r)}, Respondent.
            </td>
            <td>Case No. {fill(b.case.id).slice(0, 8).toUpperCase()}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="doc-title">PETITION FOR DISSOLUTION OF MARRIAGE</h2>

      <p>COMES NOW Petitioner, {fullName(p)}, and for the Petition for Dissolution of Marriage states to the Court as follows:</p>

      <ol className="doc-numbered">
        <li>Petitioner has been a resident of the State of Missouri for more than ninety (90) days immediately preceding the filing of this Petition.</li>
        <li>The parties were lawfully married on {formatDate(m?.date_of_marriage)}, in {fill(m?.place_of_marriage)}, and the marriage is registered in {fill(b.case.county)} County, Missouri.</li>
        <li>The parties separated on or about {formatDate(m?.date_of_separation)}.</li>
        <li>There remains no reasonable likelihood that the marriage can be preserved, and therefore the marriage is irretrievably broken.</li>
        {m?.is_pregnant ? (
          <li>The wife is currently pregnant.</li>
        ) : (
          <li>The wife is not pregnant.</li>
        )}
        {hasKids ? (
          <li>
            {b.children.length} child(ren) were born of or adopted during the marriage, namely:
            <ul className="doc-bullets">
              {b.children.map((c, i) => (
                <li key={i}>{c.first_name} {c.last_name}, born {formatDate(c.dob)}</li>
              ))}
            </ul>
            A proposed Parenting Plan is filed herewith.
          </li>
        ) : (
          <li>No children were born of or adopted during the marriage, and the wife is not now pregnant.</li>
        )}
        <li>The parties have entered into a written Marital Settlement and Separation Agreement resolving all issues of property, debts{hasKids ? ", custody, and support" : " and maintenance"}, which is filed herewith and incorporated by reference.</li>
        {m?.restore_maiden_name ? (
          <li>Petitioner requests that the wife&rsquo;s former name, {fill(m?.wife_maiden_name)}, be restored.</li>
        ) : null}
      </ol>

      <p>WHEREFORE, Petitioner prays the Court enter a Judgment of Dissolution of Marriage dissolving the marriage, approving the parties&rsquo; agreement, and granting such other relief as the Court deems just and proper.</p>

      <div className="doc-sign">
        <p>Respectfully submitted,</p>
        <p className="doc-sigline">{p ? BLANK : BLANK}</p>
        <p>{fullName(p)}, Petitioner</p>
      </div>
    </div>
  );
}
