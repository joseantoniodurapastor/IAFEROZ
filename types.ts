export interface ROIResult {
  monthlyLoss: number;
  laborCost: number;
  lostLeads: number;
  errors: number;
  yearlyLoss: number;
  paybackDays: number;
  roiYear1: number;
}

export interface CaseStudy {
  id: number;
  title: string;
  problem: string;
  hemorrhage: string;
  solution: string[];
  implementation: string;
  results: string[];
  roi: string;
  payback: string;
  cta: string;
}
