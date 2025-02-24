
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import Index from "./pages/Index";
import NewOffer from "./pages/NewOffer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 flex flex-col">
            <MainNav />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/new-offer" element={<NewOffer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <footer className="py-4 px-6 text-center text-gray-400 text-sm">
              Price Price Baby | Oomiyasa LLC
            </footer>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
