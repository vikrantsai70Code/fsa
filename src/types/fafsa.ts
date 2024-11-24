export interface PersonalInfo {
  ssn: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

export interface FinancialInfo {
  taxReturnData: {
    adjustedGrossIncome: number;
    taxableIncome: number;
  };
  estimatedFamilyContribution: number;
}

export interface EducationalInfo {
  schoolCodes: string[];
  enrollmentStatus: 'full-time' | 'part-time';
}

export interface FAFSAApplication {
  id: string;
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  educationalInfo: EducationalInfo;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'denied';
  submissionDate?: string;
  reviewerNotes?: string;
  approverNotes?: string;
}