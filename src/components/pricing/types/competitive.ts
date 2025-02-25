
export type RelativeScore = -2 | -1 | 0 | 1 | 2;

export interface CompetitorMetrics {
  productQuality: RelativeScore;
  serviceQuality: RelativeScore;
  brandEquity: RelativeScore;
  customerSatisfaction: RelativeScore;
}

export interface Competitor {
  name: string;
  pricePerUnit: number;
  metrics: CompetitorMetrics;
}

export interface SelfAssessment {
  productQuality: number;
  serviceQuality: number;
  brandEquity: number;
  customerSatisfaction: number;
  pricePerUnit: number;
}

export interface CompetitiveAnalysis {
  selfAssessment: SelfAssessment;
  competitors: Competitor[];
}

export const RELATIVE_SCORE_OPTIONS = [
  { value: -2, label: "Much Worse" },
  { value: -1, label: "Worse" },
  { value: 0, label: "Same" },
  { value: 1, label: "Better" },
  { value: 2, label: "Much Better" },
] as const;
