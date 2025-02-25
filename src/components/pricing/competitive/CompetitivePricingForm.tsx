
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CompetitiveAnalysis, RELATIVE_SCORE_OPTIONS } from "../types/competitive";
import { SelfAssessmentSection } from "./SelfAssessmentSection";
import { CompetitorSection } from "./CompetitorSection";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const competitorSchema = z.object({
  name: z.string().min(1, "Competitor name is required"),
  pricePerUnit: z.number().positive("Price must be positive"),
  metrics: z.object({
    productQuality: z.number().min(-2).max(2),
    serviceQuality: z.number().min(-2).max(2),
    brandEquity: z.number().min(-2).max(2),
    customerSatisfaction: z.number().min(-2).max(2),
  }),
});

const formSchema = z.object({
  selfAssessment: z.object({
    productQuality: z.number().min(1).max(7),
    serviceQuality: z.number().min(1).max(7),
    brandEquity: z.number().min(1).max(7),
    customerSatisfaction: z.number().min(1).max(7),
    pricePerUnit: z.number().positive("Price must be positive"),
  }),
  competitors: z.array(competitorSchema),
});

type CompetitivePricingFormData = z.infer<typeof formSchema>;

interface CompetitivePricingFormProps {
  onAnalysisComplete: (analysis: CompetitiveAnalysis) => void;
}

export function CompetitivePricingForm({ onAnalysisComplete }: CompetitivePricingFormProps) {
  const form = useForm<CompetitivePricingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selfAssessment: {
        productQuality: 4,
        serviceQuality: 4,
        brandEquity: 4,
        customerSatisfaction: 4,
        pricePerUnit: 0,
      },
      competitors: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "competitors",
  });

  function onSubmit(data: CompetitivePricingFormData) {
    // Since we've validated the data with Zod, we can safely assert it matches our CompetitiveAnalysis type
    const analysis: CompetitiveAnalysis = {
      selfAssessment: {
        productQuality: data.selfAssessment.productQuality,
        serviceQuality: data.selfAssessment.serviceQuality,
        brandEquity: data.selfAssessment.brandEquity,
        customerSatisfaction: data.selfAssessment.customerSatisfaction,
        pricePerUnit: data.selfAssessment.pricePerUnit,
      },
      competitors: data.competitors.map(competitor => ({
        name: competitor.name,
        pricePerUnit: competitor.pricePerUnit,
        metrics: {
          productQuality: competitor.metrics.productQuality,
          serviceQuality: competitor.metrics.serviceQuality,
          brandEquity: competitor.metrics.brandEquity,
          customerSatisfaction: competitor.metrics.customerSatisfaction,
        },
      })),
    };
    onAnalysisComplete(analysis);
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SelfAssessmentSection control={form.control} />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#4A4A3F]">Competitors</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      name: "",
                      pricePerUnit: 0,
                      metrics: {
                        productQuality: 0,
                        serviceQuality: 0,
                        brandEquity: 0,
                        customerSatisfaction: 0,
                      },
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Competitor
                </Button>
              </div>

              {fields.map((field, index) => (
                <CompetitorSection
                  key={field.id}
                  control={form.control}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Analyze Competition
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
