import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AbdelRahman Studio — Learn Design, Dev & Branding" },
      { name: "description", content: "Private masterclasses on web design, web development, graphic design, and branding. Learn how to build a brand and make it successful." },
      { property: "og:title", content: "AbdelRahman Studio" },
      { property: "og:description", content: "Private creative masterclasses. Invitation only." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.07] mix-blend-overlay" />
      <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-secondary/30 blur-3xl animate-orb-drift" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-primary/25 blur-3xl animate-orb-drift" style={{ animationDelay: "-6s" }} />
      <SiteNav />
      <main className="pt-32 relative">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-32 text-center relative">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mb-10 w-40 h-40 md:w-48 md:h-48"
          >
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,oklch(0.82_0.17_75),oklch(0.74_0.2_25),oklch(0.55_0.22_305),oklch(0.82_0.17_75))] blur-2xl opacity-70 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full bg-background" />
            <div className="absolute inset-0 animate-float-slow">
              <img
                src={logo}
                alt="AbdelRahman"
                className="relative w-full h-full object-cover rounded-full ring-2 ring-primary/40 shadow-[var(--shadow-glow)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/40 backdrop-blur text-xs text-muted-foreground mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
            Invitation-only · 2026 cohort
          </motion.div>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="text-foreground">The Private</span>
            <br />
            <span className="text-shimmer">AbdelRahman Studio</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Web design, web development, graphic design, and branding — taught with depth. Learn how to build a brand from scratch and make it impossible to ignore.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/access"
              className="px-8 py-4 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
            >
              Enter Studio
            </Link>
            <Link
              to="/payment"
              className="px-8 py-4 rounded-full border border-border/60 bg-card/40 backdrop-blur text-foreground font-medium hover:bg-card/70 transition-colors"
            >
              Get Access
            </Link>
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">A different kind of studio</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Built around clarity, taste, and depth. Every lesson is hand-produced, distraction-free, and reserved for verified members.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Web Design & Dev", d: "From visual systems to shipped code. Learn how to design and build modern websites that convert." },
              { t: "Graphic Design", d: "Typography, layout, color theory, and composition — the real craft behind striking visual work." },
              { t: "Branding Mastery", d: "How to build a brand from zero, position it right, and make it stand out in any market." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[image:var(--gradient-primary)] mb-6 shadow-[var(--shadow-glow)] group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{f.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
