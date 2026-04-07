# AI Governance Policy Generator for African Schools

<div align="center">

![Harmony Digital Consults](https://img.shields.io/badge/Harmony%20Digital%20Consults-Ltd-01696F?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

**Generate comprehensive, regulation-aligned AI Governance Policy documents for African schools in minutes.**

[Report a Bug](https://github.com/Chukwuemerie-ezieke/ai-policy-generator/issues) · [Request a Feature](https://github.com/Chukwuemerie-ezieke/ai-policy-generator/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Regulatory Frameworks](#regulatory-frameworks)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Policy Engine](#policy-engine)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [About Harmony Digital Consults](#about-harmony-digital-consults)

---

## Overview

The **AI Governance Policy Generator for African Schools** is a full-stack web application that enables Nigerian and African educational institutions to generate comprehensive, legally-aligned Artificial Intelligence governance policy documents in minutes — without needing legal expertise or compliance consultants.

The tool was built as part of the **AI Safety in EdTech** project initiative by [Harmony Digital Consults Ltd](https://harmonydigitalconsults.com.ng), addressing a critical gap in AI governance infrastructure for African schools.

> **Context:** Most AI safety tooling and governance frameworks are designed for Western regulatory contexts (GDPR, FERPA). This tool adapts global best practices — ISO 42001, ISO 27001, and the AU Continental AI Strategy — into the Nigerian regulatory environment (NDPA 2023 / NDPR).

---

## Features

### 🏫 School-Specific Policy Generation
- Supports **Primary**, **Secondary**, and **Tertiary** schools
- Adapts policy clauses based on student age group (under 18, mixed, 18+)
- Includes special provisions for **boarding schools**
- Handles ICT lab environments

### 📋 4-Step Guided Form
1. **School Profile** — Name, type, location, boarding/ICT lab status
2. **Leadership & Students** — Principal, DPO, contact email, student demographics
3. **AI Tools in Use** — Chatbots, EdTech platforms, school management AI, content generation
4. **Compliance Frameworks** — Select applicable regulatory standards

### ⚖️ Multi-Framework Compliance
Each selected framework generates dedicated policy sections with specific clauses:
- **NDPA/NDPR** — Registration obligations, DPO requirements, breach notification timelines, penalty exposure
- **ISO 42001** — AIMS scope, risk assessments, impact assessments, human-in-the-loop requirements
- **ISO 27001** — RBAC, encryption standards, vendor security requirements, annual audits
- **AU AI Strategy** — Continental alignment, digital equity provisions, local language/culture considerations

### 📄 AI-Tool-Specific Policy Sections
Each AI tool category gets dedicated usage guidelines:
- **General AI Chatbots** (ChatGPT, Gemini, Copilot) — Student consent, academic integrity, approved platform lists
- **AI-Powered EdTech Platforms** — Vendor vetting, bias testing, grade review requirements
- **School Management AI** (Harmony Suite, etc.) — Monitoring oversight, parent notification rules
- **AI Content Generation** — Deepfake prohibition, disclosure requirements, content verification

### 🏢 Dual Mode
- **School Mode** — Simplified flow for head teachers and school administrators
- **Consultant Mode** — Multi-school management dashboard for ICT consultants

### 📥 PDF Export
- Branded PDF with Harmony teal header/footer
- School name, principal, location, dates auto-populated
- Automatic page numbering and document reference numbers
- Signature block for formal adoption

### 💾 Policy History
- All generated policies stored in SQLite with full-text retrieval
- Consultant dashboard showing all policies across managed schools
- Click-to-view any past policy

---

## Regulatory Frameworks

| Framework | Coverage | Key Requirements Generated |
|-----------|----------|---------------------------|
| **NDPA/NDPR (Nigeria)** | Nigeria Data Protection Act 2023 | NDPC registration, DPO appointment, breach reporting (72hrs), data subject rights, ₦10M penalty exposure warning |
| **ISO/IEC 42001:2023** | AI Management System standard | AIMS scope, risk & impact assessments, transparency requirements, 38-control framework alignment |
| **ISO/IEC 27001** | Information Security Management | Access controls, encryption standards (TLS 1.2+, AES-256), incident response, annual vulnerability assessments |
| **AU Continental AI Strategy** | African Union AI Governance (2024) | Ethical principles, digital equity, Phase 1 (2025–2026) alignment, Agenda 2063 compatibility |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS v3, shadcn/ui |
| **Backend** | Node.js, Express |
| **Database** | SQLite (via Drizzle ORM + better-sqlite3) |
| **Build Tool** | Vite |
| **PDF Generation** | jsPDF |
| **State Management** | TanStack Query v5 |
| **Forms** | react-hook-form + zod |
| **Routing** | wouter (hash routing for SPA deployment) |
| **Fonts** | Fontshare (General Sans + Cabinet Grotesk) |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Chukwuemerie-ezieke/ai-policy-generator.git

# Navigate into the project directory
cd ai-policy-generator

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server (frontend + backend on the same port)
npm run dev
```

The app will be available at `http://localhost:5000`.

The development server uses Vite for the frontend with hot-module replacement, and Express for the backend. Both run on port 5000 simultaneously.

### Building for Production

```bash
# Build the frontend (Vite) and backend (esbuild)
npm run build

# Start the production server
NODE_ENV=production node dist/index.cjs
```

The production build serves the compiled frontend as static files from Express.

---

## Project Structure

```
ai-policy-generator/
├── client/                        # React frontend (Vite)
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx           # Landing page
│       │   ├── Generate.tsx       # 4-step policy generation form
│       │   ├── Result.tsx         # Policy viewer + PDF export
│       │   └── Dashboard.tsx      # Consultant dashboard
│       ├── components/ui/         # shadcn/ui component library
│       ├── hooks/                 # Custom React hooks
│       ├── lib/
│       │   └── queryClient.ts     # TanStack Query + API client
│       ├── App.tsx                # Router setup
│       ├── index.css              # Global styles + design tokens
│       └── main.tsx               # Entry point
│
├── server/                        # Express backend
│   ├── index.ts                   # Server bootstrap
│   ├── routes.ts                  # API route definitions
│   ├── storage.ts                 # Drizzle ORM + SQLite database layer
│   ├── policyEngine.ts            # 🧠 Core policy generation logic
│   └── vite.ts                    # Vite dev server integration
│
├── shared/
│   └── schema.ts                  # Drizzle schema + Zod types (shared frontend/backend)
│
├── dist/                          # Production build output (gitignored)
│   ├── public/                    # Compiled frontend (served statically)
│   └── index.cjs                  # Compiled backend
│
├── db.sqlite                      # SQLite database (created on first run, gitignored)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── drizzle.config.ts
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md
```

---

## How It Works

### User Flow

```
Home → Generate (4 steps) → API POST /api/policies/generate → Policy Engine → Result + PDF Download
```

1. User fills the 4-step form with school details, AI tools, and preferred frameworks
2. On submission, the frontend sends a validated JSON payload to `POST /api/policies/generate`
3. The **Policy Engine** (`server/policyEngine.ts`) generates a full policy document by composing modular text blocks based on the inputs
4. The generated policy is stored in SQLite and the policy ID is returned
5. The frontend navigates to `/result/:id` where the policy is displayed
6. The user can copy to clipboard or download as a branded PDF via jsPDF

### Data Model

```typescript
// shared/schema.ts
{
  id: number;                // Auto-increment primary key
  schoolName: string;        // Full name of the institution
  schoolType: string;        // "primary" | "secondary" | "tertiary"
  location: string;          // City / Town
  state: string;             // Nigerian state
  country: string;           // Default: "Nigeria"
  principalName: string;     // Head Teacher / Principal / VC name
  dpoName: string | null;    // Data Protection Officer (optional)
  contactEmail: string;      // Official school contact email
  aiTools: string;           // JSON array: ["chatbots", "edtech", ...]
  frameworks: string;        // JSON array: ["ndpr", "iso42001", ...]
  studentAgeGroup: string;   // "under18" | "mixed" | "over18"
  boardingSchool: boolean;   // Triggers additional residential policy clauses
  hasIctLab: boolean;        // Triggers ICT lab management clauses
  mode: string;              // "school" | "consultant"
  consultantOrg: string;     // Consultant organisation name (if consultant mode)
  generatedPolicy: string;   // Full generated policy text
  createdAt: string;         // ISO 8601 timestamp
}
```

---

## Policy Engine

The core of the application is `server/policyEngine.ts` — a deterministic text generation engine (no AI/LLM required) that composes policy documents from modular, legally-informed clauses.

### Architecture

```
Input (school profile + tools + frameworks)
    ↓
Framework Clauses (NDPR / ISO 42001 / ISO 27001 / AU AI)
    ↓
Tool-Specific Sections (chatbots / edtech / schoolmgmt / contentgen)
    ↓
Role & Responsibility Sections (adapted by school type + DPO presence)
    ↓
Student Rights Sections (adapted by age group + boarding status)
    ↓
Incident Response & Review Schedule
    ↓
Full Policy Document (12–18 pages equivalent)
```

### Key Design Decisions

- **Expert-authored templates** — The policy text is composed from carefully written clause templates, ensuring legal accuracy and regulatory fidelity. Output is consistent and reproducible.
- **Adaptive clauses** — Every conditional (`isUnder18`, `boardingSchool`, `hasIctLab`, `dpoName`) modifies the output, making each policy genuinely specific to the institution.
- **Nigeria-first** — Penalties, timelines, and authorities reference NDPC (Nigeria Data Protection Commission) and the NDPA 2023 specifically.
- **Extensible** — Adding a new AI tool or framework is as simple as adding a new case to the switch statement and a new entry in the `frameworkClauses` map.

---

## API Reference

### `POST /api/policies/generate`

Generate and persist a new AI governance policy.

**Request Body:**
```json
{
  "schoolName": "Ufuma Community Secondary School",
  "schoolType": "secondary",
  "location": "Ufuma",
  "state": "Anambra",
  "country": "Nigeria",
  "principalName": "Mr. Chukwuemeka Ezieke",
  "dpoName": "Mrs. Ada Okonkwo",
  "contactEmail": "admin@ufumasecondary.edu.ng",
  "studentAgeGroup": "under18",
  "boardingSchool": false,
  "hasIctLab": true,
  "mode": "school",
  "consultantOrg": null,
  "aiTools": "[\"chatbots\",\"edtech\",\"schoolmgmt\",\"contentgen\"]",
  "frameworks": "[\"ndpr\",\"iso42001\",\"iso27001\",\"au\"]"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "schoolName": "Ufuma Community Secondary School",
  "generatedPolicy": "ARTIFICIAL INTELLIGENCE GOVERNANCE POLICY\n...",
  "createdAt": "2026-04-07T15:30:00.000Z",
  ...
}
```

---

### `GET /api/policies`

Retrieve all previously generated policies.

**Response:** `200 OK` — Array of policy objects (without full `generatedPolicy` text for performance).

---

### `GET /api/policies/:id`

Retrieve a single policy by ID, including full `generatedPolicy` text.

**Response:** `200 OK` — Full policy object.

---

## Screenshots

| Home Page | Step 1 — School Profile |
|-----------|------------------------|
| Landing with framework badges and CTAs | Mode selection, school type, location inputs |

| Step 3 — AI Tools | Result — Policy Viewer |
|-------------------|------------------------|
| Multi-select tool cards with icons | Full policy text with Copy + PDF download |

| Consultant Dashboard | Generated PDF |
|----------------------|---------------|
| All policies with framework tags and dates | Branded teal header, school details, page numbers |

---

## Roadmap

### v1.1 (Planned)
- [ ] School logo upload → embedded in PDF header
- [ ] Email delivery of generated policy (Zoho Mail integration)
- [ ] Policy comparison between versions
- [ ] Ghana, Kenya, and South Africa regulatory framework variants

### v1.2 (Planned)
- [ ] Staff training module generator (companion SCORM course output)
- [ ] Vendor vetting checklist generator
- [ ] AI tool register template export (Excel/CSV)
- [ ] Multi-language support (Yoruba, Igbo, Hausa policy summaries)

### v2.0 (Future)
- [ ] SaaS subscription model with school accounts
- [ ] Annual policy review reminder system
- [ ] Integration with EduTrack Nigeria and Harmony School Suite
- [ ] NDPC compliance audit checklist generator

---

## Contributing

Contributions are welcome, especially from:
- Legal/compliance professionals familiar with NDPA, ISO 42001, or AU AI Strategy
- Educators with experience implementing AI governance in African schools
- Developers who want to add framework support for other African countries

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

## About Harmony Digital Consults

**Harmony Digital Consults Ltd** is an EdTech company based in Anambra State, Nigeria, building digital tools for African schools and educational institutions.

**Products:**
- [Harmony School Suite](https://github.com/Chukwuemerie-ezieke/harmony-school-suite) — Unified SaaS for school management (EduTrack, TimeGrid, VoicelessBox, Parents Connect)
- [SmartCite](https://github.com/Chukwuemerie-ezieke/smartcite-extension) — Academic citation generator browser extension
- [EduTrack Nigeria](https://github.com/Chukwuemerie-ezieke/edutrack-nigeria) — SaaS dashboard for school attendance and management
- [VoicelessBox](https://github.com/Chukwuemerie-ezieke/voicelessbox) — Digital suggestion and complaint box for schools

**Contact:** info@harmonydigitalconsults.com.ng  
**Website:** [harmonydigitalconsults.com.ng](https://harmonydigitalconsults.com.ng)  
**GitHub:** [@Chukwuemerie-ezieke](https://github.com/Chukwuemerie-ezieke)

---

<div align="center">
Made with ❤️ in Anambra State, Nigeria
</div>
