"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Link, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSkinImage } from "@/app/actions";
import type { GenerateImageAnalysisOutput } from "@/ai/flows/generate-image-analysis";
import { AnalysisResults } from "./analysis-results";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

type FormState = {
  data: GenerateImageAnalysisOutput | null;
  error: string | null;
};

const initialState: FormState = { data: null, error: null };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const [formState, formAction, pending] = useActionState(analyzeSkinImage, initialState);
  return (
    <Button type="submit" disabled={pending || disabled} className="font-black">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Analyze with AI
    </Button>
  );
}

export function SkinAnalyzer() {
  const [formState, formAction, pending] = useActionState(analyzeSkinImage, initialState);
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GenerateImageAnalysisOutput | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusTitle, setStatusTitle] = useState("Image Loaded");
  const [statusSub, setStatusSub] = useState("Click “Analyze” to run AI screening.");


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

  const useDemoImage = async () => {
    const demoUrl = "https://images.unsplash.com/photo-1621578634247-a8435b7e9f33?q=80&w=2070&auto=format&fit=crop";
    setStatusTitle("Loading Demo...");
    setStatusSub("Fetching sample image...");
    setProgress(50); // Show some progress
    try {
        const response = await fetch(demoUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            setImagePreview(base64data);
            setAnalysisResult(null);
            setStatusTitle("Image Loaded");
            setStatusSub(`demo-sample.jpg • ready to analyze`);
            setProgress(0);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error("Failed to fetch demo image", error);
        toast({
            variant: "destructive",
            title: "Failed to load demo",
            description: "Could not fetch the sample image. Please check your connection."
        });
        setStatusTitle("Ready");
        setStatusSub("Upload an image to begin.");
        setProgress(0);
    }
  };
  
  const handleUrlLoad = async () => {
    if (!imageUrl || !imageUrl.startsWith('http')) {
        toast({
            variant: "destructive",
            title: "Invalid URL",
            description: "Please enter a valid image URL.",
        });
        return;
    }
    setStatusTitle("Loading Image from URL...");
    setStatusSub("Fetching image from the web...");
    setProgress(50);
    try {
        // We need to use a CORS proxy to fetch images from other domains
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`);
        if (!response.ok) throw new Error(`Failed to fetch image. Status: ${response.status}`);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            setImagePreview(base64data);
            setAnalysisResult(null);
            setStatusTitle("Image Loaded");
            setStatusSub(`image-from-url.jpg • ready to analyze`);
            setProgress(0);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error("Failed to fetch image from URL", error);
        toast({
            variant: "destructive",
            title: "Failed to load from URL",
            description: "Could not fetch the image. Please check the URL and your connection."
        });
        setStatusTitle("Ready");
        setStatusSub("Upload an image to begin.");
        setProgress(0);
    }
  };

  const handleAnalysis = (formData: FormData) => {
    setAnalysisResult(null);
    setProgress(0);
    setStatusTitle("Analyzing...");
    setStatusSub("Running AI screening...");
    
    let currentProgress = 0;
    const intervals = [
      { p: 35, t: 450 },
      { p: 72, t: 700 },
      { p: 92, t: 650 },
    ];
    
    let isDone = false;

    const updateProgress = (target: number, duration: number) => {
      return new Promise<void>(resolve => {
        const start = currentProgress;
        const startTime = Date.now();
        const animate = () => {
          if (isDone) return;
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
      });
    };

    const runProgressAnimation = async () => {
      for(const interval of intervals) {
        await updateProgress(interval.p, interval.t)
      }
      while(!isDone) {
        await updateProgress(98, 1500);
        if (isDone) break;
        await updateProgress(92, 1500);
      }
    };
    
    runProgressAnimation();
    
    formAction(formData);

    const onDone = () => {
        isDone = true;
        setProgress(100);
    };

    if (pending) {
        // The action is still pending, so we wait for it to complete.
        // This is a bit of a hack since useActionState doesn't give us a promise.
        const checkCompletion = setInterval(() => {
            if (!pending) {
                onDone();
                clearInterval(checkCompletion);
            }
        }, 100);
    } else {
        // The action completed synchronously
        onDone();
    }
  };


  return (
    <Card className="h-full w-full bg-white/80 p-4 shadow-2xl backdrop-blur-sm flex flex-col gap-3.5">
      {!imagePreview ? (
        <div className="flex flex-col gap-3.5 h-full">
          <form onDragEnter={handleDrag} className="h-full">
            <label
              htmlFor="dropzone-file"
              className={cn(
                "flex flex-col items-center justify-center w-full min-h-[200px] h-full gap-3 rounded-2xl border border-dashed border-primary/25 bg-white/75 p-4 shadow-inner transition-all",
                dragActive ? "-translate-y-1 border-accent/70 bg-accent/10 shadow-lg" : ""
              )}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-black/80 shadow-lg">
                <UploadCloud className="h-7 w-7 opacity-90" />
              </div>

              <h3 className="text-base font-bold">Upload Skin Photo</h3>
              <p className="text-center text-xs text-black/70">Drag & drop or browse an image.<br/>(JPG/PNG/WebP)</p>
              
              <div className="flex items-center justify-center gap-2.5 mt-2">
                 <Button type="button" onClick={() => inputRef.current?.click()} className="font-black">
                   <ImageIcon className="h-4 w-4 mr-2" /> Browse
                  </Button>
                <Button type="button" variant="secondary" onClick={useDemoImage} className="font-black">Use Demo</Button>
              </div>

              <input ref={inputRef} id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleChange} />
            </label>
             {dragActive && <div className="absolute inset-0 w-full h-full" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
          </form>

           <div className="flex items-center gap-2">
              <Input 
                type="text" 
                placeholder="Or paste image URL..." 
                className="bg-white/80" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button type="button" onClick={handleUrlLoad} className="font-black flex-shrink-0">
                <Link className="h-4 w-4 mr-2" /> Load
              </Button>
            </div>
          
          <div className="flex items-start gap-2.5 rounded-2xl border border-primary/10 bg-primary/5 p-3">
              <div className="mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-black text-primary">i</div>
              <span className="text-xs text-black/75 leading-snug">
                <b>Important:</b> Screening only. If symptoms are severe, spreading, painful, bleeding, infected, or fever — consult a dermatologist.
              </span>
          </div>
        </div>
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
    </Card>
  );
}
