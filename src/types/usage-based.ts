
export type CurrentPricingForm = {
  offerType: "new" | "existing";
  pricingModel?: "subscription" | "perpetual";
  subscriptionPrice?: string;
  billingFrequency?: "monthly" | "annually" | "quarterly";
  customerCount?: string;
  listPrice?: string;
  billingPeriod?: "monthly" | "annually" | "quarterly";
  averageDiscount?: string;
  annualChurnRate?: string;
};
