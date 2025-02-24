
import { IndustryConfig } from "@/types/cogs";

export const industryConfigs: IndustryConfig[] = [
  {
    name: "Software/SaaS",
    directCosts: [
      { id: "hosting", label: "Hosting & Infrastructure", placeholder: "AWS, Azure, etc." },
      { id: "support", label: "Customer Support", placeholder: "Support staff costs" },
      { id: "licensing", label: "Third-party Licensing", placeholder: "Software licenses" }
    ],
    hasIndirectCosts: true
  },
  {
    name: "Professional Services",
    directCosts: [
      { id: "labor", label: "Direct Labor", placeholder: "Staff costs" },
      { id: "contractors", label: "Contractor Costs", placeholder: "External contractors" },
      { id: "materials", label: "Project Materials", placeholder: "Direct materials" }
    ],
    hasIndirectCosts: true
  },
  {
    name: "Manufacturing",
    directCosts: [
      { id: "rawMaterials", label: "Raw Materials", placeholder: "Direct materials" },
      { id: "labor", label: "Direct Labor", placeholder: "Production staff" },
      { id: "equipment", label: "Equipment Costs", placeholder: "Machine costs" },
      { id: "packaging", label: "Packaging", placeholder: "Packaging materials" }
    ],
    hasIndirectCosts: true
  },
  {
    name: "Retail",
    directCosts: [
      { id: "inventory", label: "Inventory Cost", placeholder: "Cost of goods" },
      { id: "freight", label: "Freight & Shipping", placeholder: "Shipping costs" },
      { id: "packaging", label: "Packaging", placeholder: "Packaging materials" }
    ],
    hasIndirectCosts: true
  },
  {
    name: "Food Service",
    directCosts: [
      { id: "ingredients", label: "Food Ingredients", placeholder: "Raw ingredients" },
      { id: "labor", label: "Kitchen Labor", placeholder: "Staff costs" },
      { id: "packaging", label: "Packaging", placeholder: "To-go containers, etc." }
    ],
    hasIndirectCosts: true
  }
];

export const marginRanges = {
  conservative: { min: 15, max: 30 },
  balanced: { min: 30, max: 60 },
  aggressive: { min: 60, max: 90 }
};

export const calculateGrossMargin = (revenue: number, totalCosts: number): number => {
  if (revenue === 0) return 0;
  return ((revenue - totalCosts) / revenue) * 100;
};

export const calculateRequiredRevenue = (costs: number, targetMargin: number): number => {
  if (targetMargin === 100) return Infinity;
  return costs / (1 - targetMargin / 100);
};
