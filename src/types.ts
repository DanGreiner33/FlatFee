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
