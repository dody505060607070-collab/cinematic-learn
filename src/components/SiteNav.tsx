import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)] group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-tight text-foreground">LUMEN</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/payment" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
          <Link to="/access" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Access</Link>
        </div>
        <Link
          to="/access"
          className="px-4 py-2 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-sm font-medium shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
        >
          Enter
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Lumen Private Learning.</p>
        <p>Crafted for serious learners.</p>
      </div>
    </footer>
  );
}