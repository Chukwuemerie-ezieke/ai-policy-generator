import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Download, Copy, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Policy } from "@shared/schema";
import jsPDF from "jspdf";

export default function Result() {
  const [, params] = useRoute("/result/:id");
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const { data: policy, isLoading } = useQuery<Policy>({
    queryKey: ["/api/policies", params?.id],
    queryFn: () => apiRequest("GET", `/api/policies/${params?.id}`).then(r => r.json()),
    enabled: !!params?.id,
  });

  const copyToClipboard = () => {
    if (!policy?.generatedPolicy) return;
    navigator.clipboard.writeText(policy.generatedPolicy).then(() => {
      setCopied(true);
      toast({ title: "Copied!", description: "Policy copied to clipboard." });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const downloadPDF = () => {
    if (!policy?.generatedPolicy) return;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 18;
    const usableW = pageW - margin * 2;

    // Header bar
    doc.setFillColor(1, 105, 111); // Harmony teal
    doc.rect(0, 0, pageW, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(policy.schoolName, margin, 12);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("AI Governance Policy Document", margin, 20);
    doc.setFontSize(8);
    doc.text(`Generated: ${new Date(policy.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}`, pageW - margin, 20, { align: "right" });

    // Footer helper
    const addFooter = (pageNum: number, totalPages: number) => {
      doc.setFillColor(240, 248, 248);
      doc.rect(0, doc.internal.pageSize.getHeight() - 14, pageW, 14, "F");
      doc.setTextColor(1, 105, 111);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text("Harmony Digital Consults Ltd · harmonydigitalconsults.com.ng", margin, doc.internal.pageSize.getHeight() - 5);
      doc.setTextColor(120, 120, 120);
      doc.text(`Page ${pageNum} of ${totalPages}`, pageW - margin, doc.internal.pageSize.getHeight() - 5, { align: "right" });
    };

    // Body text
    let y = 38;
    const lineHeight = 4.5;
    const pageHeight = doc.internal.pageSize.getHeight();
    const bodyBottom = pageHeight - 18;

    const lines = (policy.generatedPolicy || "").split("\n");
    const pageStarts: number[] = [1];
    let currentPage = 1;

    doc.setTextColor(30, 30, 30);

    for (const line of lines) {
      const isSeparator = line.startsWith("─");
      const isSectionHeader = /^\d+\./.test(line.trim()) && line.trim().length < 60;
      const isSubHeader = line.trim().startsWith("**") && line.trim().endsWith("**");
      const trimmed = line.replace(/\*\*/g, "").trim();

      if (isSeparator) {
        if (y > bodyBottom - 8) { addFooter(currentPage, 0); doc.addPage(); currentPage++; y = 38; }
        doc.setDrawColor(1, 105, 111);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageW - margin, y);
        y += 4;
        continue;
      }

      if (!trimmed) { y += 2; continue; }

      if (isSectionHeader) {
        if (y > bodyBottom - 12) { addFooter(currentPage, 0); doc.addPage(); currentPage++; y = 38; }
        doc.setFillColor(1, 105, 111);
        doc.rect(margin, y - 3, usableW, 8, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(trimmed, margin + 2, y + 2.5);
        doc.setTextColor(30, 30, 30);
        y += 10;
        continue;
      }

      if (isSubHeader) {
        if (y > bodyBottom - 8) { addFooter(currentPage, 0); doc.addPage(); currentPage++; y = 38; }
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(1, 80, 86);
        const wrapped = doc.splitTextToSize(trimmed, usableW);
        for (const wl of wrapped) {
          if (y > bodyBottom) { addFooter(currentPage, 0); doc.addPage(); currentPage++; y = 38; }
          doc.text(wl, margin, y);
          y += lineHeight;
        }
        doc.setTextColor(30, 30, 30);
        y += 1;
        continue;
      }

      const isBullet = trimmed.startsWith("-");
      const textToWrite = isBullet ? trimmed.slice(1).trim() : trimmed;
      const xIndent = isBullet ? margin + 5 : margin;
      const wrapWidth = isBullet ? usableW - 5 : usableW;

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const wrapped = doc.splitTextToSize(textToWrite, wrapWidth);
      for (let wi = 0; wi < wrapped.length; wi++) {
        if (y > bodyBottom) { addFooter(currentPage, 0); doc.addPage(); currentPage++; y = 38; }
        if (isBullet && wi === 0) {
          doc.setTextColor(1, 105, 111);
          doc.text("•", margin + 1, y);
          doc.setTextColor(30, 30, 30);
        }
        doc.text(wrapped[wi], xIndent, y);
        y += lineHeight;
      }
      y += 0.5;
    }

    // Add footers with real page count
    const totalPages = doc.internal.pages.length - 1;
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      addFooter(p, totalPages);
    }

    doc.save(`${policy.schoolName.replace(/\s+/g, "_")}_AI_Governance_Policy.pdf`);
    toast({ title: "PDF downloaded", description: "Your policy document has been saved." });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--background))" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "3px solid hsl(var(--primary))", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 1rem", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "hsl(var(--muted-foreground))" }}>Building your policy…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!policy) return null;

  const frameworks: string[] = JSON.parse(policy.frameworks as string);
  const aiTools: string[] = JSON.parse(policy.aiTools as string);
  const fwLabels: Record<string, string> = { ndpr: "NDPA/NDPR", iso42001: "ISO 42001", iso27001: "ISO 27001", au: "AU AI Strategy" };
  const toolLabels: Record<string, string> = { chatbots: "AI Chatbots", edtech: "EdTech Platforms", schoolmgmt: "School Management AI", contentgen: "AI Content Generation" };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <header style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <button style={{ color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem" }}>
              <ArrowLeft size={16} /> Home
            </button>
          </Link>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem" }}>Policy Generated</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} data-testid="button-copy">
              {copied ? <CheckCircle size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button size="sm" onClick={downloadPDF} data-testid="button-download" style={{ background: "hsl(var(--primary))", color: "white" }}>
              <Download size={14} className="mr-1" /> Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Summary card */}
        <div className="step-card mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.25rem" }}>{policy.schoolName}</h1>
              <p style={{ fontSize: "0.82rem", color: "hsl(var(--muted-foreground))" }}>
                {policy.schoolType.charAt(0).toUpperCase() + policy.schoolType.slice(1)} School · {policy.location}, {policy.state}, {policy.country}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>Generated</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{new Date(policy.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {frameworks.map(f => <span key={f} className="badge-framework">{fwLabels[f] || f}</span>)}
          </div>
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>
            Covers: {aiTools.map(t => toolLabels[t] || t).join(" · ")}
          </div>
        </div>

        {/* Policy text */}
        <div className="step-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>Policy Document</h2>
            <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
              {policy.generatedPolicy?.length.toLocaleString()} characters
            </span>
          </div>
          <div className="policy-output" data-testid="policy-output">
            {policy.generatedPolicy}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={downloadPDF} style={{ background: "hsl(var(--primary))", color: "white", fontWeight: 600 }} data-testid="button-download-bottom">
            <Download size={16} className="mr-2" /> Download PDF
          </Button>
          <Link href="/generate">
            <Button variant="outline">Generate Another Policy</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">View All Policies</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
