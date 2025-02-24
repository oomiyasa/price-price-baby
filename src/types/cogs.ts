
export type Industry = 
  | "Software/SaaS"
  | "Services"
  | "Manufacturing"
  | "Retail"
  | "Content/Media"
  | "Other"
  | "Healthcare";

export type DirectCostField = {
  id: string;
  label: string;
  placeholder: string;
};

export interface IndustryConfig {
  name: Industry;
  directCosts: DirectCostField[];
}

export interface COGSData {
  industry: Industry;
  revenue: number;
  directCosts: Record<string, number>;
  targetMargin: number;
}
