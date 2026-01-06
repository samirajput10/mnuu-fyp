"use client";

import React, { useState, useCallback, useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { UploadCloud, X, Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSkinImage } from "@/app/actions";
import type { GenerateImageAnalysisOutput } from "@/ai/flows/generate-image-analysis";
import { AnalysisResults } from "./analysis-results";
import { Progress } from "@/components/ui/progress";

type FormState = {
  data: GenerateImageAnalysis_Output | null;
  error: string | null;
};

const initialState: FormState = { data: null, error: null };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className="font-black">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Analyze with AI
    </Button>
  );
}

export function SkinAnalyzer() {
  const [formState, formAction] = useActionState(analyzeSkinImage, initialState);
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GenerateImageAnalysisOutput | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusTitle, setStatusTitle] = useState("Image Loaded");
  const [statusSub, setStatusSub] = useState("Click “Analyze” to run AI screening.");
  const { pending } = useFormStatus();


  useEffect(() => {
    if (formState.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: formState.error,
      });
      setStatusTitle("Analysis Failed");
      setStatusSub(formState.error);
      setProgress(0);
    }
    if (formState.data) {
      setAnalysisResult(formState.data);
      setStatusTitle("Analysis Complete");
      setStatusSub("These are demo screening results (not a diagnosis).");
      setProgress(100);
    }
  }, [formState, toast]);

  const handleFile = useCallback((file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setAnalysisResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setStatusTitle("Image Loaded");
        setStatusSub(`${file.name} • ready to analyze`);
        setProgress(0);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File",
        description: "Please upload a valid image file.",
      });
    }
  }, [toast]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setProgress(0);
    if(inputRef.current) {
        inputRef.current.value = "";
    }
    setStatusTitle("Image Loaded");
    setStatusSub("Click “Analyze” to run AI screening.");
  };

  const useDemoImage = () => {
    const demo = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#F3D7C6'/><stop offset='1' stop-color='#E3B9A1'/></linearGradient><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .25 0'/></filter></defs><rect width='1200' height='800' fill='url(#g)'/><rect width='1200' height='800' filter='url(#n)' opacity='.7'/><circle cx='720' cy='410' r='160' fill='rgba(29,78,216,.10)'/><circle cx='760' cy='430' r='80' fill='rgba(14,165,233,.10)'/></svg>`);
    setImagePreview(demo);
    setAnalysisResult(null);
    setStatusTitle("Image Loaded");
    setStatusSub(`demo-sample.svg • ready to analyze`);
    setProgress(0);
  };
  
  const handleAnalysis = (formData: FormData) => {
    setAnalysisResult(null);
    setProgress(0);
    setStatusTitle("Analyzing...");
    setStatusSub("Running AI screening...");
    
    // Animate progress
    let currentProgress = 0;
    const intervals = [
      { p: 35, t: 450 },
      { p: 72, t: 700 },
      { p: 92, t: 650 },
      { p: 100, t: 450 },
    ];
    
    let chain = Promise.resolve();
    intervals.forEach(({ p: target, t: duration }) => {
      chain = chain.then(() => new Promise(resolve => {
        const start = currentProgress;
        const startTime = Date.now();
        const animate = () => {
          const now = Date.now();
          const elapsed = now - startTime;
          const progressPoint = Math.min(1, elapsed / duration);
          const newProgress = start + (target-start) * progressPoint;
          setProgress(newProgress);
          if (progressPoint < 1) {
            requestAnimationFrame(animate);
          } else {
            currentProgress = target;
            resolve();
          }
        };
        requestAnimationFrame(animate);
      }));
    });
    
    formAction(formData);
  };


  return (
    <Card className="h-full w-full bg-white/80 p-4 shadow-2xl backdrop-blur-sm flex flex-col gap-3.5">
      {!imagePreview ? (
          <form onDragEnter={handleDrag} className="h-full">
            <label
              htmlFor="dropzone-file"
              className={cn(
                "flex flex-col items-center justify-center w-full min-h-[270px] h-full gap-3 rounded-2xl border border-dashed border-primary/25 bg-white/75 p-4 shadow-inner transition-all",
                dragActive ? "-translate-y-1 border-accent/70 bg-accent/10 shadow-lg" : ""
              )}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-black/80 shadow-lg">
                <UploadCloud className="h-7 w-7 opacity-90" />
              </div>

              <h3 className="text-base font-bold">Upload Skin Photo</h3>
              <p className="text-center text-xs text-black/70">Drag & drop an image (JPG/PNG/WebP).<br/>Preview instantly, then analyze.</p>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <Button type="button" onClick={() => inputRef.current?.click()} className="font-black">Browse Image</Button>
                <Button type="button" variant="secondary" onClick={useDemoImage} className="font-black">Use Demo</Button>
                <input ref={inputRef} id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleChange} />
              </div>
            </label>
             {dragActive && <div className="absolute inset-0 w-full h-full" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
          </form>
        ) : (
          <div className="flex flex-col gap-3">
              <div className="relative group rounded-2xl border border-primary/10 bg-white/75 overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Skin image preview"
                  width={500}
                  height={300}
                  className="w-full max-h-[300px] object-cover"
                />
                 <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between gap-2.5 rounded-2xl border border-primary/10 bg-white/75 p-3 shadow-lg">
                  <div className="flex items-center gap-2.5 min-w-0">
                      {pending && <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />}
                      <div>
                          <b className="text-sm whitespace-nowrap">{statusTitle}</b>
                          <p className="text-xs text-black/70 truncate max-w-xs">{statusSub}</p>
                      </div>
                  </div>
                  <div className="w-40 flex-shrink-0">
                    <Progress value={progress} className="h-2" indicatorClassName="bg-gradient-to-r from-accent to-primary" />
                  </div>
              </div>
            
              <div className="flex items-center justify-start gap-2.5">
                <form action={handleAnalysis}>
                    <input type="hidden" name="photoDataUri" value={imagePreview} />
                    <SubmitButton disabled={!!analysisResult} />
                </form>
                <Button variant="secondary" onClick={removeImage} className="font-black">Reset</Button>
              </div>

              {analysisResult && (
                <>
                  <AnalysisResults results={analysisResult.analysisResults} />
                  <div className="rounded-2xl border border-primary/10 bg-primary/5 p-3 text-xs text-black/80">
                     <b>Safety notice:</b> If the area is painful, rapidly spreading, bleeding, infected, or you have fever, please seek medical care. If you’re concerned, consult a dermatologist.
                  </div>
                </>
              )}
          </div>
        )}
        
        {!imagePreview && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-primary/10 bg-primary/5 p-3">
              <div className="mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-black text-primary">i</div>
              <span className="text-xs text-black/75 leading-snug">
                <b>Important:</b> Screening only. If symptoms are severe, spreading, painful, bleeding, infected, or fever — consult a dermatologist.
              </span>
          </div>
        )}
    </Card>
  );
}
