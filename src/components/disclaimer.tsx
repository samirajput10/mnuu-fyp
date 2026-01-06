"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
      <ShieldAlert className="h-4 w-4 !text-destructive" />
      <AlertTitle className="font-bold">Important Safety Information</AlertTitle>
      <AlertDescription className="!text-destructive/90">
        DermAI is an AI-powered screening tool for informational purposes only. It is <span className="font-semibold">not a diagnostic tool</span> and does not replace a consultation with a qualified healthcare professional. Always seek the advice of your physician for any medical concerns.
      </AlertDescription>
    </Alert>
  );
}
