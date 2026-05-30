import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/access")({
  head: () => ({
    meta: [
      { title: "Enter Access Code — AbdelRahman Studio" },
      { name: "description", content: "Unlock your private course library with your access code." },
    ],
  }),
  component: AccessPage,
});

const VALID_CODE = "FREE2026";

function AccessPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (code.trim().toUpperCase() === VALID_CODE) {
        try { localStorage.setItem("studio_access", "1"); } catch {}
        navigate({ to: "/videos" });
      } else {
        setError(true);
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-hero)" }}>
      <SiteNav />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-10">
            <div className="relative inline-flex w-16 h-16 mb-6">
              <span className="absolute inset-0 rounded-full bg-[image:var(--gradient-primary)] blur-lg opacity-80" />
              <img src={logo} alt="AbdelRahman Studio" className="relative w-16 h-16 rounded-full object-cover ring-2 ring-primary/40" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Enter Access Code</h1>
            <p className="mt-3 text-muted-foreground text-sm">Members only. Codes are issued after verification.</p>
          </div>

          <form onSubmit={submit} className="p-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl shadow-[var(--shadow-elegant)]">
            <label htmlFor="code" className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Access Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder="XXXX-XXXX"
              autoComplete="off"
              className="w-full px-4 py-4 rounded-xl bg-input border border-border text-foreground text-center tracking-[0.4em] uppercase font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
            />
            {error && (
              <p className="mt-3 text-sm text-destructive text-center animate-fade-in">Invalid access code</p>
            )}
            <button
              type="submit"
              disabled={loading || !code}
              className="mt-6 w-full px-6 py-4 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Verifying…" : "Unlock Content"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Don't have a code? <a href="/payment" className="text-primary hover:underline">Get access</a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}