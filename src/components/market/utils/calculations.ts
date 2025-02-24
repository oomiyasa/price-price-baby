
export const calculateProjections = (baseRevenue: number, growthRate: number, years: number) => {
  return Array.from({ length: years }, (_, index) => ({
    year: new Date().getFullYear() + index,
    revenue: baseRevenue * Math.pow(1 + growthRate / 100, index),
  }));
};

export const formatCurrency = (value: number) => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value.toFixed(2)}`;
};
