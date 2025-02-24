
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BundleProductProps } from "@/types/bundleConfiguration";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export const BundleProduct = ({
  product,
  discount,
  onDiscountChange,
  calculateAnnualValue,
  formatPriceWithFrequency,
}: BundleProductProps) => {
  // Calculate gross margin impact
  const originalMargin = product.grossMargin ? parseFloat(product.grossMargin) : 0;
  const discountedMargin = (originalMargin - discount) / (100 - discount) * 100;
  const marginImpact = originalMargin - discountedMargin;

  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 last:border-0">
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
      
      <div className="w-32">
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor={`discount-${product.id}`} className="text-sm text-gray-600">
            Discount %
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Set the discount percentage for this product in the bundle</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id={`discount-${product.id}`}
          type="number"
          min="0"
          max="100"
          value={discount || ''}
          onChange={(e) => onDiscountChange(product.id, e.target.value)}
          className="text-right"
          placeholder="0%"
        />
      </div>
      
      <div className="w-48 text-right">
        <Label className="text-sm text-gray-600 mb-1">Annual Value</Label>
        <div className="text-gray-600">
          List Price: ${calculateAnnualValue(product).toLocaleString()}
        </div>
        <div className="font-medium text-green-600">
          Discounted: ${(calculateAnnualValue(product) * 
             (1 - discount / 100))
             .toLocaleString()}
        </div>
        {product.grossMargin && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm text-gray-500 mt-1 cursor-help">
                Margin: {discountedMargin.toFixed(1)}% ({marginImpact > 0 ? "-" : ""}{marginImpact.toFixed(1)}%)
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Original margin: {originalMargin}%</p>
              <p>Impact from discount: {marginImpact.toFixed(1)}%</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
