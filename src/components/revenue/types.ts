
export interface RevenueData {
  monthlyRevenue: number;
  growthRate: number;
  projectionMonths: number;
}

export interface RevenueProjection {
  month: string;
  mrr: number;
  arr: number;
}

export interface CohortData {
  startDate: string;
  initialRevenue: number;
  expansionRevenue: number;
  churnedRevenue: number;
}

export interface NRRResults {
  nrrPercentage: number;
  endingRevenue: number;
  netRevenue: number;
  cohorts: CohortData[];
}
