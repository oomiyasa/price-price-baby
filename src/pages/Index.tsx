
import { HomeHeader } from "@/components/home/HomeHeader";
import { PricingToolsGrid } from "@/components/home/PricingToolsGrid";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <HomeHeader />
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <PricingToolsGrid />
      </div>
      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};

export default Index;
