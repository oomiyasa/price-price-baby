
import { Input } from "@/components/ui/input";
import { BundleProductProps } from "@/types/bundleConfiguration";

export const BundleProduct = ({
  product,
  discount,
  onDiscountChange,
  calculateAnnualValue,
  formatPriceWithFrequency,
}: BundleProductProps) => {
  const annualValue = calculateAnnualValue(product);
  const discountedValue = annualValue * (1 - discount / 100);

  return (
    <div className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
      <div className="flex-1">
        <div className="font-medium text-[#4A4A3F]">
          {product.name}
        </div>
        <div className="text-sm text-gray-500 flex flex-col">
          <span>
            {product.chargeModel === "subscription" ? "Subscription" :
             product.chargeModel === "usage" ? "Usage-based" : "One-time"}
          </span>
          <span>
            ${product.price}{formatPriceWithFrequency(product)}
            {product.grossMargin && ` • ${product.grossMargin}% margin`}
          </span>
        </div>
      </div>
      
      <div className="w-20">
        <Input
          type="number"
          min="0"
          max="100"
          value={discount}
          onChange={(e) => onDiscountChange(product.id, e.target.value)}
          className="text-right h-8"
        />
        <div className="text-xs text-gray-500 text-right mt-1">% discount</div>
      </div>
      
      <div className="w-28 text-right">
        <div className="text-gray-500 line-through text-sm">
          ${annualValue.toLocaleString()}
        </div>
        <div className="font-medium text-green-600">
          ${discountedValue.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
