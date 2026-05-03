import { MapPin } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <span className="block text-base font-semibold tracking-wide text-foreground md:text-lg">Triply-AI</span>
            <span className="block text-xs text-muted-foreground">Minimal trip planning</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" aria-label="Open menu">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
