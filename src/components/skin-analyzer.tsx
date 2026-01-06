"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { UploadCloud, X, Loader2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSkinImage } from "@/app/actions";
import type { GenerateImageAnalysisOutput } from "@/ai/flows/generate-image-analysis";
import { AnalysisResults } from "./analysis-results";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormState = {
  data: GenerateImageAnalysisOutput | null;
  error: string | null;
};

const initialState: FormState = { data: null, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Analyze Skin Image"
      )}
    </Button>
  );
}

export function SkinAnalyzer() {
  const [formState, formAction] = useFormState(analyzeSkinImage, initialState);
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GenerateImageAnalysisOutput | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formState.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: formState.error,
      });
    }
    if (formState.data) {
      setAnalysisResult(formState.data);
    }
  }, [formState, toast]);

  const handleFile = useCallback((file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setAnalysisResult(null); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
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
    if(inputRef.current) {
        inputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
      <CardContent className="p-0">
        {!imagePreview ? (
          <form onDragEnter={handleDrag} className="h-full">
            <label
              htmlFor="dropzone-file"
              className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors",
                dragActive ? "border-primary bg-accent" : "border-border"
              )}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 mb-4 text-primary" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input ref={inputRef} id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleChange} />
            </label>
             {dragActive && <div className="absolute inset-0 w-full h-full" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
          </form>
        ) : (
          <div className="grid md:grid-cols-2 min-h-[24rem]">
            <div className="relative group bg-muted p-4 flex items-center justify-center">
              <Image
                src={imagePreview}
                alt="Skin image preview"
                width={400}
                height={400}
                className="object-contain max-h-full max-w-full rounded-md shadow-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
            <div className="p-6 flex flex-col justify-center">
              {analysisResult ? (
                <AnalysisResults results={analysisResult.analysisResults} />
              ) : (
                <div className="text-center space-y-6">
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Ready for Analysis</AlertTitle>
                        <AlertDescription>
                            Your image is ready. Click the button below to start the AI-powered screening.
                        </AlertDescription>
                    </Alert>
                    <form action={formAction}>
                        <input type="hidden" name="photoDataUri" value={imagePreview} />
                        <SubmitButton />
                    </form>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
