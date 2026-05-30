import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { getLessons, useStudioStore } from "@/lib/studio-store";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Studio Library — AbdelRahman Studio" },
      { name: "description", content: "Private video lessons on web design, web development, graphic design, and branding mastery." },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const lessons = useStudioStore(getLessons);

  useEffect(() => {
    try {
      if (
        localStorage.getItem("studio_access") === "1" ||
        localStorage.getItem("lumen_access") === "1"
      ) setAllowed(true);
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
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Studio Library</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Your Masterclasses</h1>
            <p className="mt-4 text-muted-foreground">Web design, web development, graphic design, and branding — seven chapters to build real skills.</p>
          </div>

          <div className="space-y-12">
            {lessons.map((lesson, i) => (
              <article key={lesson.id + i} className="animate-fade-in">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{lesson.title}</h2>
                <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-card/40 shadow-[var(--shadow-elegant)] aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
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