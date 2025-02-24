
import { Input } from "@/components/ui/input";
import { BundleProductProps } from "@/types/bundleConfiguration";

export const BundleProduct = ({
  product,
  discount,
  onDiscountChange,
  calculateAnnualValue,
  formatPriceWithFrequency,
}: BundleProductProps) => {
  return (
    <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 last:border-0">
      <div className="flex-1">
        <div className="font-medium text-[#4A4A3F]">
          {product.name}
        </div>
        <div className="text-sm text-gray-500">
          {product.chargeModel === "subscription" ? "Subscription" :
           product.chargeModel === "usage" ? "Usage-based" : "One-time"} 
          ({`$${product.price}${formatPriceWithFrequency(product)}`})
        </div>
      </div>
      
      <div className="w-24">
        <Input
          type="number"
          min="0"
          max="100"
          value={discount}
          onChange={(e) => onDiscountChange(product.id, e.target.value)}
          className="text-right"
        />
      </div>
      
      <div className="w-32 text-right">
        <div className="text-gray-500 line-through">
          ${calculateAnnualValue(product).toLocaleString()}
        </div>
        <div className="font-medium text-green-600">
          ${(calculateAnnualValue(product) * 
             (1 - discount / 100))
             .toLocaleString()}
        </div>
      </div>
    </div>
  );
};
