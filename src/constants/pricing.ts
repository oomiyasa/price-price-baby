import { IndustryBenchmarks, IndustryMargins } from "../types/pricing";
import { Building, Users, User, DollarSign, ChartBar, ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

export const companyTypes = [
  {
    id: "SMB",
    title: "Small Business",
    description: "Solo entrepreneurs and small teams looking to establish pricing for their first offers",
    icon: User,
  },
  {
    id: "Growth",
    title: "Growth Company",
    description: "Established businesses looking to scale their pricing strategy and optimize revenue",
    icon: Building,
  },
  {
    id: "Enterprise",
    title: "Enterprise",
    description: "Large organizations with complex pricing needs and multiple stakeholders",
    icon: Users,
  },
];

export const pricingPaths = [
  {
    id: "cost",
    title: "Cost-Based Pricing",
    description: "Calculate your price based on your costs plus desired profit margin. Best for products/services with clear cost structures.",
    icon: DollarSign,
  },
  {
    id: "market",
    title: "Market-Based Pricing",
    description: "Set your price based on market research and competitor analysis. Ideal for established markets with clear competitors.",
    icon: ChartBar,
  },
];

export const pricingStrategies = [
  {
    id: "lower",
    title: "Lower than competitors",
    description: "Gain market share through competitive pricing",
    icon: ArrowDown,
  },
  {
    id: "similar",
    title: "Similar to competitors",
    description: "Match market expectations and compete on value",
    icon: ArrowRight,
  },
  {
    id: "premium",
    title: "Premium pricing",
    description: "Position as a high-value, premium solution",
    icon: ArrowUp,
  },
];

export const industryBenchmarks: IndustryBenchmarks = {
  SMB: {
    low: 15,
    average: 25,
    high: 35,
  },
  Growth: {
    low: 20,
    average: 35,
    high: 45,
  },
  Enterprise: {
    low: 25,
    average: 40,
    high: 55,
  },
};

export const industryMargins: IndustryMargins = {
  'Software/SaaS': '70-85%',
  'Services': '50-70%',
  'Manufacturing': '20-35%',
  'Retail': '25-35%',
  'Content/Media': '40-60%',
  'Other': '25-45%',
  'Healthcare': '30-45%'
};
