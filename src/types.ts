// FlatFee data model — mirrors Supabase schema.
// All identifiers are synthetic demo data.

export type CaseStatus =
  | 'draft'
  | 'qualifying'
  | 'intake'
  | 'documents'
  | 'assembly'
  | 'attorney_review'
  | 'sign_pay'
  | 'filed';

export type Jurisdiction = 'MO';

export interface CaseRecord {
  id: string;
  status: CaseStatus;
  jurisdiction: Jurisdiction;
  county: string;
  is_uncontested: boolean;
  has_minor_children: boolean;
  created_at: string;
  updated_at: string;
}

export type PartyRole = 'petitioner' | 'respondent';

export interface Party {
  id: string;
  case_id: string;
  role: PartyRole;
  first_name: string;
  last_name: string;
  dob: string;
  email: string | null;
  phone: string | null;
  address_line1: string;
  city: string;
  state: string;
  zip: string;
}

export interface Child {
  id: string;
  case_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  primary_residence: PartyRole;
}

export type AssetType = 'real_estate' | 'vehicle' | 'bank' | 'retirement' | 'personal' | 'other';

export interface Asset {
  id: string;
  case_id: string;
  type: AssetType;
  description: string;
  estimated_value: number;
  awarded_to: PartyRole | 'split';
}

export type DebtType = 'mortgage' | 'auto_loan' | 'credit_card' | 'student_loan' | 'other';

export interface Debt {
  id: string;
  case_id: string;
  type: DebtType;
  creditor: string;
  balance: number;
  responsible_party: PartyRole | 'split';
}

export type DocumentKind =
  | 'petition'
  | 'parenting_plan'
  | 'form14'
  | 'property_statement'
  | 'judgment';

export type DocumentStatus = 'pending' | 'generated' | 'reviewed' | 'signed';

export interface CaseDocument {
  id: string;
  case_id: string;
  kind: DocumentKind;
  title: string;
  status: DocumentStatus;
  generated_at: string | null;
}

export interface SupportCalc {
  id: string;
  case_id: string;
  petitioner_monthly_income: number;
  respondent_monthly_income: number;
  num_children: number;
  presumed_support_amount: number;
  paying_party: PartyRole;
}

export interface CaseBundle {
  case: CaseRecord;
  parties: Party[];
  children: Child[];
  assets: Asset[];
  debts: Debt[];
  documents: CaseDocument[];
  support: SupportCalc | null;
}


// ---- Extended intake model for native document generation ----
// Marriage facts used by the Petition and Marital Settlement Agreement.
export interface MarriageFacts {
  date_of_marriage: string;
  place_of_marriage: string;
  date_of_separation: string;
  petitioner_resident_days: number; // MO 90-day residency requirement
  wife_maiden_name: string | null;
  restore_maiden_name: boolean;
  is_pregnant: boolean;
  grounds_irretrievable: boolean; // MO uses irretrievable breakdown
}

// A single line item on a party's Statement of Income & Expenses.
export interface IncomeExpenseLine {
  label: string;
  monthly_amount: number;
}

// Each party files their OWN statement; two sets are filed.
export interface IncomeExpenseStatement {
  party_role: PartyRole;
  employer: string;
  occupation: string;
  gross_monthly_income: number;
  income_lines: IncomeExpenseLine[];
  expense_lines: IncomeExpenseLine[];
}

// Each party files their OWN Statement of Property & Debts; shares Asset/Debt data.
export interface PropertyDebtStatement {
  party_role: PartyRole;
  notes: string;
}

// Settlement terms that build the Marital Settlement Agreement,
// correlated with the shared assets[] and debts[].
export interface SettlementTerms {
  maintenance_waived: boolean;
  maintenance_monthly_amount: number; // 0 if waived
  maintenance_paying_party: PartyRole | null;
  attorney_fees_each_own: boolean;
  additional_provisions: string;
}

// Parenting plan (Missouri CCFC179 Part A + CCFC181 Part B).
export interface ParentingPlan {
  legal_custody: 'joint' | 'sole_petitioner' | 'sole_respondent';
  physical_custody: 'joint' | 'sole_petitioner' | 'sole_respondent';
  residential_parent: PartyRole;
  holiday_schedule: string;
  exchange_location: string;
  decision_making: string;
}

// Extended bundle that augments CaseBundle with native-document data.
// Kept separate to avoid breaking existing CaseBundle consumers.
export interface CaseBundleExt extends CaseBundle {
  marriage: MarriageFacts;
  income_statements: IncomeExpenseStatement[]; // one per party
  property_statements: PropertyDebtStatement[]; // one per party
  settlement: SettlementTerms;
  parenting_plan: ParentingPlan | null;
}

// Identifies each native document we can render & fill live.
export type NativeDocId =
  | 'petition'
  | 'income_expenses'
  | 'property_debts'
  | 'marital_settlement'
  | 'parenting_plan_a'
  | 'parenting_plan_b';
