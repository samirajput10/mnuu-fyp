import Link from "next/link";
import { Logo } from "./icons";

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Logo className="h-8 w-8" />
          <span>DermAI</span>
        </Link>
      </div>
    </header>
  );
}
