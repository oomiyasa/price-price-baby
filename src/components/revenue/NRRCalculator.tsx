
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { calculateNRR } from "./utils/calculations";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  startingRevenue: z.string().min(1, {
    message: "Starting Revenue is required."
  }),
  churnedRevenue: z.string().min(1, {
    message: "Churned Revenue is required."
  }),
  expansionRevenue: z.string().min(1, {
    message: "Expansion Revenue is required."
  }),
});

export function NRRCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [nrrResult, setNrrResult] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startingRevenue: "",
      churnedRevenue: "",
      expansionRevenue: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCalculating(true);
    try {
      const startingRevenue = parseFloat(values.startingRevenue);
      const churnedRevenue = parseFloat(values.churnedRevenue);
      const expansionRevenue = parseFloat(values.expansionRevenue);

      if (isNaN(startingRevenue) || isNaN(churnedRevenue) || isNaN(expansionRevenue)) {
        throw new Error("Please enter valid numbers for all fields");
      }

      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const nrr = calculateNRR(startingRevenue, expansionRevenue, churnedRevenue);
      setNrrResult(nrr);
      
      toast({
        title: "Calculation Complete",
        description: `Your Net Revenue Retention (NRR) is ${nrr.toFixed(1)}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to calculate NRR",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
            Net Revenue Retention Calculator
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="startingRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Revenue</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter starting revenue" {...field} />
                    </FormControl>
                    <FormDescription>
                      The total revenue at the beginning of the period.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="churnedRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Churned Revenue</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter churned revenue" {...field} />
                    </FormControl>
                    <FormDescription>
                      The amount of revenue lost due to churn.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expansionRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expansion Revenue</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter expansion revenue" {...field} />
                    </FormControl>
                    <FormDescription>
                      The amount of revenue gained from existing customers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6">
                {isCalculating ? (
                  <LoadingSpinner className="my-4" />
                ) : (
                  <>
                    <button
                      type="submit"
                      className="w-full bg-[#8B8B73] text-white py-2 px-4 rounded hover:bg-[#6B6B5F] transition-colors"
                    >
                      Calculate NRR
                    </button>
                    {nrrResult !== null && (
                      <div className="mt-4 p-4 bg-[#F5F5F0] rounded">
                        <p className="text-center text-lg font-medium text-[#4A4A3F]">
                          Net Revenue Retention (NRR): {nrrResult.toFixed(1)}%
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
