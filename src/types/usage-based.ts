
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
  usagePattern?: "daily" | "weekly" | "monthly" | "occasional";
};
