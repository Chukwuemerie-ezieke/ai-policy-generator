# Changelog

All notable changes to the AI Governance Policy Generator are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-04-07

### 🎉 Initial Release

**Built by Harmony Digital Consults Ltd, Anambra State, Nigeria.**

#### Added

##### Core Application
- Full-stack web application (React 18 + Express + SQLite) for AI governance policy generation
- 4-step guided form with real-time validation (react-hook-form + zod)
- Hash-based SPA routing (wouter) for compatibility with static hosting
- TanStack Query v5 for server state management
- shadcn/ui + Tailwind CSS v3 design system with Harmony teal branding

##### Policy Generation Engine (`server/policyEngine.ts`)
- Deterministic (non-AI) policy generation from expert-authored clause templates
- 13-section policy structure covering all aspects of institutional AI governance
- Modular framework clauses: NDPA/NDPR, ISO 42001, ISO 27001, AU AI Strategy
- Tool-specific policy sections for 4 AI tool categories
- Adaptive clauses based on: school type, student age group, boarding status, ICT lab, DPO presence
- Auto-generated document metadata: reference number, issue date, review date, approval block
- Harmony Digital Consults attribution in document footer

##### Regulatory Framework Coverage
- **NDPA/NDPR (Nigeria)**: Registration obligations, DPO appointment, 72-hour breach notification, data subject rights, penalty exposure (₦2M–₦10M), NDPC contact information
- **ISO/IEC 42001:2023**: AIMS scope and documentation, risk & impact assessments, human-in-the-loop requirements, continuous monitoring
- **ISO/IEC 27001**: RBAC framework, encryption standards (TLS 1.2+, AES-256), incident response procedures, annual audit requirements
- **AU Continental AI Strategy 2024**: Phase 1 (2025–2026) alignment, Agenda 2063 compatibility, digital equity provisions, African-context AI ethics

##### AI Tool Policy Sections
- **General AI Chatbots** (ChatGPT, Gemini, Copilot): student consent for minors, academic integrity rules, approved platform lists, prohibited uses
- **AI-Powered EdTech Platforms**: vendor vetting requirements, bias testing obligations, human grade review mandate
- **School Management AI** (Harmony Suite, attendance, timetabling): monitoring oversight, DPO review cadence, parent rights
- **AI Content Generation**: deepfake prohibition, disclosure requirements, fact-verification obligations, age-appropriate content controls

##### Roles & Responsibilities
- School leadership section (adapts title: Head Teacher / Principal / VC based on school type)
- Data Protection Officer section (conditional on DPO name being provided)
- ICT Coordinator / Technology Team section
- Teaching staff obligations
- Student responsibilities
- Parent/guardian rights and obligations (adapts for minor vs. adult students)

##### PDF Export
- jsPDF-based PDF generation (client-side, no server roundtrip)
- Harmony teal branded header with school name and generation date
- Section headers with teal background bars
- Bullet point formatting with teal markers
- Auto page numbering with total page count
- Footer attribution on every page
- Automatic filename: `{SchoolName}_AI_Governance_Policy.pdf`

##### School Mode
- 4-step form optimised for school heads and administrators
- Mode toggle (School / Consultant) on Step 1
- Pre-selected defaults (NDPA/NDPR + ISO 42001, chatbots + EdTech platforms)

##### Consultant Mode
- Consultant organisation name field on Step 1
- Consultant Dashboard page (`/#/dashboard`)
- All generated policies listed with school name, type, location, frameworks, date, character count
- Click-through to view/download any past policy
- "New Policy" CTA from dashboard

##### Database (SQLite via Drizzle ORM)
- SQLite database with auto-created schema on first run
- Full policy text persisted for retrieval
- `better-sqlite3` synchronous driver with Drizzle query builder
- Policies table with all school profile fields, AI tools (JSON), frameworks (JSON), and generated policy text

##### REST API
- `POST /api/policies/generate` — Generate and persist a new policy
- `GET /api/policies` — List all policies (consultant dashboard)
- `GET /api/policies/:id` — Retrieve single policy with full text

##### UI/UX
- Cabinet Grotesk display font + General Sans body font (Fontshare CDN)
- Harmony teal (#01696F) primary color — matches Harmony Digital Consults brand identity
- Progress bar in form header (steps 1–4)
- Step-specific icons (Building2, Users, Bot, Shield)
- Tool selection cards with teal checkmark indicators
- Framework selection cards with colour-coded icons (NDPR teal, ISO 42001 blue, ISO 27001 purple, AU brown)
- Policy summary card at Step 4 before submission
- Copy-to-clipboard button on result page
- Character count display on result page
- Responsive layout (mobile-friendly)

---

## [Unreleased]

### Planned for v1.1
- School logo upload with PDF embedding
- Email delivery via Zoho Mail
- Policy version history and comparison
- Ghana, Kenya, and South Africa regulatory variants

### Planned for v1.2
- Staff training module generator output
- Vendor AI vetting checklist export (CSV/Excel)
- AI tool register template
- Multi-language policy summary (Yoruba, Igbo, Hausa)

---

[1.0.0]: https://github.com/Chukwuemerie-ezieke/ai-policy-generator/releases/tag/v1.0.0
