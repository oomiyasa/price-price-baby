
export type Industry = 
  | "Software/SaaS"
  | "Professional Services"
  | "Manufacturing"
  | "Retail"
  | "Food Service";

export type DirectCostField = {
  id: string;
  label: string;
  placeholder: string;
};

export interface IndustryConfig {
  name: Industry;
  directCosts: DirectCostField[];
  hasIndirectCosts: boolean;
}

export interface COGSData {
  industry: Industry;
  revenue: number;
  directCosts: Record<string, number>;
  indirectCosts: number;
  targetMargin: number;
}
