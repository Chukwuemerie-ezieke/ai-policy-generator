import type { InsertPolicy } from "@shared/schema";

function today(): string {
  return new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generatePolicy(data: InsertPolicy): string {
  const aiTools: string[] = data.aiTools;
  const frameworks: string[] = data.frameworks;
  const isUnder18 = data.studentAgeGroup !== "over18";

  const toolNames: Record<string, string> = {
    chatbots: "General AI Chatbots (ChatGPT, Gemini, Copilot, etc.)",
    edtech: "AI-Powered EdTech Platforms (LMS, Adaptive Tutoring, AI Grading)",
    schoolmgmt:
      "School Management AI (Attendance, Timetabling, Feedback Systems)",
    contentgen: "AI Content Generation (Text, Image, Audio, Video tools)",
  };

  const frameworkClauses: Record<string, string> = {
    ndpr: `**Nigeria Data Protection Act (NDPA 2023) / NDPR Compliance**
This policy is designed to comply with the Nigeria Data Protection Act (NDPA) 2023 and the Nigeria Data Protection Regulation (NDPR), enforced by the Nigeria Data Protection Commission (NDPC). As a Data Controller, ${data.schoolName} shall:
- Register with the NDPC as a Data Controller${data.studentAgeGroup !== "over18" ? " (Data Controller of Major Importance, given processing of student data)" : ""}.
- Appoint a Data Protection Officer (DPO)${data.dpoName ? `: ${data.dpoName}` : " — to be designated and announced to all stakeholders"}.
- Maintain a lawful basis for all personal data processing activities.
- Ensure all third-party EdTech vendors sign Data Processing Agreements (DPAs).
- Report data breaches to the NDPC within 72 hours of discovery.
- Respect data subjects' rights: access, rectification, erasure, portability, and objection.
- Retain student records for the duration of enrollment plus 7 years; financial records for 7 years; communications logs for 2 years unless otherwise required by law.`,

    iso42001: `**ISO/IEC 42001:2023 — AI Management System (AIMS) Alignment**
${data.schoolName} aligns its AI governance practices with ISO/IEC 42001:2023, the international standard for AI Management Systems. This includes:
- Establishing and maintaining an AI Management System (AIMS) scope document covering all AI tools deployed in the institution.
- Conducting AI Risk Assessments prior to deploying any new AI system, evaluating technical, ethical, legal, and societal risks.
- Performing AI Impact Assessments for tools that affect student outcomes, grading, or behaviour monitoring.
- Maintaining transparency in AI-assisted decisions — no high-stakes decision (grades, discipline, admission) shall be made by AI alone without human review.
- Ensuring ongoing monitoring of AI system performance, bias indicators, and failure events.
- Committing to continuous improvement of AI governance practices through periodic internal audits.`,

    iso27001: `**ISO/IEC 27001 — Information Security Management Alignment**
${data.schoolName} aligns its AI-related data practices with ISO/IEC 27001 information security principles:
- All AI systems handling student or staff personal data must undergo a security risk assessment before deployment.
- Access to AI platforms must be controlled through role-based access control (RBAC): students, teachers, administrators, and parents each have defined access levels.
- AI-generated data must be encrypted in transit (TLS 1.2+) and at rest (AES-256 or equivalent).
- Incident response procedures must cover AI-related security events, including data leakage, model manipulation, or unauthorized access.
- Staff handling AI tools must receive mandatory information security awareness training annually.
- Regular vulnerability assessments of AI systems and integrations must be conducted at least annually.`,

    au: `**African Union Continental AI Strategy (2024) Alignment**
${data.schoolName} acknowledges the African Union's Continental AI Strategy (approved July 2024) and commits to its principles in educational AI deployment:
- AI deployed in this institution shall uphold ethical principles, democratic values, human rights, and the rule of law consistent with the AU's Agenda 2063.
- The school commits to inclusive AI use that does not deepen inequalities between students based on economic status, gender, language, or disability.
- The school will contribute to building local AI capacity by ensuring students and staff develop AI literacy as a foundational skill.
- Decisions made with AI assistance will be transparent, explainable, and subject to human oversight, consistent with the AU's call for agile, risk-based, and accountable AI governance.
- The school supports the principle that African educational contexts — including local languages, cultural norms, and socioeconomic realities — must be reflected in any AI systems used.`,
  };

  const toolClauses = aiTools.map((tool) => {
    const name = toolNames[tool] || tool;
    switch (tool) {
      case "chatbots":
        return `**Section: General AI Chatbots**
Use of AI chatbots (including but not limited to ChatGPT, Google Gemini, Microsoft Copilot, and similar tools) is governed as follows:
- *Students*: ${isUnder18 ? "Students under 18 must obtain written parental/guardian consent before using AI chatbot tools for school purposes. " : ""}AI chatbots may be used as learning aids but not as a substitute for original student work. All submitted assignments must reflect the student's own understanding. Undisclosed AI-generated submissions constitute academic misconduct.
- *Teachers*: Staff may use AI chatbots for lesson planning, differentiation, and administrative tasks. AI-generated instructional materials must be reviewed by a human educator before delivery to students.
- *Prohibited*: Using AI chatbots to generate complete examination answers, impersonate school officials, generate harmful content, or bypass school content filters.
- The school maintains a list of approved AI chatbot platforms. Use of unapproved AI chatbots on school devices or networks is subject to disciplinary action.`;

      case "edtech":
        return `**Section: AI-Powered EdTech Platforms**
AI-powered educational platforms (adaptive tutoring, AI grading, recommendation engines, virtual tutors, etc.) are subject to:
- Vendor vetting: All EdTech vendors must provide documentation of their data handling practices, NDPA/NDPR compliance status, and their AI model's bias testing results before contract signing.
- Students must be informed when AI is being used to assess, recommend, or evaluate their performance.
- AI-generated grades or assessments are advisory only. Final grades must be reviewed and confirmed by a qualified human teacher.
- The school retains the right to audit any EdTech platform's outputs for bias, accuracy, and fairness at any time.
- Platforms must not use student data to train AI models without explicit, documented consent from parents/guardians (for minors) or the students themselves (for adults).`;

      case "schoolmgmt":
        return `**Section: School Management AI Systems**
AI features embedded in school management systems (attendance tracking, timetable generation, feedback analysis, parent communication tools) are governed by:
- AI-generated attendance flags, behavioural alerts, or performance reports must be reviewed by a responsible staff member before any action is taken.
- Automated parent notifications generated by AI must be reviewed for accuracy before dispatch.
- AI systems used for student behaviour monitoring must have clear data minimisation practices — only data necessary for the stated purpose shall be collected.
- The school's ICT ${data.dpoName ? "/ DPO team" : "coordinator"} is responsible for reviewing AI management system outputs quarterly.
- Students and parents have the right to request a human review of any AI-generated report or recommendation affecting the student.`;

      case "contentgen":
        return `**Section: AI Content Generation (Text, Image, Video, Audio)**
The use of AI tools to generate text, images, audio, or video content in school contexts is governed as follows:
- Students must declare any use of AI-generated content in assignments or projects. Undisclosed use constitutes academic dishonesty.
- AI-generated imagery, audio, or video that depicts real students, staff, or school facilities without consent is strictly prohibited. This includes AI "deepfakes" and synthetic media.
- ${isUnder18 ? "Given the student population includes minors, " : ""}AI content generation tools must not be used to produce inappropriate, offensive, or harmful content. Violations are subject to the school's disciplinary policy.
- Teachers using AI to generate curriculum materials (worksheets, lesson notes, quiz questions) must verify factual accuracy before distributing to students.
- The school reserves the right to use AI content detection tools as one factor in academic integrity reviews — not as sole evidence of misconduct.`;

      default:
        return `**Section: ${name}**\nUse of this AI tool is subject to the general principles outlined in this policy. Specific guidelines will be issued by the ICT coordinator.`;
    }
  });

  const policy = `
ARTIFICIAL INTELLIGENCE GOVERNANCE POLICY
${data.schoolName.toUpperCase()}

─────────────────────────────────────────────────────────────────────
Document Reference: AIGP-${new Date().getFullYear()}-001
Version: 1.0
Date of Issue: ${today()}
Review Date: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
Approved By: ${data.principalName} (${data.schoolType === "primary" ? "Head Teacher" : data.schoolType === "secondary" ? "Principal" : "Provost / Vice Chancellor"})
Contact: ${data.contactEmail}
Location: ${data.location}, ${data.state}, ${data.country}
─────────────────────────────────────────────────────────────────────
Harmony Digital Consults Ltd
www.harmonydigitalconsults.com.ng | info@harmonydigitalconsults.com.ng
─────────────────────────────────────────────────────────────────────


1. INTRODUCTION AND PURPOSE

${data.schoolName} is committed to harnessing Artificial Intelligence (AI) in ways that are ethical, safe, inclusive, and aligned with the educational mission of the institution. This AI Governance Policy establishes a framework for the responsible deployment, use, and oversight of AI tools and systems across all operations of ${data.schoolName}.

This policy applies to:
- All students enrolled at ${data.schoolName}
- All teaching and non-teaching staff
- School management, board members, and administrators
- Third-party vendors and contractors providing AI-powered services to the school
${data.mode === "consultant" && data.consultantOrg ? `- Technology consultants and implementers from ${data.consultantOrg}` : ""}

School Type: ${data.schoolType.charAt(0).toUpperCase() + data.schoolType.slice(1)} School
${data.boardingSchool ? "Campus Type: Boarding School — additional monitoring and privacy considerations apply for residential settings." : "Campus Type: Day School"}
${data.hasIctLab ? "ICT Infrastructure: Active ICT Laboratory — AI tool access is centrally managed through lab systems." : ""}


2. DEFINITIONS

"Artificial Intelligence (AI)": Systems that perform tasks that typically require human intelligence, including natural language processing, image recognition, decision-making, prediction, and recommendation.

"AI Management System (AIMS)": A set of policies, processes, and controls for governing AI systems across their lifecycle.

"Data Controller": An entity that determines the purposes and means of processing personal data — in this policy, ${data.schoolName}.

"Data Subject": Any identified or identifiable person whose data is processed — students, staff, and parents/guardians.

"High-Stakes Decision": Any decision that significantly affects a person's academic standing, welfare, safety, or rights (e.g., grade assignment, disciplinary action, admission decisions).

"Human-in-the-Loop": A governance principle requiring human review and approval before AI-assisted recommendations affect any high-stakes decision.


3. GUIDING PRINCIPLES

All AI use at ${data.schoolName} shall be governed by the following principles:

3.1 HUMAN OVERSIGHT — AI systems are tools to support human judgment, not to replace it. No High-Stakes Decision shall be made solely on the basis of AI output.

3.2 TRANSPARENCY — Students, parents, and staff have the right to know when AI is being used and how it may affect them.

3.3 FAIRNESS & NON-DISCRIMINATION — AI tools must be evaluated for bias before deployment. The school will not use AI systems that demonstrably disadvantage students based on gender, ethnicity, language, disability, or socioeconomic status.

3.4 DATA MINIMISATION — Only data necessary for a stated, legitimate educational purpose shall be collected and processed.

3.5 PRIVACY BY DESIGN — Privacy protections must be built into AI systems from the outset, not added as an afterthought.

3.6 COGNITIVE INTEGRITY — AI tools shall be deployed in ways that develop rather than diminish students' critical thinking, problem-solving, and independent learning capabilities.

3.7 ACCOUNTABILITY — Clear ownership and responsibility for AI governance is assigned at every level of the institution.


4. REGULATORY COMPLIANCE FRAMEWORK

${frameworks.includes("ndpr") ? frameworkClauses["ndpr"] + "\n\n" : ""}${frameworks.includes("iso42001") ? frameworkClauses["iso42001"] + "\n\n" : ""}${frameworks.includes("iso27001") ? frameworkClauses["iso27001"] + "\n\n" : ""}${frameworks.includes("au") ? frameworkClauses["au"] + "\n\n" : ""}

5. AI TOOLS — SPECIFIC USAGE GUIDELINES

The following AI tools and categories are currently in use or approved for use at ${data.schoolName}. Each is governed by the guidelines below in addition to the general principles in Section 3.

${toolClauses.join("\n\n")}


6. ROLES AND RESPONSIBILITIES

6.1 SCHOOL LEADERSHIP (${data.principalName})
- Champion this policy and ensure adequate resources for implementation.
- Review and approve any new AI system before deployment.
- Ensure this policy is reviewed annually and updated to reflect changes in technology or regulation.

6.2 DATA PROTECTION OFFICER${data.dpoName ? ` (${data.dpoName})` : ""}
- ${data.dpoName ? data.dpoName : "The designated DPO"} is responsible for overseeing NDPA/NDPR compliance for all AI systems.
- Conduct or commission Data Protection Impact Assessments (DPIAs) for high-risk AI tools.
- Serve as the point of contact with the Nigeria Data Protection Commission (NDPC).
- Investigate and report any data breaches involving AI systems.

6.3 ICT COORDINATOR / TECHNOLOGY TEAM
- Maintain an approved register of AI tools in use at the school.
- Manage access controls and ensure AI platforms are securely configured.
- Monitor AI systems for anomalies, failures, and security vulnerabilities.
- Provide technical input into AI risk assessments.

6.4 TEACHING STAFF
- Use AI tools responsibly and in accordance with this policy.
- Inform students clearly about when AI is being used in teaching, assessment, or feedback.
- Review all AI-generated content before delivery to students.
- Report concerns or incidents involving AI tools to the ICT coordinator.

6.5 STUDENTS
- Use AI tools only as permitted by individual subject teachers and this policy.
- Disclose any AI assistance in submitted work as required.
- Report inappropriate AI-generated content or interactions to a teacher or administrator.
- Respect the privacy of fellow students — do not use AI tools to generate content involving other students without consent.

6.6 PARENTS AND GUARDIANS
- ${isUnder18 ? "Provide informed consent for their child's use of AI tools where required." : "Stay informed about AI tools used in the institution through official communications."}
- Report concerns about AI use affecting their child to the school administration.
- Engage in AI literacy conversations with their children.


7. AI RISK ASSESSMENT AND VENDOR MANAGEMENT

7.1 All new AI tools or platforms must undergo a Risk Assessment before deployment. The assessment shall cover:
   - Data privacy risks (NDPA/NDPR compliance)
   - Algorithmic bias risks
   - Student safety and wellbeing risks
   - Cybersecurity and data breach risks
   - Impact on student cognitive development

7.2 Third-party AI vendors must:
   - Provide a signed Data Processing Agreement (DPA)
   - Confirm they do not use student data for AI model training without consent
   - Disclose data storage locations and cross-border transfer safeguards
   - Notify the school within 48 hours of any security incident affecting school data

7.3 The school maintains an AI Tool Register (maintained by the ICT coordinator) listing all approved AI tools, their purposes, data processed, vendor contact, and last review date.


8. STUDENT DATA PROTECTION

8.1 Student personal data processed by AI systems includes: name, age, academic performance, attendance, behavioural records, and ${data.boardingSchool ? "residential and health records" : "contact information"}.

8.2 ${isUnder18 ? "Given that students include minors (under 18), parental or guardian consent is required before enrolling a student in any AI-powered platform beyond the school's core management system." : "Students aged 18 and above may provide their own consent for AI platform use."}

8.3 Students (and parents/guardians for minors) have the right to:
   - Access their personal data held by AI systems
   - Request correction of inaccurate data
   - Object to automated decision-making affecting their rights
   - Request erasure of data upon leaving the school (subject to lawful retention obligations)

8.4 The school will not share student data with AI vendors for commercial purposes, advertising, or secondary uses beyond the stated educational purpose.


9. ACADEMIC INTEGRITY

9.1 ${data.schoolName} prohibits academic dishonesty related to AI use, including:
   - Submitting AI-generated work as entirely one's own without disclosure
   - Using AI to complete examination or assessment tasks where prohibited
   - Using AI to impersonate or misrepresent another person

9.2 Teachers must clearly communicate to students — at the beginning of each term and for each assignment — whether and how AI tools may be used.

9.3 AI content detection tools may be used as one factor in academic integrity investigations. They shall not be used as sole or conclusive evidence of misconduct. Students must be given the opportunity to respond to any allegation.

9.4 Penalties for AI-related academic misconduct will follow the school's existing disciplinary framework.


10. STAFF TRAINING AND AI LITERACY

10.1 All staff must complete AI awareness training within their first term of employment and annually thereafter. Training covers: this policy, AI safety risks, data protection obligations, and appropriate AI use in the classroom.

10.2 The school will provide structured AI literacy education for students, appropriate to their level:
   - ${data.schoolType === "primary" ? "Primary: Basic digital citizenship, understanding what AI is and is not, critical evaluation of information sources." : ""}
   - ${data.schoolType === "secondary" ? "Secondary: AI literacy as part of ICT curriculum; understanding AI bias, data privacy, and responsible use; career pathways in AI." : ""}
   - ${data.schoolType === "tertiary" ? "Tertiary: Advanced AI ethics, governance frameworks, discipline-specific AI applications, and research integrity in the age of AI." : ""}

10.3 Teachers using AI for grading or assessment must receive specific training on the limitations, bias risks, and proper human-oversight practices for those tools.


11. INCIDENT RESPONSE

11.1 Any AI-related incident (data breach, harmful AI output, bias event, security failure, student welfare concern) must be reported to the ICT coordinator and ${data.dpoName ? data.dpoName : "the designated DPO"} within 24 hours of discovery.

11.2 The school will maintain a log of all AI-related incidents and their resolutions.

11.3 Where a data breach involving student personal data occurs, the NDPC will be notified within 72 hours and affected data subjects notified promptly.

11.4 If a student is identified as being at risk through AI monitoring (e.g., expressions of self-harm in AI interactions), the school counsellor and relevant pastoral staff must be notified immediately, and standard safeguarding procedures activated.


12. POLICY REVIEW

This policy shall be reviewed:
- Annually, as a minimum
- Upon adoption of any new significant AI system
- Upon changes to applicable regulations (NDPA, NDPR, ISO 42001, ISO 27001, or AU frameworks)
- Following any significant AI-related incident

The next scheduled review is: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}


13. CONTACT AND REPORTING

For questions, concerns, or to report an AI-related incident:

Institution: ${data.schoolName}
Location: ${data.location}, ${data.state}, ${data.country}
Responsible Officer: ${data.principalName}
${data.dpoName ? `Data Protection Officer: ${data.dpoName}` : ""}
Email: ${data.contactEmail}
${data.mode === "consultant" && data.consultantOrg ? `Technology Consultant: ${data.consultantOrg}` : ""}


─────────────────────────────────────────────────────────────────────
ACKNOWLEDGEMENT AND ADOPTION

This policy has been reviewed and adopted by the management of ${data.schoolName}.

Signed: _________________________ Date: _________________
${data.principalName}
${data.schoolType === "primary" ? "Head Teacher" : data.schoolType === "secondary" ? "Principal" : "Provost / Vice Chancellor"}
${data.schoolName}

─────────────────────────────────────────────────────────────────────
Prepared by Harmony Digital Consults Ltd
Version 1.0 | ${today()}
Frameworks: NDPA/NDPR (Nigeria) | ISO/IEC 42001:2023 | ISO/IEC 27001 | AU Continental AI Strategy 2024
─────────────────────────────────────────────────────────────────────
`.trim();

  return policy;
}
