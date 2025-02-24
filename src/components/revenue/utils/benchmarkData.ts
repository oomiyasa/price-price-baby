
import { Industry, IndustryBenchmark } from "../types";

export const industryBenchmarks: Record<Industry, IndustryBenchmark> = {
  saas: {
    industry: "saas",
    topQuartile: 5,
    average: 13,
    bottomQuartile: 20
  },
  ecommerce: {
    industry: "ecommerce",
    topQuartile: 15,
    average: 30,
    bottomQuartile: 45
  },
  fintech: {
    industry: "fintech",
    topQuartile: 4,
    average: 10,
    bottomQuartile: 18
  },
  healthcare: {
    industry: "healthcare",
    topQuartile: 8,
    average: 15,
    bottomQuartile: 25
  },
  telecom: {
    industry: "telecom",
    topQuartile: 12,
    average: 22,
    bottomQuartile: 35
  },
  media: {
    industry: "media",
    topQuartile: 20,
    average: 35,
    bottomQuartile: 50
  },
  other: {
    industry: "other",
    topQuartile: 10,
    average: 20,
    bottomQuartile: 30
  }
};

export const getChurnRating = (churnRate: number, benchmark: IndustryBenchmark): "good" | "average" | "risk" => {
  if (churnRate <= benchmark.topQuartile) return "good";
  if (churnRate <= benchmark.average) return "average";
  return "risk";
};
