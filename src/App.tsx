
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import COGS from "@/pages/COGS";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import NewOffer from "@/pages/NewOffer";
import Repricing from "@/pages/Repricing";
import BundlePricing from "@/pages/BundlePricing";
import BundleConfiguration from "@/pages/BundleConfiguration";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#FAFAFA]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cogs" element={<COGS />} />
          <Route path="/new-offer" element={<NewOffer />} />
          <Route path="/repricing" element={<Repricing />} />
          <Route path="/bundle" element={<BundlePricing />} />
          <Route path="/bundle/configure" element={<BundleConfiguration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
