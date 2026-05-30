import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import {
  addCode,
  deleteCode,
  deleteRequest,
  getCodes,
  getLessons,
  getRequests,
  isAdmin,
  loginAdmin,
  logoutAdmin,
  setLessons,
  toggleCode,
  updateRequest,
  useStudioStore,
  type Lesson,
} from "@/lib/studio-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control — AbdelRahman Studio" },
      { name: "description", content: "Admin control panel for AbdelRahman Studio." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab = "requests" | "codes" | "videos" | "settings";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState<Tab>("requests");

  useEffect(() => { setAuthed(isAdmin()); }, []);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pw)) { setAuthed(true); setErr(false); }
    else setErr(true);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-hero)" }}>
        <SiteNav />
        <main className="flex-1 flex items-center justify-center px-6 py-32">
          <form onSubmit={onLogin} className="w-full max-w-md p-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl shadow-[var(--shadow-elegant)] animate-fade-in">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 text-center">Admin</p>
            <h1 className="text-2xl font-bold text-foreground text-center">Control Panel</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">Restricted area. Sign in to continue.</p>
            <label className="block mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(false); }}
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
              placeholder="••••••••"
            />
            {err && <p className="mt-3 text-sm text-destructive text-center">Wrong password</p>}
            <button type="submit" className="mt-6 w-full px-6 py-3 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform">Sign in</button>
          </form>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <SiteNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Admin</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Control Panel</h1>
            </div>
            <button onClick={() => { logoutAdmin(); setAuthed(false); }} className="px-4 py-2 rounded-full border border-border/60 bg-card/40 text-sm text-foreground hover:bg-card/70 transition">Sign out</button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-xl w-fit">
            {([
              { k: "requests", label: "Requests" },
              { k: "codes", label: "Access Codes" },
              { k: "videos", label: "Videos" },
              { k: "settings", label: "Settings" },
            ] as { k: Tab; label: string }[]).map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${tab === t.k ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {tab === "requests" && <RequestsTab />}
            {tab === "codes" && <CodesTab />}
            {tab === "videos" && <VideosTab />}
            {tab === "settings" && <SettingsTab />}
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="p-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function RequestsTab() {
  const requests = useStudioStore(getRequests);
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;

  const approve = (id: string) => {
    const code = addCode("Issued from request").code;
    updateRequest(id, { status: "approved", code });
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-4">
        <StatCard label="Total" value={requests.length} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="Approved" value={approved} />
        <StatCard label="Rejected" value={rejected} />
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl overflow-hidden">
        {requests.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">No payment requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-[0.18em] text-muted-foreground bg-background/30">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Method</th>
                  <th className="text-left p-4">Reference</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Code</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="border-t border-border/40">
                    <td className="p-4 text-foreground font-medium">{r.name}</td>
                    <td className="p-4 text-muted-foreground">{r.email}</td>
                    <td className="p-4 text-muted-foreground">{r.method}</td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">{r.reference}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        r.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : r.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-destructive/10 text-destructive border-destructive/30"
                      }`}>{r.status}</span>
                    </td>
                    <td className="p-4 font-mono text-xs text-primary">{r.code ?? "—"}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        {r.status === "pending" && (
                          <>
                            <button onClick={() => approve(r.id)} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition">Approve</button>
                            <button onClick={() => updateRequest(r.id, { status: "rejected" })} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/60 text-foreground hover:bg-card/70 transition">Reject</button>
                          </>
                        )}
                        <button onClick={() => { if (confirm("Delete request?")) deleteRequest(r.id); }} className="px-3 py-1.5 rounded-full text-xs font-medium border border-destructive/40 text-destructive hover:bg-destructive/10 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CodesTab() {
  const codes = useStudioStore(getCodes);
  const [label, setLabel] = useState("");
  const [last, setLast] = useState<string | null>(null);

  const create = () => {
    const c = addCode(label || undefined);
    setLast(c.code);
    setLabel("");
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Label (optional)</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Sarah · Jan 2026" className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
        </div>
        <button onClick={create} className="px-6 py-3 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform">+ Generate Code</button>
      </div>

      {last && (
        <div className="p-5 rounded-xl border border-primary/30 bg-primary/10 text-foreground flex items-center justify-between gap-3 flex-wrap">
          <span>New code: <span className="font-mono text-lg text-primary">{last}</span></span>
          <button onClick={() => navigator.clipboard?.writeText(last)} className="px-3 py-1.5 rounded-full text-xs font-medium border border-primary/40 text-primary hover:bg-primary/20 transition">Copy</button>
        </div>
      )}

      <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl overflow-hidden">
        {codes.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">No access codes yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-[0.18em] text-muted-foreground bg-background/30">
                <tr>
                  <th className="text-left p-4">Code</th>
                  <th className="text-left p-4">Label</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((c) => (
                  <tr key={c.code} className="border-t border-border/40">
                    <td className="p-4 font-mono text-primary">{c.code}</td>
                    <td className="p-4 text-muted-foreground">{c.label ?? "—"}</td>
                    <td className="p-4 text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${c.active ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-muted/20 text-muted-foreground border-border/60"}`}>{c.active ? "Active" : "Disabled"}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => navigator.clipboard?.writeText(c.code)} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/60 text-foreground hover:bg-card/70 transition">Copy</button>
                        <button onClick={() => toggleCode(c.code)} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/60 text-foreground hover:bg-card/70 transition">{c.active ? "Disable" : "Enable"}</button>
                        <button onClick={() => { if (confirm("Delete code?")) deleteCode(c.code); }} className="px-3 py-1.5 rounded-full text-xs font-medium border border-destructive/40 text-destructive hover:bg-destructive/10 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function VideosTab() {
  const lessons = useStudioStore(getLessons);
  const [draft, setDraft] = useState<Lesson[]>(lessons);
  const [dirty, setDirty] = useState(false);

  useEffect(() => { setDraft(lessons); setDirty(false); }, [lessons]);

  const update = (i: number, patch: Partial<Lesson>) => {
    const next = draft.map((l, idx) => (idx === i ? { ...l, ...patch } : l));
    setDraft(next); setDirty(true);
  };
  const remove = (i: number) => { setDraft(draft.filter((_, idx) => idx !== i)); setDirty(true); };
  const add = () => { setDraft([...draft, { id: crypto.randomUUID(), title: "New lesson", youtubeId: "" }]); setDirty(true); };
  const save = () => { setLessons(draft); setDirty(false); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">Edit titles and YouTube video IDs. Members see this list on /videos.</p>
        <div className="flex gap-2">
          <button onClick={add} className="px-4 py-2 rounded-full border border-border/60 text-sm text-foreground hover:bg-card/70 transition">+ Add lesson</button>
          <button onClick={save} disabled={!dirty} className="px-5 py-2 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-sm font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100">Save changes</button>
        </div>
      </div>
      <div className="space-y-3">
        {draft.map((l, i) => (
          <div key={l.id} className="p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-xl grid md:grid-cols-[1fr_220px_auto] gap-3 items-center">
            <input value={l.title} onChange={(e) => update(i, { title: e.target.value })} className="px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
            <input value={l.youtubeId} onChange={(e) => update(i, { youtubeId: e.target.value })} placeholder="YouTube ID" className="px-3 py-2 rounded-lg bg-input border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
            <button onClick={() => remove(i)} className="px-3 py-2 rounded-lg border border-destructive/40 text-destructive text-sm hover:bg-destructive/10 transition">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl space-y-3 text-sm">
        <h3 className="text-foreground font-semibold">Receiving channels</h3>
        <p className="text-muted-foreground">Admin email: <span className="text-foreground">dody505060607070@gmail.com</span></p>
        <p className="text-muted-foreground">InstaPay / Vodafone Cash: <span className="text-foreground">+20 122 164 1717</span></p>
        <p className="text-muted-foreground">Payoneer ID: <span className="text-foreground">78973085</span></p>
        <p className="text-muted-foreground">WhatsApp for screenshots: <span className="text-foreground">+20 122 257 6172</span></p>
      </div>
      <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-sm text-muted-foreground">
        <p>⚠️ Data is stored locally in this browser only. To make it shared across users and devices, enable Lovable Cloud.</p>
      </div>
    </div>
  );
}