
export const calculateProjections = (
  monthlyRevenue: number,
  growthRate: number,
  months: number
): Array<{ month: string, mrr: number, arr: number }> => {
  return Array.from({ length: months }, (_, index) => {
    const monthlyGrowthRate = (1 + growthRate / 100) ** (1/12) - 1;
    const projectedMRR = monthlyRevenue * (1 + monthlyGrowthRate) ** index;
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + index);
    
    return {
      month: currentDate.toLocaleString('default', { month: 'short', year: '2-digit' }),
      mrr: projectedMRR,
      arr: projectedMRR * 12
    };
  });
};

export const calculateNRR = (
  initialRevenue: number,
  expansionRevenue: number,
  churnedRevenue: number
): number => {
  const endingRevenue = initialRevenue + expansionRevenue - churnedRevenue;
  return (endingRevenue / initialRevenue) * 100;
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
