import { Link } from "wouter";
import { Shield, FileText, Download, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Harmony HDC Logo */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="Harmony Digital Consults">
              <rect width="36" height="36" rx="8" fill="hsl(var(--primary))" />
              <path d="M8 10h4v16H8zM16 10h4v7h6V10h4v16h-4v-6h-6v6h-4z" fill="white" />
            </svg>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "hsl(var(--foreground))" }}>
                Harmony Digital Consults
              </div>
              <div style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))", marginTop: "-2px" }}>
                AI Policy Generator
              </div>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" data-testid="link-dashboard">
              <Users size={14} className="mr-2" /> Consultant Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))", border: "1px solid hsl(var(--border))" }}>
          <Shield size={14} />
          NDPA/NDPR · ISO 42001 · ISO 27001 · AU AI Strategy
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.15, maxWidth: "700px", marginBottom: "1.25rem" }}>
          AI Governance Policy Generator for African Schools
        </h1>

        <p style={{ fontSize: "1.1rem", color: "hsl(var(--muted-foreground))", maxWidth: "540px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Generate a comprehensive, regulation-aligned AI policy document tailored to your school — covering Nigerian data protection law, international AI safety standards, and the African Union AI strategy.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/generate">
            <Button size="lg" data-testid="button-get-started" style={{ background: "hsl(var(--primary))", color: "white", fontWeight: 600, fontSize: "1rem", padding: "0.75rem 2rem" }}>
              <FileText size={18} className="mr-2" />
              Generate Your Policy
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" data-testid="button-consultant">
              <Users size={18} className="mr-2" />
              Consultant Mode
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield size={22} />,
              title: "4 Regulatory Frameworks",
              desc: "NDPA/NDPR (Nigeria), ISO 42001 AI Management, ISO 27001 InfoSec, and the African Union Continental AI Strategy 2024."
            },
            {
              icon: <FileText size={22} />,
              title: "School-Specific Policies",
              desc: "Covers primary, secondary, and tertiary schools. Adapts clauses based on student age groups, boarding status, and AI tools in use."
            },
            {
              icon: <Download size={22} />,
              title: "PDF Export",
              desc: "Download a ready-to-sign, branded policy document instantly. Add your school name, principal, and logo."
            }
          ].map((f, i) => (
            <div key={i} className="step-card">
              <div className="mb-3" style={{ color: "hsl(var(--primary))" }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.88rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frameworks row */}
      <section style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} className="py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-3 justify-center items-center">
          <span style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", fontWeight: 600, marginRight: "0.5rem" }}>Aligned with:</span>
          {["NDPA/NDPR Nigeria", "ISO/IEC 42001:2023", "ISO/IEC 27001", "AU AI Strategy 2024"].map(f => (
            <span key={f} className="badge-framework">
              <CheckCircle size={12} /> {f}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid hsl(var(--border))", padding: "1rem 1.5rem", textAlign: "center", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
        © {new Date().getFullYear()} Harmony Digital Consults Ltd · Anambra State, Nigeria · support@harmonydigitalconsults.com
      </footer>
    </div>
  );
}
