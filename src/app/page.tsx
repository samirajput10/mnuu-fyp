import { Header } from "@/components/header";
import { SkinAnalyzer } from "@/components/skin-analyzer";
import { Disclaimer } from "@/components/disclaimer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            AI-Powered Skin Health Screening
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Upload an image to get an instant, AI-driven analysis of potential skin conditions.
          </p>
        </div>
        
        <SkinAnalyzer />
        
        <div className="mt-12 max-w-4xl mx-auto">
          <Disclaimer />
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DermAI. All rights reserved.
      </footer>
    </div>
  );
}
