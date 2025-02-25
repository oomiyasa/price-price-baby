
import { 
  ChartBar, 
  UserMinus, 
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Gauge,
  Flame,
  TrendingDown,
  Tags,
  BarChart3,
  RefreshCw,
  Calculator,
  Box,
  Percent,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface PricingTool {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: LucideIcon;
}

export const pricingTools: PricingTool[] = [
  {
    id: "revenue",
    title: "MRR/ARR Calculator",
    description: "Calculate and project your recurring revenue",
    route: "/revenue",
    icon: Calculator
  },
  {
    id: "nrr",
    title: "Net Revenue Retention",
    description: "Track cohort performance and revenue retention",
    route: "/nrr",
    icon: ChartBar
  },
  {
    id: "churn",
    title: "Churn Rate Calculator",
    description: "Analyze and prevent customer churn",
    route: "/churn",
    icon: UserMinus
  },
  {
    id: "ltv",
    title: "Customer Lifetime Value",
    description: "Calculate and optimize customer lifetime value",
    route: "/ltv",
    icon: TrendingUp
  },
  {
    id: "cac",
    title: "CAC Calculator",
    description: "Analyze customer acquisition costs and efficiency",
    route: "/cac",
    icon: DollarSign
  },
  {
    id: "quick-ratio",
    title: "Quick Ratio Calculator",
    description: "Measure growth efficiency and revenue health",
    route: "/quick-ratio",
    icon: ArrowUpRight
  },
  {
    id: "magic-number",
    title: "Magic Number Calculator",
    description: "Calculate sales efficiency metrics",
    route: "/magic-number",
    icon: Gauge
  },
  {
    id: "burn-multiple",
    title: "Burn Multiple Calculator",
    description: "Analyze burn rate efficiency",
    route: "/burn-multiple",
    icon: Flame
  },
  {
    id: "price-elasticity",
    title: "Price Elasticity",
    description: "Measure price sensitivity and market impact",
    route: "/price-elasticity",
    icon: TrendingDown
  },
  {
    id: "discount-strategy",
    title: "Discount Strategy",
    description: "Optimize discount levels and analyze impact",
    route: "/discount-strategy",
    icon: Tags
  },
  {
    id: "value-based-pricing",
    title: "Value-Based Pricing",
    description: "Develop pricing based on customer value",
    route: "/value-based-pricing",
    icon: BarChart3
  },
  {
    id: "new-offer",
    title: "Price a New Offering",
    description: "Get strategic pricing for your new product or service",
    route: "/new-offer",
    icon: DollarSign
  },
  {
    id: "reprice",
    title: "Reprice Existing Offering",
    description: "Optimize pricing for your current products",
    route: "/repricing",
    icon: RefreshCw
  },
  {
    id: "cogs",
    title: "Calculate COGS & Margins",
    description: "Analyze costs and determine target margins by industry",
    route: "/cogs",
    icon: Calculator
  },
  {
    id: "bundle",
    title: "Price a Bundle",
    description: "Create attractive package pricing",
    route: "/bundle-pricing",
    icon: Box
  },
  {
    id: "usage-based",
    title: "Deploy Usage-Based Pricing",
    description: "Whether launching new or transitioning from traditional models",
    route: "/usage-based",
    icon: Percent
  },
  {
    id: "market-size",
    title: "Market Sizing",
    description: "Calculate total addressable market and segment size",
    route: "/market-size",
    icon: ChartBar
  }
];
