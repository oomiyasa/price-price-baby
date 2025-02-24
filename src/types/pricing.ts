
export type CompanyType = "SMB" | "Growth" | "Enterprise" | null;
export type PricingPath = "cost" | "market" | null;
export type PricingStrategy = "lower" | "similar" | "premium" | null;

export interface IndustryBenchmark {
  low: number;
  average: number;
  high: number;
}

export interface IndustryBenchmarks {
  [key: string]: IndustryBenchmark;
}

export interface IndustryMargins {
  [key: string]: string;
}
