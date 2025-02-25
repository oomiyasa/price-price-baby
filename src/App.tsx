
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import COGS from "@/pages/COGS";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import NewOffer from "@/pages/NewOffer";
import Repricing from "@/pages/Repricing";
import BundlePricing from "@/pages/BundlePricing";
import BundleConfiguration from "@/pages/BundleConfiguration";
import UsageBasedPricing from "@/pages/UsageBasedPricing";
import UsagePricingImpact from "@/pages/UsagePricingImpact";
import MarketSizing from "@/pages/MarketSizing";
import RevenueCalculator from "@/pages/RevenueCalculator";
import NRRCalculator from "@/pages/NRRCalculator";
import ChurnCalculator from "@/pages/ChurnCalculator";
import LTVCalculator from "@/pages/LTVCalculator";
import CACCalculator from "@/pages/CACCalculator";
import QuickRatioCalculator from "@/pages/QuickRatioCalculator";
import MagicNumberCalculator from "@/pages/MagicNumberCalculator";
import BurnMultipleCalculator from "@/pages/BurnMultipleCalculator";
import PriceElasticity from "@/pages/PriceElasticity";
import DiscountStrategy from "@/pages/DiscountStrategy";
import CompetitivePricing from "@/pages/CompetitivePricing";
import MainNav from "@/components/MainNav";

const App = () => {
  return (
    <ToastProvider>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-[#FAFAFA]">
            <MainNav />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cogs" element={<COGS />} />
              <Route path="/new-offer" element={<NewOffer />} />
              <Route path="/repricing" element={<Repricing />} />
              <Route path="/bundle-pricing" element={<BundlePricing />} />
              <Route path="/bundle-configuration" element={<BundleConfiguration />} />
              <Route path="/usage-based" element={<UsageBasedPricing />} />
              <Route path="/usage-pricing-impact" element={<UsagePricingImpact />} />
              <Route path="/market-size" element={<MarketSizing />} />
              <Route path="/revenue" element={<RevenueCalculator />} />
              <Route path="/nrr" element={<NRRCalculator />} />
              <Route path="/churn" element={<ChurnCalculator />} />
              <Route path="/ltv" element={<LTVCalculator />} />
              <Route path="/cac" element={<CACCalculator />} />
              <Route path="/quick-ratio" element={<QuickRatioCalculator />} />
              <Route path="/magic-number" element={<MagicNumberCalculator />} />
              <Route path="/burn-multiple" element={<BurnMultipleCalculator />} />
              <Route path="/price-elasticity" element={<PriceElasticity />} />
              <Route path="/discount-strategy" element={<DiscountStrategy />} />
              <Route path="/competitive-pricing" element={<CompetitivePricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </TooltipProvider>
    </ToastProvider>
  );
};

export default App;
