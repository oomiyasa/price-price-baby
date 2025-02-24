
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import COGS from "@/pages/COGS";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import NewOffer from "@/pages/NewOffer";
import Repricing from "@/pages/Repricing";
import BundlePricing from "@/pages/BundlePricing";
import BundleConfiguration from "@/pages/BundleConfiguration";

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-[#FAFAFA]">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cogs" element={<COGS />} />
            <Route path="/new-offer" element={<NewOffer />} />
            <Route path="/repricing" element={<Repricing />} />
            <Route path="/bundle-pricing" element={<BundlePricing />} />
            <Route path="/bundle-configuration" element={<BundleConfiguration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
