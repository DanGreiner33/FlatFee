import type { CaseBundleExt, Party, PartyRole } from "../types";

export const BLANK = "________________";

export function fill(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return BLANK;
  return String(value);
}

export function money(n: number | null | undefined): string {
  if (n === null || n === undefined || isNaN(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function fullName(p: Party | undefined): string {
  if (!p) return BLANK;
  const name = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim();
  return name || BLANK;
}

export function partyBy(b: CaseBundleExt, role: PartyRole): Party | undefined {
  return b.parties.find((p) => p.role === role);
}

export function petitioner(b: CaseBundleExt): Party | undefined {
  return partyBy(b, "petitioner");
}

export function respondent(b: CaseBundleExt): Party | undefined {
  return partyBy(b, "respondent");
}

export function roleName(b: CaseBundleExt, role: PartyRole | "split" | null): string {
  if (role === "split") return "Both parties";
  if (role === null) return BLANK;
  return fullName(partyBy(b, role));
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return BLANK;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function sumValues<T>(items: T[], pick: (x: T) => number): number {
  return items.reduce((acc, x) => acc + (pick(x) || 0), 0);
}
