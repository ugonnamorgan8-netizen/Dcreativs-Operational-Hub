# D'Creativs Operations Hub — Complete System Specification

> **Document Source:** Extracted and synthesized from the *D'Creativs Operations Hub Product Build Brief* (Pages 1–6) & UI Specifications (Pages 1–5 of UX Pilot exports).  
> **Target Audience:** Product Engineers, Architects, and Implementation Leads.  
> **Status:** Authoritative Foundation for Development.

---

## 1. Product Guideline & Core Vision

### 1.1 What to Build
An internal, installable Progressive Web Application (PWA) for managing cross-department creative and technical delivery, shared information, multi-tier approvals, and organizational operations across an eight-founder creative technology agency and its staff.

- **Role-Specific Dashboards:** Each user receives a dashboard tailored to their specific duties and authorized scopes.
- **Unified Record Layer:** Underlying project records, tasks, deliverable versions, and decisions are shared across departments but strictly permission-controlled.
- **Executive Governance:**
  - **CEO (Pleasant Johnson / Xant):** Retains full company oversight, leadership appointments, organization ownership, and board seat activation.
  - **COO (Morgan):** Directs day-to-day operations, resolves cross-team blockers, manages delivery groups, Academy operations, and capacity.

### 1.2 Suite Structure & Boundaries
- **Single Modular Codebase & Identity Authority:** The Operations Hub acts as the single source of truth for identities, access credentials, and shared notifications.
- **Three Core Business Domains:**
  1. **Operations Hub:** Identities, access control, projects, tasks, reviews, handovers, company communication.
  2. **Academy Delivery Manager:** Cohort sessions, lesson readiness, student progress, tutor allocations.
  3. **Purchase & Subscription Desk:** Spending commitments, software tools, licenses, invoices, reserve records.
- **Account Rule:** Never maintain three disparate staff account databases; all modules authenticate against the Hub's centralized identity.
- **Client Access Boundary:** External clients do **not** receive internal staff accounts. Client reviews operate through an external, authenticated integration (e.g. n8n webhook adapter).

### 1.3 Departmental & Workspace Taxonomy
- **Departments (10):**
  1. Web and Digital Products
  2. AI and Automation
  3. Brand and Graphic Design
  4. 3D and Motion
  5. Content and Video
  6. Marketing and Social
  7. Academy
  8. Operations
  9. People (HR)
  10. Finance
- **Workspace Labels (Configurable Contexts):**
  - `Build` (Engineering & Digital Products)
  - `Studio` (Design, Motion & Creative Brand)
  - `Blenders` (3D, CGI & Rendering)
  - `Feed` (Content, Social & Marketing)
  - `Official` (Executive, Finance & Legal)
  - `Mainframe` (Core Automation, Infrastructure & Internal Systems)
  *Rule: A workspace switcher switches context and filters views, never escalates permissions.*

### 1.4 Working Defaults
- **Timezone:** Display all user-facing dates in `Africa/Lagos` (WAT, UTC+1) with clear, unambiguous labels. Store all database event timestamps in UTC (`TIMESTAMPTZ`).
- **Individual Preferences:** Per-person working days, quiet hours, and availability status.
- **Configurability:** Names, departments, job titles, and financial approval thresholds must be editable through authorized administrative settings.

---

## 2. Role Model & Governance

### 2.1 Distinction Between Roles, Dashboards, and Offices
- A **role** is a set of duties and permission grants.
- A **dashboard** is an actionable view over permitted records.
- **Separation of Concerns:** Job titles, department assignments, board seats, and executive offices are stored separately. A single individual may hold multiple offices (e.g., Pleasant Johnson serving as CEO and interim CFO) without accidental privilege escalation.

### 2.2 Executive Leadership Matrix

| Role | Initial Holder | Primary Scope & Duties | Governance Restrictions |
|---|---|---|---|
| **CEO** | Pleasant Johnson (Xant) | Full company portfolio, operations, finance, people, and all module reports. Final decisions and company health. | Owns leadership appointment, board seat grants, and org ownership. Subject to quality reviews for creative tasks. |
| **COO** | Morgan | All operational projects, delivery groups, Academy operations, staffing capacity, planning and tool budgets. Clears cross-team blockers. | Cannot transfer org ownership, change CEO-only settings, or grant board seats. |
| **CFO** | Xant (Interim) | Budgets, commitments, payments, invoices, subscriptions, and reserve records. Approves financial requests within policy limits. | Role can move to another person in the future without altering the CEO account. |
| **CPO** | Kingsley | Project portfolio, timelines, quality standards, review queues, and final deliverable release across Build, Studio, and Blenders. | Sole authority (or explicit delegate) for final deliverable quality sign-off. |
| **CHRO** | Estella | Recruitment, staff records, onboarding, offboarding, conduct, and employee development. Runs people-related decisions. | HR files and banking records are confidential and isolated from general staff. |
| **CMO** | *To be confirmed* (Nina Williams placeholder) | Campaigns, content plans, social publishing calendar, marketing performance. Administers Feed and Official workspaces. | Requests creative work through the CPO; cannot self-approve creative release. |
| **Board** | 8 Named Seats (Seeded pending) | CEO-approved board workspace, board packs, minutes, and decision records. | No automatic access to HR files, payments, client projects, or executive dashboards. |

### 2.3 Board Approval Lifecycle
- **Seed 8 Empty/Pending Seats:** Seats are numbered 1 through 8.
- **Invitation & Verification:** Real individuals are invited and verified; no fictitious accounts.
- **Approval Process:** A seat starts in `PENDING` state. Approval requires explicit CEO action recording:
  - `scope` (standard board pack access or customized resources)
  - `reason` (rationale for appointment)
  - `approver_id` (CEO user ID)
  - `start_date` and optional `expiry_date`
- **Revocation:** Revocation immediately terminates board pack access without affecting the user's staff role (e.g., a founder who is also a designer continues their design tasks uninterrupted).

---

## 3. Staff Dashboards, Permissions & Overlap

### 3.1 Staff Dashboard Variants
1. **Developer:** Assigned builds, tasks, repo/preview links, QA defects, release checklists, design specs. No access to unrelated clients or finance.
2. **AI / Automation Engineer:** Assigned workflows, automation versions, run summaries, incidents, handover docs. Technical deliverables shared with project team; API keys and secrets strictly hidden.
3. **Brand / Graphic Designer:** Briefs, brand assets, design versions, review comments for assigned projects. Collaboration with content and development.
4. **3D / Motion Artist:** Model and scene links, render versions, preview media, export specs, review tasks. Large asset links to external approved storage.
5. **Content / Video Creator:** Scripts, shot lists, video edits, captions, version approvals. Hands approved assets to social media team via campaign membership.
6. **Social Media Manager:** Approved content library, calendar, channel tasks, publishing proof. Cannot approve creative release or view unrelated drafts.
7. **Academy Staff / Tutor:** Assigned cohorts, lesson readiness, schedules, attendance. Tutors see only their classes, not full student or HR records.
8. **Operations Coordinator:** Assignments, deadlines, resource requests, and blockers in delegated scope. Cannot promote themselves or alter finance policies.
9. **Finance / People Staff:** Scoped records delegated by CFO or CHRO. Dedicated queues; private personnel and banking records remain confidential.
10. **Contractors / Future Roles:** Governed by reusable permission templates with time-limited project scope. New role names start with zero access until configured.

### 3.2 Permission Vocabulary & Grants
Action grants formatted as `<resource>.<action>` bound to an explicit scope:
- `project.read`, `project.write`, `project.archive`
- `task.assign`, `task.complete`, `task.block`
- `deliverable.submit`, `deliverable.review`, `deliverable.release`
- `budget.propose`, `budget.approve`, `payment.record`
- `board.grant`, `board.revoke`, `board.read_pack`

**Scope Boundaries:** `organization`, `department`, `project`, `cohort`, or `record`.  
*Security Rule:* Deny by default. Role permissions combine only within approved scopes. Never use blanket `role === 'admin'` shortcuts.

### 3.3 Cross-Team Handover Lifecycle
```
[CMO] Submits Campaign Brief 
   │
   ▼
[CPO] Accepts & Assigns Creative Work to Designer/Artist
   │
   ▼
[Staff] Produces & Uploads Immutable Deliverable (v1, v2...)
   │
   ▼
[CPO] Reviews Version: Requests Changes (v2 -> v3) OR Approves Release
   │
   ▼
[CMO / Social Staff] Receives Approved Asset for Publishing
   │
[COO] Monitors Progress, Workload & Intervenes on Blockers
[CHRO] Oversees Onboarding & Resource Availability
[CFO] Oversees Financial Approvals & Spending
```

---

## 4. Architecture, Data Model & Security

### 4.1 Recommended Baseline Stack
- **Frontend & App Shell:** TypeScript, React (Next.js / Vite), Vanilla/Tailwind CSS with strict design tokens.
- **Backend & Database:** PostgreSQL with Supabase Auth, Row-Level Security (RLS), private Storage buckets, and Realtime engine.
- **Background Worker:** Server-side asynchronous job worker implementing the Transactional Outbox pattern.
- **PWA Engine:** Service Worker, offline fallback shell, Web App Manifest.

### 4.2 Data Model Entities
The schema requires 24 core relational entities with UUID primary keys:
1. `organizations`: Tenant root.
2. `profiles`: User identity, name, avatar, email, phone, timezone, quiet hours.
3. `memberships`: User-to-organization membership and employment status.
4. `departments`: 10 core organizational departments.
5. `roles`: Base role definitions (CEO, COO, CPO, CFO, CHRO, CMO, Staff, Contractor, Board).
6. `permissions`: Atomic action grants.
7. `scoped_role_assignments`: Role bindings to specific scopes (org, dept, project).
8. `projects`: Creative and technical projects with stage, client, and dates.
9. `project_members`: User assignments to projects with scoped duties.
10. `tasks`: Actionable items with owners, watchers, deadlines, dependencies, checklist.
11. `dependencies`: Graph of prerequisite tasks.
12. `deliverables`: Top-level deliverable artifacts.
13. `deliverable_versions`: Immutable version records (checksum, files, author, submission notes, timestamp).
14. `reviews`: Review decisions tied to specific versions (status, notes, reviewer_id).
15. `channels`: 1:1 and group communication channels.
16. `channel_members`: Scoped membership controlling visibility.
17. `messages`: Durable messages with mentions and receipts (sent, delivered, read).
18. `attachments`: Pointers to private storage assets (never public URLs).
19. `share_grants`: Explicit time-limited access grants for specific files/records.
20. `board_seats`: 8 numbered seats with appointment lifecycle.
21. `board_access_grants`: Audit-backed CEO grants for board workspace access.
22. `board_packs`: Highly restricted governance documents and packs.
23. `decisions`: Formal executive and board decision records.
24. `notification_events` & `notification_recipients`: Durable outbox events and recipient inbox entries.
25. `push_subscriptions`: Web Push endpoints with keys and device metadata.
26. `outbox_jobs`: Queue for asynchronous dispatch of emails/push.
27. `audit_events`: Append-only security audit log (actor, action, resource, diff, reason, timestamp, correlation_id).

### 4.3 Authorization & Security Implementation
- **Deny by Default:** Identity derived exclusively from verified session tokens, never from client-supplied claims.
- **Append-Only Audit Logging:** Every permission grant, board modification, deliverable release, and financial approval writes an immutable audit record.
- **Zero Information Leakage:** Unauthorized requests and `/access-denied` routes must not leak existence, titles, counts, or thumbnails of forbidden records.
- **Asset Privacy:** Files stored in private buckets with expiring signed URLs (temporary read access).

---

## 5. Delivery Workflows & Event Processing

### 5.1 Project Delivery Lifecycle
`Intake` ➔ `Planned` ➔ `In Progress` ➔ `Internal Review` ➔ `Changes Requested` OR `Approved` ➔ `Released` ➔ `Archived`.

- **Deliverable Immutability:** Each version is frozen with author, files, SHA-256 checksum, notes, and timestamp.
- **Version Invalidation Rule:** Submitting a new version (e.g. v3) invalidates readiness of v2; previous reviews are preserved in history rather than overwritten.
- **Release Authority:** Requires CPO or an explicit delegate. CEO may record a business override with required documentation.

### 5.2 Reliable Messaging & Durable Inbox
- **Transactional Outbox:** Business mutations write outbox events in the same atomic transaction.
- **Recipient Inbox Table:** Worker resolves authorized recipients, generating durable inbox rows.
- **Receipt States:** Message sent ➔ delivered to inbox ➔ read by user.
- **Push Notification Safety:** Push notifications default to generic copy (*"You have a new update in D'Creativs Hub"*) to prevent leaking confidential financial, HR, or client names on lock screens.

---

## 6. Installability, PWA & Integrations

### 6.1 Progressive Web App (PWA)
- **Manifest Requirements:** Valid Web App Manifest with `name`, `short_name`, `theme_color`, `background_color`, `display: standalone`, and maskable icons.
- **Service Worker:** App shell caching, network-first strategy for dynamic data, offline fallback view.
- **Install Guidance:** Contextual banner with browser-specific steps (iOS Safari "Add to Home Screen", Chromium install prompt).

### 6.2 Offline Behavior
- Displays cached application shell and an explicit offline banner.
- Sensitive records (financial ledger, HR files, board packs) are **not** persisted in offline caches.
- Mutating actions (approvals, uploads, role edits) are disabled offline. Draft messages may be preserved locally in session state with explicit notice.

### 6.3 External Integration & Boundaries
- Expose authenticated, versioned internal REST endpoints for Academy and Purchasing desks.
- n8n Client Review adapter: Validates server-to-server callbacks and deduplicates events. Client feedback never marks internal tasks complete without internal sign-off.
