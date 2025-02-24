
export type CurrentPricingForm = {
  offerType: "new" | "existing";
  pricingModel?: "subscription" | "perpetual";
  subscriptionPrice?: string;
  billingFrequency?: "monthly" | "annually" | "quarterly";
  listPrice?: string;
  billingPeriod?: "monthly" | "annually" | "quarterly";
  averageDiscount?: string;
  annualChurnRate?: string;
  annualPurchases?: string;
  unitOfMeasure?: "apiCalls" | "storage" | "activeUsers" | "messagesSent" | "computeHours" | "bandwidth" | "outputOutcome" | "custom";
  averageMonthlyUsage?: string;
  usageVariance?: string;
  customMetricName?: string;
};
