import { Scale, Tag, Package, Zap, BarChart3, ArrowLeftRight, Coins } from "lucide-react";
import { PricingTool } from "@/types/pricing";

export const pricingTools: PricingTool[] = [
  {
    id: "cogs",
    title: "COGS & Margin Calculator",
    description: "Calculate your true costs and optimal margins",
    route: "/cogs",
    icon: Scale,
  },
  {
    id: "competitive",
    title: "Competitive Pricing Analysis",
    description: "Compare your pricing and value against competitors",
    route: "/competitive-pricing",
    icon: ArrowLeftRight,
  },
  {
    id: "new-offer",
    title: "New Offer Pricing",
    description: "Price a new product or service using value based pricing",
    route: "/new-offer",
    icon: Tag,
  },
  {
    id: "repricing",
    title: "Repricing",
    description: "Optimize prices based on costs, competition, and demand",
    route: "/repricing",
    icon: Zap,
  },
  {
    id: "bundle-pricing",
    title: "Bundle Pricing",
    description: "Create strategic bundles that maximize revenue",
    route: "/bundle-pricing",
    icon: Package,
  },
  {
    id: "usage-based",
    title: "Usage Based Pricing",
    description: "Design pricing based on customer consumption",
    route: "/usage-based",
    icon: BarChart3,
  },
  {
    id: "market-size",
    title: "Market Sizing",
    description: "Estimate your total addressable market (TAM)",
    route: "/market-size",
    icon: Coins,
  },
];
