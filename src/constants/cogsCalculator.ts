import { IndustryConfig } from "@/types/cogs";

export const industryConfigs: IndustryConfig[] = [
  {
    name: "Software/SaaS",
    directCosts: [
      { id: "hosting", label: "Hosting & Infrastructure", placeholder: "AWS, Azure, etc." },
      { id: "support", label: "Customer Support", placeholder: "Support staff costs" },
      { id: "licensing", label: "Third-party Licensing", placeholder: "Software licenses" }
    ]
  },
  {
    name: "Services",
    directCosts: [
      { id: "labor", label: "Direct Labor", placeholder: "Staff costs" },
      { id: "contractors", label: "Contractor Costs", placeholder: "External contractors" },
      { id: "materials", label: "Project Materials", placeholder: "Direct materials" }
    ]
  },
  {
    name: "Manufacturing",
    directCosts: [
      { id: "rawMaterials", label: "Raw Materials", placeholder: "Direct materials" },
      { id: "labor", label: "Direct Labor", placeholder: "Production staff" },
      { id: "equipment", label: "Equipment Costs", placeholder: "Machine costs" },
      { id: "packaging", label: "Packaging", placeholder: "Packaging materials" }
    ]
  },
  {
    name: "Retail",
    directCosts: [
      { id: "inventory", label: "Inventory Cost", placeholder: "Cost of goods" },
      { id: "freight", label: "Freight & Shipping", placeholder: "Shipping costs" },
      { id: "packaging", label: "Packaging", placeholder: "Packaging materials" }
    ]
  },
  {
    name: "Content/Media",
    directCosts: [
      { id: "production", label: "Production Costs", placeholder: "Direct production expenses" },
      { id: "talent", label: "Talent & Creative", placeholder: "Creative staff/contractors" },
      { id: "licensing", label: "Content Licensing", placeholder: "Rights and permissions" }
    ]
  },
  {
    name: "Other",
    directCosts: [
      { id: "materials", label: "Direct Materials", placeholder: "Raw materials, supplies" },
      { id: "labor", label: "Direct Labor", placeholder: "Staff directly involved" },
      { id: "equipment", label: "Equipment", placeholder: "Machinery, tools" },
      { id: "other", label: "Other Direct Costs", placeholder: "Any other direct costs" }
    ]
  },
  {
    name: "Healthcare",
    directCosts: [
      { id: "supplies", label: "Medical Supplies", placeholder: "Disposables, medicines, etc." },
      { id: "labor", label: "Medical Staff", placeholder: "Healthcare workers" },
      { id: "equipment", label: "Equipment", placeholder: "Medical equipment" },
      { id: "billing", label: "Billing Services", placeholder: "Insurance processing" }
    ]
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
