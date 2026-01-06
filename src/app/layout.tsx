import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DermaScan AI - AI Skin Disease Detector',
  description: 'Upload an image of a skin condition for an AI-powered analysis. For informational purposes only.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} antialiased h-full text-[#0B1B3A] overflow-x-hidden`}>
        <div className="fixed inset-[-20%] -z-10 pointer-events-none opacity-85 blur-[46px]">
          <div className="absolute left-[4%] top-[2%] h-[560px] w-[560px] animate-[floaty_14s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(224,76%,52%,0.3),transparent)]"></div>
          <div className="absolute left-[58%] top-[0%] h-[720px] w-[720px] animate-[floaty_18s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_40%_40%,hsl(202,90%,54%,0.26),transparent)]"></div>
          <div className="absolute left-[10%] top-[55%] h-[740px] w-[740px] animate-[floaty_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_40%_40%,hsl(225,78%,57%,0.22),transparent)]"></div>
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
