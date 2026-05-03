import { ArrowRight, Sparkles, Search } from 'lucide-react';

export function Hero() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.10),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_35%)]" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI itineraries, simplified.
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Plan your next trip with clarity, not clutter.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Triply-AI creates clean, personalized travel plans for your budget, days, and interests so you can spend less time organizing and more time going.
              </p>
            </div>

            <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Where are you going next?"
                  className="h-12 w-full rounded-2xl border border-border bg-card/80 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <a
                href="/itinerary"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Create trip
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-border bg-card/70 px-3 py-1.5">Fast planning</span>
              <span className="rounded-full border border-border bg-card/70 px-3 py-1.5">Budget aware</span>
              <span className="rounded-full border border-border bg-card/70 px-3 py-1.5">Minimal UI</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 translate-x-8 translate-y-8 rounded-[2rem] bg-primary/10 blur-3xl" />
            <div className="rounded-[2rem] border border-border bg-card/90 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl md:p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Trip snapshot</p>
                  <h2 className="mt-1 text-lg font-semibold text-foreground">Mumbai, 4 days</h2>
                </div>
                <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  Live preview
                </div>
              </div>

              <div className="space-y-4 pt-5">
                {[
                  ['Day 1', 'Arrival, seaside walk, dinner near Colaba'],
                  ['Day 2', 'Cafes, art district, sunset at Marine Drive'],
                  ['Day 3', 'Markets, local food, architecture trail'],
                ].map(([label, detail]) => (
                  <div key={label} className="flex items-start gap-4 rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="rounded-xl bg-primary/15 px-3 py-2 text-xs font-semibold text-primary">
                      {label}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
