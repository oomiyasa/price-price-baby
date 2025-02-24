
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductItemsForm } from "@/components/bundle/ProductItemsForm";
import { ProductItem } from "@/types/bundle";

const BundlePricing = () => {
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const handleAddProduct = (product: ProductItem) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct: ProductItem) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleReorderProducts = (reorderedProducts: ProductItem[]) => {
    setProducts(reorderedProducts);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-4"
          >
            <Card className="bg-white border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <ProductItemsForm
                  products={products}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onReorderProducts={handleReorderProducts}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BundlePricing;
