import Link from "next/link";
import { Logo } from "./icons";

export function Header() {
  return (
    <header className="sticky top-3.5 z-50 rounded-full border bg-white/70 p-3 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-accent to-primary shadow-lg">
            <div className="animate-[shimmer_6s_ease-in-out_infinite] absolute inset-[-40%] opacity-35" style={{transform: 'translateX(-10%) rotate(25deg)'}}>
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),transparent_45%)]" />
            </div>
          </div>
          <div>
            <strong className="block text-sm font-bold tracking-wide">Mainsoor character</strong>
            <small className="block max-w-[48vw] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-black/70">
              Blue & White Medical-Tech Landing Page • Upload • Preview • Confidence • Privacy
            </small>
          </div>
        </Link>
        <nav className="hidden items-center justify-end gap-2 lg:flex">
            <Link href="#scan" className="rounded-full border border-transparent px-2.5 py-2 text-xs text-black/75 transition-all hover:-translate-y-px hover:border-primary/20 hover:bg-primary/5 hover:text-black">Scanner</Link>
            <Link href="#instant" className="rounded-full border border-transparent px-2.5 py-2 text-xs text-black/75 transition-all hover:-translate-y-px hover:border-primary/20 hover:bg-primary/5 hover:text-black">Instant Preview</Link>
            <Link href="#confidence" className="rounded-full border border-transparent px-2.5 py-2 text-xs text-black/75 transition-all hover:-translate-y-px hover:border-primary/20 hover:bg-primary/5 hover:text-black">Confidence Results</Link>
            <Link href="#privacy" className="rounded-full border border-transparent px-2.5 py-2 text-xs text-black/75 transition-all hover:-translate-y-px hover:border-primary/20 hover:bg-primary/5 hover:text-black">Privacy-first</Link>
            <Link href="#reviews" className="rounded-full border border-transparent px-2.5 py-2 text-xs text-black/75 transition-all hover:-translate-y-px hover:border-primary/20 hover:bg-primary/5 hover:text-black">Reviews</Link>
        </nav>
      </div>
    </header>
  );
}
