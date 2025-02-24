
export interface MarketSizeFormData {
  calculationType: 'revenue' | 'customers';
  industryRevenue?: number;
  totalCustomers?: number;
  averageRevenue: number;
  growthRate: number;
  targetSegmentPercentage: number;
  marketSharePercentage: number;
  yearsProjection: number;
}

export interface MarketSizeResults {
  tam: number;
  sam: number;
  som: number;
  projections: Array<{
    year: number;
    revenue: number;
  }>;
}
