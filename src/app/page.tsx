

import { Header } from "@/components/header";
import { SkinAnalyzer } from "@/components/skin-analyzer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const FeatureSection = ({ id, title, description, bullets, mockup, reverse = false }: { id: string, title: string, description: string, bullets: { title: string, text: string }[], mockup: React.ReactNode, reverse?: boolean }) => (
  <section id={id} className="mt-[18px] py-2.5">
    <div className={`grid items-center gap-4 rounded-3xl border bg-white/70 p-5 shadow-lg backdrop-blur-sm md:grid-cols-2`}>
      <div className={`fText ${reverse ? 'md:order-2' : ''}`}>
        <h2 className="text-2xl tracking-wide">{title}</h2>
        <p className="mt-2.5 text-sm leading-relaxed text-black/70 max-w-3xl">{description}</p>
        <ul className="mt-3.5 grid gap-2.5 p-0 list-none">
          {bullets.map(bullet => (
            <li key={bullet.title} className="flex items-start gap-2.5 rounded-2xl border bg-white/70 p-3 shadow-md">
              <div className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 font-black text-blue-800">✓</div>
              <div>
                <b className="text-sm">{bullet.title}</b>
                <span className="mt-0.5 block text-xs leading-snug text-black/70">{bullet.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? 'md:order-1' : ''}>{mockup}</div>
    </div>
  </section>
);


const Mockup = ({ title, children, label }: { title: string, children: React.ReactNode, label: string }) => (
  <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-b from-white/90 to-white/70 shadow-2xl">
    <div className="flex h-12 items-center gap-2.5 border-b border-primary/10 bg-primary/5 px-3.5">
      <div className="flex gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-primary/20"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-primary/20"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-primary/20"></div>
      </div>
      <div className="text-xs font-bold text-black/70">{title}</div>
    </div>
    {children}
    <div className="absolute bottom-3 left-3 rounded-full border border-primary/10 bg-white/80 px-2.5 py-2 text-xs font-bold text-black/70 shadow-lg backdrop-blur-sm">{label}</div>
  </div>
);


export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <Header />
      <main className="mt-4">
        <section id="scan" className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <Card className="p-5 flex flex-col gap-3.5 bg-white/80 backdrop-blur-sm shadow-2xl">
              <div className="inline-flex items-center gap-2.5 w-fit rounded-full border border-primary/10 bg-primary/5 px-3 py-2 text-xs text-black/70">
                <div className="h-5 w-5 rounded-md bg-gradient-to-br from-accent to-primary shadow-lg"></div>
                <span>AI-powered skin screening • premium blue-white experience</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[46px] font-black tracking-wide leading-tight">
                Detect patterns with <span className="grad">AI skin screening</span> in seconds.
              </h1>
              <p className="text-sm text-black/70 leading-relaxed max-w-2xl">
                Upload a clear photo and get a confidence-based screening result. This is a demo UI—connect a real model later (TensorFlow.js or API).
              </p>
              <div className="flex items-center gap-2.5 flex-wrap mt-1.5">
                <Button asChild>
                  <Link href="#scan-analyzer">Start Scan</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="#instant">See How It Works</Link>
                </Button>
              </div>
              <div className="mt-2 rounded-2xl border border-primary/10 bg-white/75 p-3 text-xs text-black/70 shadow-lg">
                <b>Tip:</b> Use bright, sharp focus, and a close-up shot of the skin area. This tool is not a diagnosis.
              </div>
          </Card>
          <div id="scan-analyzer">
            <SkinAnalyzer />
          </div>
        </section>
        
        <FeatureSection
          id="instant"
          title="Instant Preview"
          description="As soon as a user uploads a photo, we show an immediate preview with a clean “medical-tech” UI. No confusion, no delays—just clarity."
          bullets={[
            { title: 'Drag & drop upload', text: 'Fast upload experience with hover states and feedback.' },
            { title: 'Instant image preview', text: 'Shows the photo instantly inside a premium glass frame.' },
            { title: 'Clear next action', text: 'The UI guides users to “Analyze with AI” without noise.' },
          ]}
          mockup={
            <Mockup title="Preview Screen (Mockup)" label="Upload → Preview instantly">
              <Image 
                src="https://picsum.photos/seed/1/900/620" 
                alt="Instant preview mockup"
                width={900}
                height={620}
                data-ai-hint="abstract image"
                className="object-cover"
              />
            </Mockup>
          }
        />
        
        <FeatureSection
          id="confidence"
          title="Confidence Results"
          description="We show the top predictions in a calm, clear way—confidence bars, labels, and explanations. It feels professional and avoids scary wording."
          bullets={[
            { title: 'Top matches', text: 'Shows 3 most likely categories (demo logic now).' },
            { title: 'Confidence bars', text: 'Visual confidence helps users understand uncertainty.' },
            { title: 'Guidance notes', text: 'Short helpful notes + safety prompts (not diagnosis).' },
          ]}
          reverse
          mockup={
             <Mockup title="Results Screen (Mockup)" label="Top 3 predictions + confidence bars">
              <Image 
                src="https://picsum.photos/seed/2/900/620" 
                alt="Confidence results mockup"
                width={900}
                height={620}
                data-ai-hint="medical tech"
                className="object-cover"
              />
            </Mockup>
          }
        />

        <FeatureSection
          id="privacy"
          title="Privacy-first"
          description="Medical products must feel safe. This landing page is designed to support privacy—clear messaging, consent-first storage, and “no storage” mode."
          bullets={[
            { title: 'No storage by default', text: 'Prototype keeps everything on device only (frontend demo).' },
            { title: 'Consent-first storage', text: 'Easy to add a checkbox before saving scans.' },
            { title: 'Clinic-ready', text: 'Add login + scan history for professional workflow.' },
          ]}
          mockup={
            <Mockup title="Privacy Screen (Mockup)" label="Consent-first + no-storage mode">
              <Image 
                src="https://picsum.photos/seed/3/900/620" 
                alt="Privacy-first mockup"
                width={900}
                height={620}
                data-ai-hint="privacy security"
                className="object-cover"
              />
            </Mockup>
          }
        />

        <section id="reviews" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <div className="text-yellow-500 flex">★★★★★</div>
                <p className="mt-2.5 text-sm text-black/90 leading-relaxed">“This landing page looks like a real medical-tech product. Clean, trustworthy, and easy to use.”</p>
                <div className="mt-3 text-xs text-black/70">— Ayesha, Product Tester</div>
            </Card>
            <div className="grid gap-2.5">
                <div className="rounded-2xl border border-primary/10 bg-white/75 p-3.5 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl">
                    <b className="text-sm">★★★★★ Premium & Clean</b>
                    <p className="mt-1.5 text-xs text-black/70 leading-snug">“Blue-white theme feels medical and modern.”</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-white/75 p-3.5 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl">
                    <b className="text-sm">★★★★★ Smooth flow</b>
                    <p className="mt-1.5 text-xs text-black/70 leading-snug">“Upload → preview → analyze → results is perfect.”</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-white/75 p-3.5 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl">
                    <b className="text-sm">★★★★☆ Trustworthy</b>
                    <p className="mt-1.5 text-xs text-black/70 leading-snug">“Privacy-first section makes it feel safe.”</p>
                </div>
            </div>
        </section>

      </main>
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl border bg-white/75 p-4 shadow-lg backdrop-blur-sm">
        <div>
          <strong className="text-sm">DermaScan AI</strong><br/>
          <small className="text-xs text-black/70">Skin screening demo • Not medical advice • Consult a dermatologist for diagnosis</small>
        </div>
        <small className="text-xs text-black/70">© {new Date().getFullYear()} DermaScan AI • Blue & White Landing Page</small>
      </footer>
    </div>
  );
}
