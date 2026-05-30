import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Course Library — Lumen" },
      { name: "description", content: "Your private video lessons." },
    ],
  }),
  component: VideosPage,
});

const LESSONS = [
  { title: "01 · Foundations & Mindset", id: "dQw4w9WgXcQ" },
  { title: "02 · The First Principles", id: "5qap5aO4i9A" },
  { title: "03 · Building the System", id: "jfKfPfyJRdk" },
  { title: "04 · Strategy in Practice", id: "9bZkp7q19f0" },
  { title: "05 · Advanced Techniques", id: "kXYiU_JCYtU" },
  { title: "06 · Scaling Your Craft", id: "hTWKbfoikeg" },
  { title: "07 · Final Masterclass", id: "ZbZSe6N_BXs" },
];

function VideosPage() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("lumen_access") === "1") setAllowed(true);
      else navigate({ to: "/access" });
    } catch {
      navigate({ to: "/access" });
    }
  }, [navigate]);

  if (!allowed) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <SiteNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Course Library</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Your Lessons</h1>
            <p className="mt-4 text-muted-foreground">Seven cinematic chapters. Watch in order or jump anywhere.</p>
          </div>

          <div className="space-y-12">
            {LESSONS.map((lesson, i) => (
              <article key={lesson.id + i} className="animate-fade-in">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{lesson.title}</h2>
                <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-card/40 shadow-[var(--shadow-elegant)] aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${lesson.id}`}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to home</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}