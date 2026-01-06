"use client";

import type { GenerateImageAnalysisOutput } from "@/ai/flows/generate-image-analysis";
import { Progress } from "@/components/ui/progress";

type AnalysisResultsProps = {
  results: GenerateImageAnalysisOutput["analysisResults"];
};

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const sortedResults = [...results].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="grid gap-2.5 animate-in fade-in-50 duration-500">
      {sortedResults.length > 0 ? (
        sortedResults.slice(0,3).map((result, index) => (
          <div key={result.condition} className="rounded-2xl border border-primary/10 bg-white/75 p-3 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl">
            <div className="flex items-center justify-between gap-2.5 mb-2">
              <b className="text-sm">{result.condition}</b>
              <span className="rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] text-black/70">
                {index === 0 ? "Top match" : index === 1 ? "Alternative" : "Another possibility"} • {(result.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={result.confidence * 100} 
              className="h-2.5"
              indicatorClassName="bg-gradient-to-r from-accent to-primary"
            />
            <p className="mt-2 text-xs text-black/70 leading-snug">{result.reasoning}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
            <p className="font-semibold">No Clear Match Found</p>
            <p className="text-muted-foreground mt-2">The AI could not identify potential conditions with sufficient confidence. This may be due to image quality or other factors.</p>
        </div>
      )}
    </div>
  );
}
