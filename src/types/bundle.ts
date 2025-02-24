
export type ChargeModel = "one-time" | "subscription" | "usage";
export type BillingPeriod = "monthly" | "annually";

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  chargeModel: ChargeModel;
  billingPeriod?: BillingPeriod;
  usageUnits?: string;
  usagePeriod?: string;
}
