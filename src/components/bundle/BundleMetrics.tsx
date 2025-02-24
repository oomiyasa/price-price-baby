
import { ProductItem } from "@/types/bundle";

interface BundleMetricsProps {
  products: ProductItem[];
  calculateMRR: (products: ProductItem[]) => number;
  calculateARR: (products: ProductItem[]) => number;
  calculateBlendedMargin: (products: ProductItem[]) => number | null;
}

export const BundleMetrics = ({ 
  products, 
  calculateMRR, 
  calculateARR, 
  calculateBlendedMargin 
}: BundleMetricsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-600">Monthly Recurring Revenue (MRR)</div>
          <div className="text-2xl font-semibold text-[#4A4A3F]">
            ${calculateMRR(products).toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-600">Annual Recurring Revenue (ARR)</div>
          <div className="text-2xl font-semibold text-[#4A4A3F]">
            ${calculateARR(products).toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-600">Blended Gross Margin</div>
          <div className="text-2xl font-semibold text-[#4A4A3F]">
            {calculateBlendedMargin(products)?.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};
