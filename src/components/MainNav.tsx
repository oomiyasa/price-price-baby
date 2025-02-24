
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <div className="absolute top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#8B8B73] hover:bg-[#F2FCE2] hover:text-[#6B6B5F]"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-white">
          <DropdownMenuItem asChild>
            <Link to="/" className="cursor-pointer">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/cogs" className="cursor-pointer">
              COGS Calculator
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/new-offer" className="cursor-pointer">
              New Offer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/repricing" className="cursor-pointer">
              Repricing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/bundle-pricing" className="cursor-pointer">
              Bundle Pricing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/bundle-configuration" className="cursor-pointer">
              Bundle Configuration
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainNav;
