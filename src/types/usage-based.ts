
export type VolumeCommitTier = {
  commitmentAmount: number;
  pricePerUnit: number;
};

export type UsageTier = {
  minUsage: number;
  maxUsage: number;
  pricePerUnit: number;
};

export type PricingComponentsConfig = {
  pricingModel: "fixed" | "volumeCommitment" | "tiered";
  setupFee?: number;
  monthlyBase?: number;
  includedUnits?: number;
  additionalUnitPrice?: number;
  volumeCommitTiers?: VolumeCommitTier[];
  usageTiers?: UsageTier[];
  overage?: number;
  minimumCommitment?: number;
};

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
  pricingComponents?: PricingComponentsConfig;
};
