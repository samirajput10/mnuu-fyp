"use client";

import type { GenerateImageAnalysisOutput } from "@/ai/flows/generate-image-analysis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type AnalysisResultsProps = {
  results: GenerateImageAnalysisOutput["analysisResults"];
};

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const sortedResults = [...results].sort((a, b) => b.confidence - a.confidence);

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.7) return "bg-green-500";
    if (confidence > 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getBadgeVariant = (index: number) => {
    if (index === 0) return "default";
    return "secondary";
  };

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-500">
      <h3 className="text-2xl font-bold tracking-tight text-primary">Analysis Complete</h3>
      {sortedResults.length > 0 ? (
        <Accordion type="single" collapsible defaultValue={sortedResults.length > 0 ? sortedResults[0].condition : undefined} className="w-full">
          {sortedResults.map((result, index) => (
            <AccordionItem value={result.condition} key={result.condition}>
              <AccordionTrigger>
                <div className="flex-1 text-left space-y-2">
                  <div className="flex items-center gap-2">
                     {index === 0 && <Badge>Top Match</Badge>}
                     <p className="font-semibold">{result.condition}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={result.confidence * 100}
                      className="w-full max-w-[150px] h-2"
                      indicatorClassName={getConfidenceColor(result.confidence)}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {(result.confidence * 100).toFixed(0)}% Confidence
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <p className="text-muted-foreground">{result.reasoning}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-8">
            <p className="font-semibold">No Clear Match Found</p>
            <p className="text-muted-foreground mt-2">The AI could not identify potential conditions with sufficient confidence. This may be due to image quality or other factors.</p>
        </div>
      )}
    </div>
  );
}
