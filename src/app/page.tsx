
import { Header } from "@/components/header";
import { SkinAnalyzer } from "@/components/skin-analyzer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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


const Mockup = ({ title, svg, label }: { title: string, svg: React.ReactNode, label: string }) => (
  <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-b from-white/90 to-white/70 shadow-2xl">
    <div className="flex h-12 items-center gap-2.5 border-b border-primary/10 bg-primary/5 px-3.5">
      <div className="flex gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-primary/20"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-primary/20"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-primary/20"></div>
      </div>
      <div className="text-xs font-bold text-black/70">{title}</div>
    </div>
    {svg}
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
                <b>Tip:</b> Use bright light, sharp focus, and a close-up shot of the skin area. This tool is not a diagnosis.
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
            <Mockup title="Preview Screen (Mockup)" label="Upload → Preview instantly" svg={
              <svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="m1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAF2FF"/><stop offset="1" stopColor="#FFFFFF"/></linearGradient><linearGradient id="m2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0EA5E9"/><stop offset="1" stopColor="#1D4ED8"/></linearGradient></defs><rect x="0" y="0" width="900" height="620" fill="url(#m1)"/><rect x="70" y="70" width="760" height="360" rx="28" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="90" y="90" width="720" height="320" rx="24" fill="#F3F8FF"/><rect x="110" y="110" width="680" height="280" rx="22" fill="#E9F2FF"/><rect x="70" y="458" width="500" height="86" rx="22" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="600" y="458" width="230" height="86" rx="22" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="90" y="480" width="260" height="14" rx="7" fill="#D6E6FF"/><rect x="90" y="505" width="340" height="14" rx="7" fill="#D6E6FF"/><rect x="624" y="482" width="182" height="38" rx="19" fill="url(#m2)"/><circle cx="168" cy="250" r="56" fill="#D8E9FF"/><rect x="250" y="210" width="420" height="18" rx="9" fill="#D6E6FF"/><rect x="250" y="240" width="360" height="18" rx="9" fill="#D6E6FF"/><rect x="250" y="270" width="300" height="18" rx="9" fill="#D6E6FF"/></svg>
            } />
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
             <Mockup title="Results Screen (Mockup)" label="Top 3 predictions + confidence bars" svg={
              <svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAF2FF"/><stop offset="1" stopColor="#FFFFFF"/></linearGradient><linearGradient id="r2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0EA5E9"/><stop offset="1" stopColor="#1D4ED8"/></linearGradient></defs><rect width="900" height="620" fill="url(#r1)"/><rect x="70" y="70" width="760" height="92" rx="22" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="92" y="100" width="420" height="16" rx="8" fill="#D6E6FF"/><rect x="92" y="126" width="320" height="16" rx="8" fill="#D6E6FF"/><rect x="650" y="98" width="160" height="42" rx="21" fill="url(#r2)"/><rect x="70" y="190" width="760" height="110" rx="24" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="70" y="320" width="760" height="110" rx="24" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="70" y="450" width="760" height="110" rx="24" fill="#FFFFFF" stroke="#CFE0FF"/><rect x="94" y="216" width="300" height="16" rx="8" fill="#C9DDFF"/><rect x="94" y="246" width="700" height="14" rx="7" fill="#E2EEFF"/><rect x="94" y="246" width="520" height="14" rx="7" fill="url(#r2)"/><rect x="94" y="346" width="280" height="16" rx="8" fill="#C9DDFF"/><rect x="94" y="376" width="700" height="14" rx="7" fill="#E2EEFF"/><rect x="94" y="376" width="380" height="14" rx="7" fill="url(#r2)"/><rect x="94" y="476" width="250" height="16" rx="8" fill="#C9DDFF"/><rect x="94" y="506" width="700" height="14" rx="7" fill="#E2EEFF"/><rect x="94" y="506" width="250" height="14" rx="7" fill="url(#r2)"/></svg>
            } />
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
