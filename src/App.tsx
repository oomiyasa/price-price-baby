
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"

import Index from "@/pages/Index";
import NewOffer from "@/pages/NewOffer";
import BundlePricing from "@/pages/BundlePricing";
import NotFound from "@/pages/NotFound";
import Repricing from "@/pages/Repricing";
import BundleConfiguration from "@/pages/BundleConfiguration";

const Layout = ({ children }: { children: React.ReactNode }) => (
  // Add bg-[#FAFAFA] to the root div to prevent white flashes
  <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-[#8B8B73] hover:bg-[#F2FCE2] hover:text-[#6B6B5F]">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem asChild>
            <Link to="/" className="cursor-pointer">
              Home
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <main className="flex-1">
      {children}
    </main>
    <footer className="text-center p-4 text-sm text-gray-600 border-t">
      Price Price Baby | Oomiyasa LLC
    </footer>
    <Toaster />
  </div>
);

function App() {
  return (
    // Add a wrapper div with bg-[#FAFAFA] for consistent background
    <div className="bg-[#FAFAFA]">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/new-offer" element={<NewOffer />} />
            <Route path="/bundle-pricing" element={<BundlePricing />} />
            <Route path="/bundle-configuration" element={<BundleConfiguration />} />
            <Route path="/repricing" element={<Repricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
