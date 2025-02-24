
export interface CACData {
  marketingCosts: number | undefined;
  salesCosts: number | undefined;
  newCustomers: number | undefined;
  timePeriod: "monthly" | "quarterly" | "annually";
}

export interface CACResults {
  cac: number;
  marketingSplit: number;
  salesSplit: number;
  customersPerPeriod: number;
  efficiency: "excellent" | "good" | "average" | "poor";
}
