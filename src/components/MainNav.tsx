
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <div className="absolute top-4 left-4">
      <Button
        variant="ghost"
        size="icon"
        className="text-[#8B8B73] hover:bg-[#F2FCE2] hover:text-[#6B6B5F]"
        asChild
      >
        <Link to="/">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
      </Button>
    </div>
  );
};

export default MainNav;
