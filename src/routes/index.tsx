import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Private Learning Platform" },
      { name: "description", content: "Exclusive video-based learning experience. Cinematic, focused, and crafted for serious learners." },
      { property: "og:title", content: "Lumen — Private Learning Platform" },
      { property: "og:description", content: "Exclusive video-based learning experience." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <SiteNav />
      <main className="pt-32">
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center relative">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40 pointer-events-none">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/30" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/40 backdrop-blur text-xs text-muted-foreground mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
            Invitation-only access · 2026 cohort
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] animate-fade-in">
            Private Learning
            <br />
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">Platform</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Exclusive video-based learning experience. No noise, no fluff — just deep, cinematic lessons crafted for serious learners.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <Link
              to="/access"
              className="px-8 py-4 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
            >
              Enter Course
            </Link>
            <Link
              to="/payment"
              className="px-8 py-4 rounded-full border border-border/60 bg-card/40 backdrop-blur text-foreground font-medium hover:bg-card/70 transition-colors"
            >
              Get Access
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">A different kind of course</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Built around clarity and depth. Every lesson is hand-produced, distraction-free, and accessible only to verified members.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Cinematic Lessons", d: "Studio-grade video production designed to keep you in deep focus from start to finish." },
              { t: "Private Access", d: "Manually verified members only. No leaks, no public listings, no algorithm." },
              { t: "Lifetime Library", d: "Pay once, watch forever. New lessons added throughout the cohort." },
            ].map((f, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-[var(--transition-smooth)] hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[image:var(--gradient-primary)] mb-6 shadow-[var(--shadow-glow)] group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{f.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
