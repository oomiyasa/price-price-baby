
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PerformanceForm } from "./PerformanceForm";
import { SalesPerformance } from "@/types/repricing";

interface EditSalesDialogProps {
  salesPerformance: SalesPerformance;
  onSalesPerformanceChange: (value: SalesPerformance) => void;
  trigger: React.ReactNode;
}

export const EditSalesDialog = ({
  salesPerformance,
  onSalesPerformanceChange,
  trigger
}: EditSalesDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Sales Performance</DialogTitle>
        </DialogHeader>
        <PerformanceForm
          salesPerformance={salesPerformance}
          onSalesPerformanceChange={onSalesPerformanceChange}
        />
      </DialogContent>
    </Dialog>
  );
};
