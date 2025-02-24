
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import NewOffer from "@/pages/NewOffer";
import Repricing from "@/pages/Repricing";
import BundlePricing from "@/pages/BundlePricing";
import { AppSidebar } from "@/components/app-sidebar";

function App() {
  return (
    <Router>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/new-offer" element={<NewOffer />} />
            <Route path="/bundle-pricing" element={<BundlePricing />} />
            <Route path="/repricing" element={<Repricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
      <Toaster />
    </Router>
  );
};

export default App;
