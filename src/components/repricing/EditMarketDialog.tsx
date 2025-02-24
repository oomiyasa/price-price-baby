
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MarketChangesForm } from "./MarketChangesForm";

interface EditMarketDialogProps {
  competitorPrices: "increased" | "decreased" | "mixed" | "unchanged" | null;
  onCompetitorPricesChange: (value: "increased" | "decreased" | "mixed" | "unchanged") => void;
  marketDemand: "growing" | "shrinking" | "stable" | null;
  onMarketDemandChange: (value: "growing" | "shrinking" | "stable") => void;
  trigger: React.ReactNode;
}

export const EditMarketDialog = ({
  competitorPrices,
  onCompetitorPricesChange,
  marketDemand,
  onMarketDemandChange,
  trigger
}: EditMarketDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div id="edit-market-dialog">
          {trigger}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Market Conditions</DialogTitle>
        </DialogHeader>
        <MarketChangesForm
          competitorPrices={competitorPrices}
          onCompetitorPricesChange={onCompetitorPricesChange}
          marketDemand={marketDemand}
          onMarketDemandChange={onMarketDemandChange}
        />
      </DialogContent>
    </Dialog>
  );
};
