
import { useState } from "react";
import { ProductItem, ChargeModel, BillingPeriod } from "@/types/bundle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ProductItemsFormProps {
  products: ProductItem[];
  onAddProduct: (product: ProductItem) => void;
  onUpdateProduct: (product: ProductItem) => void;
  onDeleteProduct: (productId: string) => void;
  onReorderProducts: (products: ProductItem[]) => void;
}

export const ProductItemsForm = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onReorderProducts,
}: ProductItemsFormProps) => {
  const [newProduct, setNewProduct] = useState<ProductItem>({
    id: "",
    name: "",
    price: "",
    chargeModel: "one-time",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      onAddProduct({
        ...newProduct,
        id: crypto.randomUUID(),
      });
      setNewProduct({
        id: "",
        name: "",
        price: "",
        chargeModel: "one-time",
      });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorderProducts(items);
  };

  const formatPriceWithFrequency = (product: ProductItem) => {
    const price = `$${product.price}`;
    switch (product.chargeModel) {
      case "one-time":
        return price;
      case "subscription":
        return `${price}/${product.billingPeriod === 'monthly' ? 'mo' : 'yr'}`;
      case "usage":
        const units = product.usageUnits || '0';
        return `${price}/unit (est. ${units} units/${product.usagePeriod})`;
      default:
        return price;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#4A4A3F]">Product Items</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label htmlFor="chargeModel">Charge Model</Label>
              <Select
                value={newProduct.chargeModel}
                onValueChange={(value: ChargeModel) =>
                  setNewProduct({ ...newProduct, chargeModel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select charge model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="usage">Usage-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Enter price"
              />
            </div>
            {newProduct.chargeModel === "subscription" && (
              <div>
                <Label htmlFor="billingPeriod">Billing Period</Label>
                <Select
                  value={newProduct.billingPeriod}
                  onValueChange={(value: BillingPeriod) =>
                    setNewProduct({ ...newProduct, billingPeriod: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {newProduct.chargeModel === "usage" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="usageUnits">Estimated Units</Label>
                <Input
                  id="usageUnits"
                  type="number"
                  min="0"
                  value={newProduct.usageUnits || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, usageUnits: e.target.value })
                  }
                  placeholder="Enter estimated units"
                />
              </div>
              <div>
                <Label htmlFor="usagePeriod">Usage Period</Label>
                <Select
                  value={newProduct.usagePeriod}
                  onValueChange={(value: string) =>
                    setNewProduct({ ...newProduct, usagePeriod: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select usage period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Per Day</SelectItem>
                    <SelectItem value="month">Per Month</SelectItem>
                    <SelectItem value="year">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <Button
            type="submit"
            className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </form>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="products">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {products.map((product, index) => (
                <Draggable
                  key={product.id}
                  draggableId={product.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md"
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-sm font-medium text-gray-700">
                            {product.name}
                          </span>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-700">
                            {formatPriceWithFrequency(product)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
