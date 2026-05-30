import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Get Access — AbdelRahman Studio" },
      { name: "description", content: "Submit your payment proof to receive manually-verified access to private masterclasses on web design, web dev, graphic design, and branding." },
      { property: "og:title", content: "Get Access — AbdelRahman Studio" },
      { property: "og:description", content: "Manual verification. Lifetime access to design, dev & branding courses." },
    ],
  }),
  component: PaymentPage,
});

const FORM_URL = "https://forms.gle/your-form-id-here";

function PaymentPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <SiteNav />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Step 01</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Get Access</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            One-time payment. Lifetime access to masterclasses on web design, web development, graphic design, and branding.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              dody505060607070@gmail.com
            </span>
          </div>

          <div className="mt-12 p-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl text-left shadow-[var(--shadow-elegant)]">
            <div className="flex items-baseline justify-between pb-6 border-b border-border/60">
              <span className="text-sm text-muted-foreground">Lifetime Membership</span>
              <span className="text-3xl font-bold text-foreground">$149<span className="text-base font-normal text-muted-foreground"> once</span></span>
            </div>
            <ol className="mt-6 space-y-4 text-sm text-foreground/90">
              <li className="flex gap-3"><span className="text-primary font-semibold">1.</span> Complete payment using the provided method.</li>
              <li className="flex gap-3"><span className="text-primary font-semibold">2.</span> Take a clear screenshot of the receipt.</li>
              <li className="flex gap-3"><span className="text-primary font-semibold">3.</span> Submit it through the secure form below.</li>
              <li className="flex gap-3"><span className="text-primary font-semibold">4.</span> Receive your access code by email within 24 hours.</li>
            </ol>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
            >
              Submit Payment Proof
            </a>
          </div>

          <div className="mt-8 p-5 rounded-xl border border-primary/20 bg-primary/5 text-sm text-muted-foreground">
            Your access will be approved manually after verification. We review every request personally to keep the community private.
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}