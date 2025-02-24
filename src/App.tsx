
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import NewOffer from "@/pages/NewOffer";
import Repricing from "@/pages/Repricing";
import BundlePricing from "@/pages/BundlePricing";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/new-offer" element={<NewOffer />} />
            <Route path="/bundle-pricing" element={<BundlePricing />} />
            <Route path="/repricing" element={<Repricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="text-center p-4 text-sm text-gray-600 border-t">
          Price Price Baby | Oomiyasa LLC
        </footer>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
