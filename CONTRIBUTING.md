# Contributing to AI Governance Policy Generator

Thank you for your interest in contributing! This project addresses a real gap in AI governance infrastructure for African schools, and contributions from educators, legal professionals, compliance experts, and developers are especially valuable.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Adding a New Regulatory Framework](#adding-a-new-regulatory-framework)
- [Adding a New AI Tool Category](#adding-a-new-ai-tool-category)
- [Adding a New Country Variant](#adding-a-new-country-variant)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Issue Reporting](#issue-reporting)

---

## Code of Conduct

Be respectful. This project serves schools, students, and educators across Africa. Contributions that misrepresent legal requirements, introduce inaccurate regulatory information, or could harm schools or students will not be accepted.

---

## Ways to Contribute

### 🔍 Legal & Compliance Review
- Review existing policy clauses for legal accuracy
- Suggest improvements to NDPA/NDPR compliance sections
- Add clauses for Ghana Data Protection Act, Kenya Data Protection Act, South Africa POPIA, etc.
- Flag outdated references to regulations or standards

### 🌍 African Country Variants
We currently focus on Nigeria (NDPA/NDPR). Contributions adding regulatory support for other African countries are highly welcome:
- Ghana — Data Protection Act 2012 (amended)
- Kenya — Data Protection Act 2019
- South Africa — POPIA (Protection of Personal Information Act)
- Rwanda — Law No. 058/2021 on Personal Data Protection

### 💻 Technical Contributions
- Bug fixes
- UI/UX improvements
- Performance optimizations
- New features from the [Roadmap](./README.md#roadmap)
- Test coverage

### 📝 Documentation
- Improve README or code comments
- Add JSDoc to functions in `policyEngine.ts`
- Write guides for school administrators

---

## Development Setup

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/ai-policy-generator.git
cd ai-policy-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5000`.

---

## Making Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-description
   ```

2. **Make your changes** — keep commits small and focused

3. **Test manually** — navigate through the full form flow and confirm the policy output is correct

4. **Build and verify**:
   ```bash
   npm run build
   NODE_ENV=production node dist/index.cjs
   ```

5. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add Ghana Data Protection Act framework clauses"
   # or
   git commit -m "fix: correct NDPA breach reporting timeline (72hrs not 48hrs)"
   ```

6. **Push** and open a Pull Request

---

## Adding a New Regulatory Framework

The policy engine is in `server/policyEngine.ts`. Frameworks are defined in the `frameworkClauses` map.

### Step 1 — Add the clause in `policyEngine.ts`

```typescript
// Inside the frameworkClauses object:
ghana_dpa: `**Ghana Data Protection Act 2012 (Amended) Compliance**
${data.schoolName} complies with the Ghana Data Protection Act...
- Register with the Data Protection Commission (DPC) Ghana
- ...`,
```

### Step 2 — Add the framework option in `client/src/pages/Generate.tsx`

```typescript
// In the frameworkOptions array:
{ id: "ghana_dpa", label: "Ghana DPA", sub: "Ghana Data Protection Act", color: "#006B3F" },
```

### Step 3 — Add the label in `client/src/pages/Result.tsx` and `Dashboard.tsx`

```typescript
const fwLabels: Record<string, string> = {
  // ... existing labels
  ghana_dpa: "Ghana DPA",
};
```

### Step 4 — Update the schema validation in `shared/schema.ts` if needed

---

## Adding a New AI Tool Category

### Step 1 — Add the tool case in `server/policyEngine.ts`

```typescript
case "proctoring":
  return `**Section: AI Proctoring Tools**
  The use of AI-powered examination proctoring...`;
```

### Step 2 — Add to the `aiToolOptions` array in `Generate.tsx`

```typescript
{ id: "proctoring", label: "AI Proctoring", sub: "Exam monitoring, face detection", icon: <Eye size={18} /> },
```

### Step 3 — Add label to `toolLabels` in `Result.tsx`

---

## Adding a New Country Variant

To support schools outside Nigeria:

1. Add a country selector to Step 1 of the form (`Generate.tsx`)
2. Add conditional logic in `policyEngine.ts` to swap regulatory references based on `data.country`
3. Add the country-specific framework to `frameworkOptions` in `Generate.tsx`
4. Update the README with the new country's framework details

---

## Pull Request Guidelines

- PRs should focus on one thing (one bug fix, one feature, one country)
- Legal/compliance changes must cite the source regulation and section number
- UI changes should include before/after screenshots
- All PRs must pass `npm run build` without errors
- Write a clear PR description explaining what changed and why

---

## Issue Reporting

Please use [GitHub Issues](https://github.com/Chukwuemerie-ezieke/ai-policy-generator/issues) for:

- **Bug reports** — Include steps to reproduce, expected vs. actual behaviour, and screenshots if applicable
- **Legal inaccuracies** — Cite the specific regulation/clause and the correct text
- **Feature requests** — Describe the use case and who benefits

**Label guide:**
- `bug` — Something is broken
- `legal-accuracy` — Policy text is incorrect or outdated
- `enhancement` — New feature or improvement
- `country-variant` — Support for a new African country
- `documentation` — Docs improvements

---

Thank you for helping make AI safer for African schools. 🌍
