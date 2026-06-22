import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import { generatePolicy } from "@/lib/policyEngine";
import type { GeneratedPolicy } from "@/lib/policyEngine";
import { logoBase64 } from "@/lib/logoBase64";
import { ChevronLeft, ChevronRight, Bot, BookOpen, Shield, Users, Building2, MessageSquare, Image, Layers } from "lucide-react";

const TOTAL_STEPS = 4;

const aiToolOptions = [
  { id: "chatbots", label: "AI Chatbots", sub: "ChatGPT, Gemini, Copilot", icon: <MessageSquare size={18} /> },
  { id: "edtech", label: "EdTech Platforms", sub: "Adaptive tutoring, AI grading", icon: <BookOpen size={18} /> },
  { id: "schoolmgmt", label: "School Management AI", sub: "Attendance, timetabling, Harmony Suite", icon: <Building2 size={18} /> },
  { id: "contentgen", label: "AI Content Generation", sub: "Text, images, video, deepfakes", icon: <Image size={18} /> },
];

const frameworkOptions = [
  { id: "ndpr", label: "NDPA / NDPR", sub: "Nigeria Data Protection Act 2023", color: "#01696F" },
  { id: "iso42001", label: "ISO 42001", sub: "AI Management System", color: "#1d6fa4" },
  { id: "iso27001", label: "ISO 27001", sub: "Information Security", color: "#7a39bb" },
  { id: "au", label: "AU AI Strategy", sub: "African Union 2024", color: "#964219" },
];

const formSchema = z.object({
  schoolName: z.string().min(2, "School name required"),
  schoolType: z.enum(["primary", "secondary", "tertiary"]),
  location: z.string().min(2, "Location required"),
  state: z.string().min(2, "State required"),
  country: z.string().default("Nigeria"),
  principalName: z.string().min(2, "Principal/Head name required"),
  dpoName: z.string().optional(),
  contactEmail: z.string().email("Valid email required"),
  studentAgeGroup: z.enum(["under18", "mixed", "over18"]),
  boardingSchool: z.boolean().default(false),
  hasIctLab: z.boolean().default(false),
  mode: z.enum(["school", "consultant"]).default("school"),
  consultantOrg: z.string().optional(),
  aiTools: z.array(z.string()).min(1, "Select at least one AI tool"),
  frameworks: z.array(z.string()).min(1, "Select at least one framework"),
});

type FormData = z.infer<typeof formSchema>;

export default function Generate() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addPolicy } = useStore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "", schoolType: "secondary", location: "", state: "", country: "Nigeria",
      principalName: "", dpoName: "", contactEmail: "",
      studentAgeGroup: "under18", boardingSchool: false, hasIctLab: false,
      mode: "school", consultantOrg: "",
      aiTools: ["chatbots", "edtech"], frameworks: ["ndpr", "iso42001"],
    },
  });

  const { watch, setValue, getValues, trigger } = form;
  const aiTools = watch("aiTools");
  const frameworks = watch("frameworks");
  const mode = watch("mode");

  const toggleArr = (field: "aiTools" | "frameworks", val: string) => {
    const cur = getValues(field);
    setValue(field, cur.includes(val) ? cur.filter((v: string) => v !== val) : [...cur, val]);
  };

  const nextStep = async () => {
    const fieldsPerStep: Record<number, (keyof FormData)[]> = {
      1: ["mode", "schoolName", "schoolType", "location", "state", "country"],
      2: ["principalName", "contactEmail", "studentAgeGroup"],
      3: ["aiTools"],
      4: ["frameworks"],
    };
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const onSubmit = (data: FormData) => {
    setIsGenerating(true);
    try {
      const policyText = generatePolicy(data);
      const policy: GeneratedPolicy = {
        ...data,
        id: `${Date.now()}`,
        generatedPolicy: policyText,
        createdAt: new Date().toISOString(),
      };
      addPolicy(policy);
      navigate(`/result/${policy.id}`);
    } catch {
      toast({ title: "Generation failed", description: "Please check your inputs and try again.", variant: "destructive" });
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <header style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/">
            <button style={{ color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem" }}>
              <ChevronLeft size={16} /> Back
            </button>
          </Link>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={logoBase64} alt="Harmony Digital Consults Logo" width="24" height="24" style={{ borderRadius: "4px", objectFit: "contain" }} />
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>
              Policy Generator
            </div>
            <div style={{ fontSize: "0.72rem", color: "hsl(var(--muted-foreground))" }}>Step {step} of {TOTAL_STEPS}</div>
          </div>
        </div>
        <div className="progress-bar mx-auto" style={{ maxWidth: "100%" }}>
          <div className="progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="step-card">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>School Profile</h2>
                  <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>Tell us about your institution</p>
                </div>
              </div>

              <div className="mb-6">
                <Label className="mb-2 block text-sm font-semibold">Mode</Label>
                <div className="flex gap-3">
                  {[{ val: "school", label: "School Mode", sub: "For school heads & admins" }, { val: "consultant", label: "Consultant Mode", sub: "For ICT consultants managing multiple schools" }].map((m) => (
                    <div key={m.val} data-testid={`mode-${m.val}`}
                      onClick={() => setValue("mode", m.val as "school" | "consultant")}
                      className={`tool-card flex-1 ${mode === m.val ? "selected" : ""}`} style={{ cursor: "pointer" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{m.label}</div>
                      <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}>{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {mode === "consultant" && (
                <div className="mb-4">
                  <Label className="mb-1 block text-sm font-medium">Consultant Organisation</Label>
                  <Input {...form.register("consultantOrg")} placeholder="e.g. Harmony Digital Consults Ltd" data-testid="input-consultantOrg" />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="mb-1 block text-sm font-medium">School Name *</Label>
                  <Input {...form.register("schoolName")} placeholder="e.g. Ufuma Community Secondary School" data-testid="input-schoolName" />
                  {form.formState.errors.schoolName && <p className="text-xs mt-1" style={{ color: "hsl(var(--destructive))" }}>{form.formState.errors.schoolName.message}</p>}
                </div>

                <div>
                  <Label className="mb-2 block text-sm font-medium">School Type *</Label>
                  <div className="flex gap-2">
                    {[{ val: "primary", label: "Primary" }, { val: "secondary", label: "Secondary" }, { val: "tertiary", label: "Tertiary" }].map((t) => (
                      <button key={t.val} type="button" data-testid={`type-${t.val}`}
                        onClick={() => setValue("schoolType", t.val as "primary" | "secondary" | "tertiary")}
                        style={{ flex: 1, padding: "0.5rem", borderRadius: 8, border: `2px solid ${watch("schoolType") === t.val ? "hsl(var(--primary))" : "hsl(var(--border))"}`, background: watch("schoolType") === t.val ? "hsl(var(--accent))" : "hsl(var(--card))", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", color: "hsl(var(--foreground))" }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">City / Town *</Label>
                    <Input {...form.register("location")} placeholder="e.g. Ufuma" data-testid="input-location" />
                    {form.formState.errors.location && <p className="text-xs mt-1" style={{ color: "hsl(var(--destructive))" }}>{form.formState.errors.location.message}</p>}
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">State *</Label>
                    <Input {...form.register("state")} placeholder="e.g. Anambra" data-testid="input-state" />
                    {form.formState.errors.state && <p className="text-xs mt-1" style={{ color: "hsl(var(--destructive))" }}>{form.formState.errors.state.message}</p>}
                  </div>
                </div>

                <div>
                  <Label className="mb-1 block text-sm font-medium">Country</Label>
                  <Input {...form.register("country")} defaultValue="Nigeria" data-testid="input-country" />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...form.register("boardingSchool")} data-testid="check-boarding" className="w-4 h-4" />
                    <span style={{ fontSize: "0.875rem" }}>Boarding School</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...form.register("hasIctLab")} data-testid="check-ictlab" className="w-4 h-4" />
                    <span style={{ fontSize: "0.875rem" }}>Has ICT Lab</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="step-card">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  <Users size={20} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>Leadership & Students</h2>
                  <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>Roles and contact details</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="mb-1 block text-sm font-medium">Principal / Head Teacher Name *</Label>
                  <Input {...form.register("principalName")} placeholder="e.g. Mr. Chukwuemeka Obi" data-testid="input-principalName" />
                  {form.formState.errors.principalName && <p className="text-xs mt-1" style={{ color: "hsl(var(--destructive))" }}>{form.formState.errors.principalName.message}</p>}
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium">Data Protection Officer (DPO) — if appointed</Label>
                  <Input {...form.register("dpoName")} placeholder="Full name (leave blank if not yet designated)" data-testid="input-dpoName" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium">Contact Email *</Label>
                  <Input {...form.register("contactEmail")} type="email" placeholder="admin@yourschool.edu.ng" data-testid="input-contactEmail" />
                  {form.formState.errors.contactEmail && <p className="text-xs mt-1" style={{ color: "hsl(var(--destructive))" }}>{form.formState.errors.contactEmail.message}</p>}
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium">Student Age Group *</Label>
                  <div className="flex gap-2">
                    {[{ val: "under18", label: "Under 18", sub: "All minors" }, { val: "mixed", label: "Mixed Ages", sub: "Some adults" }, { val: "over18", label: "18 & Above", sub: "Adults only" }].map((a) => (
                      <div key={a.val} data-testid={`age-${a.val}`}
                        onClick={() => setValue("studentAgeGroup", a.val as "under18" | "mixed" | "over18")}
                        className={`tool-card flex-1 text-center ${watch("studentAgeGroup") === a.val ? "selected" : ""}`} style={{ cursor: "pointer" }}>
                        <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{a.label}</div>
                        <div style={{ fontSize: "0.72rem", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}>{a.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="step-card">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>AI Tools in Use</h2>
                  <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>Select all that apply — each gets dedicated policy clauses</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {aiToolOptions.map((tool) => (
                  <div key={tool.id} data-testid={`tool-${tool.id}`}
                    onClick={() => toggleArr("aiTools", tool.id)}
                    className={`tool-card flex items-center gap-4 ${aiTools.includes(tool.id) ? "selected" : ""}`}>
                    <div className="tool-icon">{tool.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{tool.label}</div>
                      <div style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))" }}>{tool.sub}</div>
                    </div>
                    <div className="ml-auto">
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${aiTools.includes(tool.id) ? "hsl(var(--primary))" : "hsl(var(--border))"}`, background: aiTools.includes(tool.id) ? "hsl(var(--primary))" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {aiTools.includes(tool.id) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {form.formState.errors.aiTools && <p className="text-xs mt-2" style={{ color: "hsl(var(--destructive))" }}>Select at least one AI tool category</p>}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="step-card">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>Compliance Frameworks</h2>
                  <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>Select frameworks to include in the policy</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {frameworkOptions.map((fw) => (
                  <div key={fw.id} data-testid={`fw-${fw.id}`}
                    onClick={() => toggleArr("frameworks", fw.id)}
                    className={`tool-card flex items-center gap-4 ${frameworks.includes(fw.id) ? "selected" : ""}`}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: fw.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: 700, textAlign: "center", lineHeight: 1.2, padding: "4px", flexShrink: 0 }}>
                      {fw.id === "ndpr" ? "NG" : fw.id === "iso42001" ? "42K" : fw.id === "iso27001" ? "27K" : "AU"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{fw.label}</div>
                      <div style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))" }}>{fw.sub}</div>
                    </div>
                    <div className="ml-auto">
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${frameworks.includes(fw.id) ? "hsl(var(--primary))" : "hsl(var(--border))"}`, background: frameworks.includes(fw.id) ? "hsl(var(--primary))" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {frameworks.includes(fw.id) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {form.formState.errors.frameworks && <p className="text-xs mt-2" style={{ color: "hsl(var(--destructive))" }}>Select at least one framework</p>}

              <div style={{ background: "hsl(var(--muted))", borderRadius: 8, padding: "1rem", fontSize: "0.82rem" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem", color: "hsl(var(--foreground))" }}>Summary</div>
                <div style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.8 }}>
                  <div><strong>School:</strong> {watch("schoolName") || "—"} ({watch("schoolType")})</div>
                  <div><strong>Location:</strong> {watch("location")}, {watch("state")}, {watch("country")}</div>
                  <div><strong>Head:</strong> {watch("principalName") || "—"}</div>
                  <div><strong>AI Tools:</strong> {aiTools.length} selected</div>
                  <div><strong>Frameworks:</strong> {frameworks.length} selected</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)} data-testid="button-prev">
                <ChevronLeft size={16} className="mr-1" /> Previous
              </Button>
            ) : <div />}

            {step < TOTAL_STEPS ? (
              <Button type="button" onClick={nextStep} data-testid="button-next" style={{ background: "hsl(var(--primary))", color: "white" }}>
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button type="submit" disabled={isGenerating} data-testid="button-generate" style={{ background: "hsl(var(--primary))", color: "white", fontWeight: 600 }}>
                {isGenerating ? "Generating..." : <><Layers size={16} className="mr-2" /> Generate Policy</>}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
