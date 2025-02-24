
export const analyzePriceTrend = (historicalPrices: string[], currentPrice: string) => {
  if (historicalPrices.length < 2) return { trend: 0, volatility: 0 };
  
  const validPrices = [...historicalPrices.map(p => parseFloat(p)), parseFloat(currentPrice)]
    .filter(p => !isNaN(p));
  
  if (validPrices.length < 2) return { trend: 0, volatility: 0 };

  const changes = validPrices.slice(1).map((price, i) => 
    ((price - validPrices[i]) / validPrices[i]) * 100
  );

  const trend = changes.reduce((sum, change) => sum + change, 0) / changes.length;
  
  const meanChange = trend;
  const squaredDiffs = changes.map(change => Math.pow(change - meanChange, 2));
  const volatility = Math.sqrt(squaredDiffs.reduce((sum, diff) => sum + diff, 0) / changes.length);

  return { trend, volatility };
};
