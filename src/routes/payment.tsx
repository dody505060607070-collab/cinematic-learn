import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { addRequest } from "@/lib/studio-store";

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

const WHATSAPP_NUMBER = "201222576172"; // screenshot submission
const RECEIVE_PHONE = "+20 122 164 1717"; // InstaPay / Vodafone Cash
const PAYONEER_ID = "78973085";
const ADMIN_EMAIL = "dody505060607070@gmail.com";

type Method = "Payoneer" | "InstaPay" | "Vodafone Cash";

function PaymentPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<Method>("InstaPay");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const waLink = (extra?: string) => {
    const msg = encodeURIComponent(
      `Hi AbdelRahman Studio 👋\nI just sent a payment via ${method}.\nName: ${name || "—"}\nEmail: ${email || "—"}\nReference: ${reference || "—"}${extra ? `\n${extra}` : ""}\n(Screenshot attached)`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const onPickFile = async (f: File | null) => {
    if (!f) { setScreenshot(null); setPreview(null); return; }
    if (!f.type.startsWith("image/")) { alert("Please upload an image file."); return; }
    if (f.size > 5 * 1024 * 1024) { alert("Image must be under 5MB."); return; }
    setScreenshot(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !reference) return;

    // Persist request (with screenshot data URL) so admin can see it.
    let dataUrl: string | undefined;
    if (screenshot) {
      dataUrl = await new Promise<string>((resolve) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.readAsDataURL(screenshot);
      });
    }
    addRequest({ name, email, method, reference, note, screenshot: dataUrl });
    setSubmitted(true);

    // Try to share the file directly to WhatsApp via the OS share sheet.
    const text = `Hi AbdelRahman Studio 👋\nI just sent a payment via ${method}.\nName: ${name}\nEmail: ${email}\nReference: ${reference}${note ? `\nNote: ${note}` : ""}`;
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean; share?: (d: ShareData) => Promise<void> };

    if (screenshot && nav.canShare && nav.canShare({ files: [screenshot] })) {
      try {
        await nav.share!({ files: [screenshot], text, title: "Payment proof" });
        setShareStatus("Shared via your device — pick WhatsApp to send to +20 122 257 6172.");
        return;
      } catch {
        // user cancelled or share failed → fall through
      }
    }

    // Fallback: copy the image to clipboard (so the user can paste in WhatsApp) + open chat.
    if (screenshot && "clipboard" in navigator && "write" in navigator.clipboard) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [screenshot.type]: screenshot }),
        ]);
        setShareStatus("Screenshot copied to clipboard — paste it (Ctrl/Cmd+V) in the WhatsApp chat that just opened.");
      } catch {
        setShareStatus("WhatsApp opened. Please attach your screenshot manually in the chat.");
      }
    } else {
      setShareStatus("WhatsApp opened. Please attach your screenshot manually in the chat.");
    }
    window.open(waLink(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <SiteNav />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto animate-fade-in">
         <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Step 01</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Get Access</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            One-time payment. Lifetime access to masterclasses on web design, web development, graphic design, and branding.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              {ADMIN_EMAIL}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              {RECEIVE_PHONE}
            </span>
          </div>
         </div>

          <div className="mt-12 p-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl text-left shadow-[var(--shadow-elegant)]">
            <div className="flex items-baseline justify-between pb-6 border-b border-border/60">
              <span className="text-sm text-muted-foreground">Lifetime Membership</span>
              <span className="text-3xl font-bold text-foreground">$3<span className="text-base font-normal text-muted-foreground"> / 150 EGP</span></span>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-sm font-semibold text-foreground">Choose a payment method:</p>

              {/* Payoneer */}
              <div className="p-5 rounded-xl border border-border/60 bg-background/40">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Payoneer</p>
                    <p className="text-xs text-muted-foreground">Send directly to my Payoneer ID</p>
                  </div>
                  <button type="button" onClick={() => copy(PAYONEER_ID, "payoneer")} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition">
                    {copied === "payoneer" ? "Copied!" : `ID: ${PAYONEER_ID} · Copy`}
                  </button>
                </div>
              </div>

              {/* InstaPay */}
              <div className="p-5 rounded-xl border border-border/60 bg-background/40">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-foreground">InstaPay</p>
                    <p className="text-xs text-muted-foreground">Send to the phone number below</p>
                  </div>
                  <button type="button" onClick={() => copy(RECEIVE_PHONE, "instapay")} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition">
                    {copied === "instapay" ? "Copied!" : `${RECEIVE_PHONE} · Copy`}
                  </button>
                </div>
              </div>

              {/* Vodafone Cash */}
              <div className="p-5 rounded-xl border border-border/60 bg-background/40">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Vodafone Cash</p>
                    <p className="text-xs text-muted-foreground">Send to the same phone number</p>
                  </div>
                  <button type="button" onClick={() => copy(RECEIVE_PHONE, "vcash")} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition">
                    {copied === "vcash" ? "Copied!" : `${RECEIVE_PHONE} · Copy`}
                  </button>
                </div>
              </div>
            </div>

            <ol className="mt-8 space-y-3 text-sm text-foreground/90 pt-6 border-t border-border/60">
              <li className="flex gap-3"><span className="text-primary font-semibold">1.</span> Pay $3 / 150 EGP via Payoneer, InstaPay, or Vodafone Cash.</li>
              <li className="flex gap-3"><span className="text-primary font-semibold">2.</span> Screenshot the receipt.</li>
              <li className="flex gap-3"><span className="text-primary font-semibold">3.</span> Fill the form below and send the screenshot on WhatsApp to <span className="text-foreground font-medium">+20 122 257 6172</span>.</li>
              <li className="flex gap-3"><span className="text-primary font-semibold">4.</span> Admin approves your request — your access code arrives by email.</li>
            </ol>

            {/* Submission form */}
            <form onSubmit={onSubmit} className="mt-8 pt-6 border-t border-border/60 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Full name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition" placeholder="you@email.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Method used</label>
                  <select value={method} onChange={(e) => setMethod(e.target.value as Method)} className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition">
                    <option>Payoneer</option>
                    <option>InstaPay</option>
                    <option>Vodafone Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Reference / your phone</label>
                  <input value={reference} onChange={(e) => setReference(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition" placeholder="Tx ID or sender number" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Note (optional)</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition" placeholder="Anything else we should know" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Payment screenshot</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                {!preview ? (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 px-6 py-8 rounded-xl border-2 border-dashed border-border/60 bg-background/30 hover:border-primary/60 hover:bg-primary/5 transition text-muted-foreground"
                  >
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                    <span className="text-sm"><span className="text-foreground font-medium">Click to upload</span> your receipt screenshot</span>
                    <span className="text-xs">PNG, JPG, WEBP · up to 5MB</span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-border/60 bg-background/30">
                    <img src={preview} alt="Payment receipt preview" className="w-full max-h-72 object-contain" />
                    <div className="flex items-center justify-between p-3 border-t border-border/60 bg-card/60">
                      <span className="text-xs text-muted-foreground truncate">{screenshot?.name}</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => fileRef.current?.click()} className="px-3 py-1.5 rounded-full text-xs border border-border/60 text-foreground hover:bg-card/70 transition">Replace</button>
                        <button type="button" onClick={() => onPickFile(null)} className="px-3 py-1.5 rounded-full text-xs border border-destructive/40 text-destructive hover:bg-destructive/10 transition">Remove</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.94 11.94 0 0012.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.1 1.6 5.9L0 24l6.42-1.68a11.84 11.84 0 005.62 1.43h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43zM12.05 21.5h-.01a9.66 9.66 0 01-4.93-1.35l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.65 9.65 0 01-1.48-5.01c0-5.34 4.35-9.69 9.7-9.69 2.59 0 5.02 1.01 6.85 2.84a9.62 9.62 0 012.84 6.86c0 5.34-4.35 9.65-9.59 9.65zm5.32-7.23c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34z"/></svg>
                {submitted ? "Re-open WhatsApp to send screenshot" : "Submit & Send Payment Proof on WhatsApp"}
              </button>

              {submitted && (
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/10 text-sm text-foreground">
                  ✅ Request submitted to admin. {shareStatus ?? `Please send your screenshot on WhatsApp to +20 122 257 6172.`}
                </div>
              )}

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-primary hover:underline"
              >
                Or open WhatsApp directly →
              </a>
            </form>
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