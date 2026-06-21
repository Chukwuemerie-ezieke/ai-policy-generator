import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, PlusCircle, Building2, Calendar } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Dashboard() {
  const { policies } = useStore();
  const fwLabels: Record<string, string> = { ndpr: "NDPR", iso42001: "ISO 42001", iso27001: "ISO 27001", au: "AU AI" };
  const typeColors: Record<string, string> = { primary: "#437a22", secondary: "#01696F", tertiary: "#006494" };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <header style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button style={{ color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem" }}>
                <ArrowLeft size={16} /> Back
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Harmony Digital Consults Logo" width="24" height="24" style={{ borderRadius: "4px", objectFit: "contain" }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem" }}>Session History</div>
            </div>
          </div>
          <Link href="/generate">
            <Button size="sm" style={{ background: "hsl(var(--primary))", color: "white" }} data-testid="button-new-policy">
              <PlusCircle size={14} className="mr-1" /> New Policy
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.25rem" }}>Generated This Session</h1>
            <p style={{ fontSize: "0.82rem", color: "hsl(var(--muted-foreground))" }}>
              {policies.length} {policies.length === 1 ? "policy" : "policies"} — history clears on page refresh
            </p>
          </div>
        </div>

        {policies.length === 0 && (
          <div className="step-card text-center py-16">
            <FileText size={40} style={{ margin: "0 auto 1rem", color: "hsl(var(--muted-foreground))" }} />
            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>No policies yet this session</h3>
            <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", marginBottom: "1.5rem" }}>
              Generate a policy and it will appear here.
            </p>
            <Link href="/generate">
              <Button style={{ background: "hsl(var(--primary))", color: "white" }}>Generate a Policy</Button>
            </Link>
          </div>
        )}

        {policies.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {policies.map((p) => {
              const date = new Date(p.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
              return (
                <Link key={p.id} href={`/result/${p.id}`}>
                  <div className="step-card cursor-pointer hover:border-[hsl(var(--primary))] transition-colors" data-testid={`policy-row-${p.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: typeColors[p.schoolType] || "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                          <Building2 size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{p.schoolName}</div>
                          <div style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}>
                            {p.schoolType.charAt(0).toUpperCase() + p.schoolType.slice(1)} · {p.location}, {p.state}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {p.frameworks.map((f) => (
                              <span key={f} style={{ fontSize: "0.68rem", padding: "1px 8px", borderRadius: 9999, background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))", border: "1px solid hsl(var(--border))", fontWeight: 600 }}>
                                {fwLabels[f] || f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                          <Calendar size={12} /> {date}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>
                          {p.generatedPolicy?.length.toLocaleString()} chars
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
