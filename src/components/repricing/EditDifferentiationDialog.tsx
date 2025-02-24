
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DifferentiationForm } from "./DifferentiationForm";

interface EditDifferentiationDialogProps {
  uniqueness: "low" | "medium" | "high";
  onUniquenessChange: (value: "low" | "medium" | "high") => void;
  valuePerception: number;
  onValuePerceptionChange: (value: number) => void;
  trigger: React.ReactNode;
}

export const EditDifferentiationDialog = ({
  uniqueness,
  onUniquenessChange,
  valuePerception,
  onValuePerceptionChange,
  trigger
}: EditDifferentiationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div id="edit-differentiation-dialog">
          {trigger}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Market Positioning</DialogTitle>
        </DialogHeader>
        <DifferentiationForm
          uniqueness={uniqueness}
          onUniquenessChange={onUniquenessChange}
          valuePerception={valuePerception}
          onValuePerceptionChange={onValuePerceptionChange}
        />
      </DialogContent>
    </Dialog>
  );
};
