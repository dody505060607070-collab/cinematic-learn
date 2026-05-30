import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/50 border-b border-border/40"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="relative inline-flex items-center justify-center w-10 h-10">
            <span className="absolute inset-0 rounded-full bg-[image:var(--gradient-primary)] blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            <img
              src={logo}
              alt="AbdelRahman Studio"
              className="relative w-10 h-10 rounded-full object-cover ring-1 ring-primary/40 group-hover:scale-110 transition-transform"
            />
          </span>
          <span className="font-semibold tracking-tight text-foreground leading-none">
            AbdelRahman<span className="text-primary"> Studio</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/payment" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
          <Link to="/access" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Access</Link>
          <a href="https://abdelrahman-studi0.lovable.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Portfolio</a>
        </div>
        <Link
          to="/access"
          className="px-4 py-2 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-sm font-medium shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
        >
          Enter
        </Link>
      </nav>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AbdelRahman Studio. All rights reserved.</p>
        <a href="https://abdelrahman-studi0.lovable.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Portfolio</a>
      </div>
    </footer>
  );
}