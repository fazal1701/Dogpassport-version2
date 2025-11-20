# DOG PASSPORT MVP0 — IMPLEMENTATION PLAYBOOK
**Version 1.0** | Execution Roadmap for Senior Architects

---

## EXECUTIVE SUMMARY

This playbook provides a **14-week build plan**, **team structure**, **git workflow**, **deployment strategy**, and **vendor/infrastructure decisions** based on enterprise deployment experience. It's designed for someone who has orchestrated multi-team integrations (Salesforce, ERP, network infra).

**Key Principles:**
1. **Infrastructure-as-Code:** All setup reproducible and versionable.
2. **Clear Separation of Concerns:** Frontend, backend, AI, data layers independent.
3. **Staged Rollout:** MVP0 (public QR), MVP1 (vet portal), MVP2 (airline rules).
4. **Vendor Lock-in Minimization:** Use AWS + open standards where possible.
5. **Team Scaling Path:** Start 3-4 devs, onboard additional by week 8.

---

## SECTION 1: TEAM STRUCTURE & ROLES

### 1.1 Core MVP0 Team (Weeks 1-14)

| Role | Title | Responsibility | FTE | Start |
|------|-------|-----------------|-----|-------|
| **Technical Lead** | Senior Full-Stack Eng | Architecture, code review, API design | 1.0 | Week 1 |
| **Backend Eng** | Senior Backend Eng | API routes, DB schema, auth, jobs queue | 1.0 | Week 1 |
| **Frontend Eng** | Senior React Eng | Pages, components, UI state, forms | 1.0 | Week 1 |
| **DevOps Eng** | Infra / DevOps (part-time) | AWS setup, CI/CD, monitoring | 0.5 | Week 1 |
| **Design Lead** | Product Designer | High-fidelity Figma, design system, QA | 1.0 | Week 1 |
| **Product Manager** | Product Manager | Prioritization, user feedback, spec clarity | 1.0 | Week 1 |

**Week 8 Expansion (+2 FTE):**
- QA Automation Engineer (1.0)
- Junior Full-Stack Engineer (1.0)

**Total Payroll (MVP0):** ~$900k-$1.2M over 14 weeks (senior rates).

### 1.2 Communication Cadence

| Frequency | Format | Attendees | Purpose |
|-----------|--------|-----------|---------|
| Daily | 15min standup | All | Blockers, progress |
| Bi-weekly | Design sync | Tech Lead, Designer | UI handoff, feedback |
| Bi-weekly | Product sync | PM, Tech Lead, Designer | Spec review, pivot decisions |
| Weekly | All-hands | Everyone | Executive updates, morale |
| Monthly | Retrospective | All | Process improvement |

---

## SECTION 2: DEVELOPMENT PHASES (14 WEEKS)

### 2.1 Phase 1: Foundation (Weeks 1-3)

**Goals:** Infrastructure ready, auth working, base components built.

**Backend (1.0 FTE)**
- [ ] PostgreSQL + Prisma schema (users, dogs, records, passports, jobs)
- [ ] NextAuth setup (email/password auth flow)
- [ ] S3 bucket configuration + upload handler
- [ ] API route scaffolding (all endpoints stubbed)
- [ ] Mock AI layer (deterministic document parsing)
- [ ] Job queue setup (simple Redis or Bull)
- [ ] Unit tests (50% coverage)

**Frontend (1.0 FTE)**
- [ ] Tailwind + design system setup (colors, spacing, typography)
- [ ] Component library (Card, Button, Badge, StatusIndicator, Spinner, Modal, Toast)
- [ ] Auth flow UI (login, signup, password reset)
- [ ] App layout (Navbar, BottomNav, sidebar responsive)
- [ ] Zustand or Context state management setup
- [ ] Error boundary + loading fallbacks

**DevOps (0.5 FTE)**
- [ ] AWS account setup (VPC, RDS instance, S3 buckets)
- [ ] GitHub repo + branch protection rules
- [ ] GitHub Actions CI/CD pipeline (lint, test, deploy)
- [ ] Monitoring setup (CloudWatch, error tracking)
- [ ] Secrets management (AWS Secrets Manager)

**Design (1.0 FTE)**
- [ ] Figma file setup + component library
- [ ] High-fidelity screens (login, dashboard, passport, upload)
- [ ] Design system documentation
- [ ] Handoff specs (spacing, colors, typography with code values)

**Deliverable:** Deployed staging environment, auth working, component library in Storybook.

---

### 2.2 Phase 2: Core Features (Weeks 4-8)

**Goals:** Dog management, record upload, passport view all functional.

**Backend (1.0 FTE)**
- [ ] Dog CRUD endpoints fully implemented (with tests)
- [ ] Record upload + file storage (S3)
- [ ] AI processing job flow (upload → queue → process → result)
- [ ] Passport generation + QR token logic
- [ ] Record filtering + search (by type, status, expiry)
- [ ] Error handling + validation (zod schemas)
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Integration tests (API routes)

**Frontend (1.0 FTE)**
- [ ] Dashboard page (dog list, health summary)
- [ ] Dog profile form (create + edit)
- [ ] Passport page (header, record list, QR display)
- [ ] Upload widget (drag & drop, processing, result states)
- [ ] Record detail modal (edit/delete)
- [ ] Form validation + error states
- [ ] Optimistic UI updates
- [ ] Mobile responsive refinements

**DevOps (0.5 FTE)**
- [ ] Database backup automation (daily snapshots)
- [ ] Staging → production promotion workflow
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Log aggregation setup

**Design (1.0 FTE)**
- [ ] Final pixel-perfect designs (all main screens)
- [ ] Animation specs (micro-interactions)
- [ ] Icon set finalization (20x20, 24x24 grid)
- [ ] Design handoff documentation

**QA (new, 1.0 FTE, starts week 8)**
- [ ] Test plan for upload flow
- [ ] Manual testing (all platforms)
- [ ] Accessibility audit (WCAG 2.1 AA)

**Deliverable:** Core product loop working (signup → create dog → upload record → view passport).

---

### 2.3 Phase 3: Enhancement & QR (Weeks 9-11)

**Goals:** QR verification public page, travel mode, refinements.

**Backend (1.0 FTE)**
- [ ] Public QR verification endpoint (passwordless or with pwd)
- [ ] QR scan tracking (analytics)
- [ ] Travel mode checklist logic (rule engine)
- [ ] DOT form mock PDF generation
- [ ] Rate limiting + abuse prevention
- [ ] API versioning (v1/ routes)

**Frontend (1.0 FTE)**
- [ ] Public verification page (QR scanned landing)
- [ ] Travel mode page (checklist, score, DOT form button)
- [ ] Settings page (dog, user, notifications)
- [ ] Share flow (copy link, QR print, SMS/email)
- [ ] Performance optimization (code splitting, lazy load)
- [ ] SEO basics (meta tags, open graph)

**QA (1.0 FTE)**
- [ ] E2E test suite (Cypress: signup → upload → share)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, mobile)
- [ ] Performance testing (lighthouse, load times)
- [ ] Security testing (SQL injection, XSS, CORS)

**New Junior Dev (1.0 FTE, starts week 8)**
- [ ] Documentation page setup (guides, FAQs)
- [ ] Email notification templates
- [ ] Seed data for testing / demo

**Deliverable:** Public QR verification working, travel mode functional, security review passed.

---

### 2.4 Phase 4: Polish & Launch (Weeks 12-14)

**Goals:** Bug fixes, performance, launch readiness.

**All Hands:**
- [ ] Bug triage & prioritization
- [ ] Performance optimization (< 2s page load)
- [ ] Accessibility final pass (keyboard navigation)
- [ ] Legal review (privacy policy, terms, ADA compliance doc)
- [ ] Marketing assets (landing page, demo video)
- [ ] Customer support setup (email, chat)
- [ ] Monitoring dashboards (uptime, error rates, QA checks)

**Launch Checklist:**
- [ ] Prod database backup strategy
- [ ] Disaster recovery test (can restore prod in < 1 hour)
- [ ] Status page setup (status.dogpassport.app)
- [ ] Incident response runbook
- [ ] On-call schedule
- [ ] Go/no-go decision meeting

**Deliverable:** Production-ready system, go-live ready.

---

## SECTION 3: GIT WORKFLOW & BRANCHING

### 3.1 Branch Strategy (Git Flow variant)

```
main (production)
  ↑
  ├── hotfix/* (prod bugs)
  │   └─ hotfix/qr-verification-null-check
  │
release (staging)
  ↑
  ├── release/* (release prep)
  │   └─ release/v1.0.0
  │
develop (integration)
  ↑
  ├── feature/* (feature branches)
  │   ├─ feature/dog-crud-api
  │   ├─ feature/upload-widget-ui
  │   └─ feature/travel-mode
  │
  ├── bugfix/* (bug fixes on develop)
  │   └─ bugfix/pagination-offset-issue
  │
  └── chore/* (non-functional)
      └─ chore/update-dependencies
```

### 3.2 Branch Naming Conventions

```
feature/<jira-id>-<short-desc>
  feature/DOG-42-dog-profile-crud

bugfix/<jira-id>-<short-desc>
  bugfix/DOG-18-record-filter-empty-state

hotfix/<jira-id>-<short-desc>
  hotfix/DOG-99-prod-qr-token-generation

release/v<major>.<minor>.<patch>
  release/v1.0.0

chore/<short-desc>
  chore/update-tailwind-deps
```

### 3.3 Pull Request Process

1. **Developer** pushes to feature branch
2. **CI/CD** runs automatically:
   - Linting (eslint, prettier)
   - Type checking (TypeScript)
   - Unit tests (Jest)
   - Build check (vercel build)
3. **Reviewer** (Code Owner) reviews:
   - Architecture alignment
   - No hardcoded secrets
   - Test coverage > 70%
   - Performance impact
4. **Approval + Merge** to develop
5. **Deploy to staging** (automatic)
6. **QA testing** on staging
7. **Release promotion** (weekly or on demand)

### 3.4 Git Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, test, chore, ci
**Scope:** api, ui, db, auth, upload, travel, qr, etc.
**Subject:** Present tense, lowercase, < 50 chars

**Example:**
```
feat(upload): add mock ai record extraction

- Implement deterministic document parsing
- Support PDF, JPG, PNG file types
- Return confidence score and extracted fields
- Add job queue integration

Closes DOG-42
```

---

## SECTION 4: DEPLOYMENT STRATEGY

### 4.1 Infrastructure Stack

| Layer | Choice | Rationale | Cost (Mo) |
|-------|--------|-----------|-----------|
| **Compute** | Vercel (Next.js) | Seamless edge functions, built-in CI/CD | $50-150 |
| **Database** | AWS RDS PostgreSQL | Managed, backups, multi-AZ ready | $100-200 |
| **File Storage** | AWS S3 | Industry standard, cost-effective, CDN ready | $20-50 |
| **Authentication** | NextAuth (custom) | OSS, full control, works with session | Free |
| **Email** | SendGrid or Resend | Transactional emails, deliverability | $20-50 |
| **Background Jobs** | AWS SQS + Lambda | Managed, scales automatically | $10-30 |
| **Monitoring** | Vercel + CloudWatch | Built-in observability, custom metrics | $30 |
| **CDN** | Vercel Edge | Included with hosting | Included |
| **Secrets** | AWS Secrets Manager | Vault for API keys, DB creds | $5 |

**Total Infrastructure:** $235-515/month (MVP0 scale)

### 4.2 Deployment Environments

| Env | URL | Branch | Data | Auto-Deploy | Approval |
|-----|-----|--------|------|-------------|----------|
| **Dev** | localhost:3000 | feature/* | Local DB | Manual | N/A |
| **Staging** | staging.dogpassport.app | develop | Prod-like | On develop push | QA |
| **Production** | dogpassport.app | main | Real | On main push | CTO sign-off |

### 4.3 CI/CD Pipeline (.github/workflows/deploy.yml)

```yaml
name: Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit -- --coverage
      - run: npm run build

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm run start
          spec: cypress/e2e/**/*.cy.ts

  deploy-staging:
    needs: [lint-and-test, e2e-tests]
    if: github.ref == 'refs/heads/develop' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_STAGING }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    needs: [lint-and-test, e2e-tests]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_PROD }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          production: true
```

### 4.4 Database Migration Strategy

```bash
# Local development
npm run db:migrate -- dev

# Staging
npm run db:migrate -- staging

# Production (manual approval)
npm run db:migrate -- prod --dry-run  # preview
npm run db:migrate -- prod            # execute
```

**Schema Changes:**
- **Backwards compatible** (add column with default, don't remove)
- **Zero-downtime:** Migrate DB → deploy code → cutover
- **Rollback plan:** Snapshot before each migration

---

## SECTION 5: VENDOR & INTEGRATION DECISIONS

### 5.1 Authentication: NextAuth vs. Firebase vs. Auth0

| Criteria | NextAuth | Firebase | Auth0 |
|----------|----------|----------|-------|
| **Cost** | Free (OSS) | Free tier, then $25-150/mo | $25-1000/mo |
| **Control** | Full | Limited | Full |
| **Setup Effort** | 3-5 days | 1-2 days | 1 day |
| **Lock-in Risk** | None (OSS) | High (Firebase ecosystem) | Moderate |
| **Scaling** | Session-based, works great | Good | Excellent |
| **Recommendation** | ✓ MVP0 | Phase 2 | Enterprise only |

**Decision:** NextAuth (custom email/password) → Auth0 for Phase 2 if team growth outpaces DevOps capacity.

### 5.2 File Storage: S3 vs. Firebase vs. Cloudinary

| Criteria | S3 | Firebase | Cloudinary |
|----------|----|----|-----------|
| **Cost** | $0.023/GB | Generous free tier | $10-99/mo |
| **Setup** | 1 day | 30 min | 30 min |
| **Image Opt** | Manual (Lambda) | Built-in | Built-in |
| **Lock-in** | None | High | Moderate |
| **Recommendation** | ✓ MVP0 | Phase 2 | Nice-to-have Phase 2 |

**Decision:** AWS S3 (with Vercel Edge caching) → Add Cloudinary in Phase 2 for image optimization.

### 5.3 Background Jobs: Bull + Redis vs. AWS SQS vs. Pub/Sub

| Criteria | Bull/Redis | AWS SQS | Pub/Sub |
|----------|----------|---------|---------|
| **Cost** | $6-30/mo (redis) | $0-5/mo | $1-20/mo |
| **Setup** | 1 day | 30 min | 30 min |
| **Reliability** | Good | Excellent | Excellent |
| **Scaling** | Requires management | Automatic | Automatic |
| **Recommendation** | MVP0 simple | MVP1+ | Not needed |

**Decision:** Bull + Redis for MVP0 (simple, works locally). Migrate to SQS + Lambda when job volume > 1k/day.

### 5.4 Email: SendGrid vs. Mailgun vs. Resend

| Criteria | SendGrid | Mailgun | Resend |
|----------|----------|---------|---------|
| **Cost** | $0-250/mo | $0-150/mo | $20-100/mo |
| **Transactional** | Excellent | Excellent | Excellent |
| **Setup** | 1 day | 1 day | 30 min |
| **React Templates** | No | No | Yes |
| **Recommendation** | ✓ MVP0 | Phase 2 | Future (React emails) |

**Decision:** SendGrid for MVP0 (industry standard). Move to Resend Phase 2 if doing React email.

### 5.5 Analytics & Monitoring

| Tool | Purpose | Cost | Decision |
|------|---------|------|----------|
| **Vercel Analytics** | Page speed, traffic | Included | Use |
| **Sentry** | Error tracking | $0-100/mo | $50/mo plan |
| **LogRocket** | Session replay | $0-150/mo | Skip MVP0, add Phase 2 |
| **Mixpanel** | Product analytics | $0-30/mo | Skip, use Vercel only |

**Decision:** Vercel + Sentry (error tracking). Add LogRocket in Phase 2 for UX debugging.

---

## SECTION 6: SECURITY & COMPLIANCE

### 6.1 Data Protection

| Layer | Control | Implementation |
|-------|---------|-----------------|
| **Transport** | TLS 1.3 | Vercel auto-HTTPS |
| **Auth** | Sessions | Encrypted JWT + httpOnly cookie |
| **DB** | Encryption at rest | AWS RDS encryption |
| **S3 Files** | Server-side encryption | AES-256 |
| **Secrets** | Vault | AWS Secrets Manager |
| **API** | Rate limiting | Vercel edge middleware |

### 6.2 Compliance Checklist

| Standard | Requirement | Status | Notes |
|----------|-------------|--------|-------|
| **HIPAA** | NOT required | N/A | Pet data, not human health |
| **GDPR** | Data export, deletion | Implement | EU users must export/delete |
| **CCPA** | Privacy policy, opt-out | Implement | CA users rights |
| **PCI-DSS** | No payment MVP0 | N/A | Add Phase 2 |
| **SOC 2** | Optional Phase 2 | Plan | Not required for MVP0 |

### 6.3 Secrets Management

```bash
# Never commit secrets
.env.local (gitignored)
.env.production (AWS Secrets Manager)

# Local development
echo "DATABASE_URL=postgres://..." > .env.local
npm run dev

# Production (Vercel UI)
NEXT_PUBLIC_API_URL=https://dogpassport.app (OK, public)
DATABASE_URL=<vault via Vercel GUI> (secret)
NEXTAUTH_SECRET=<vault> (secret)
```

---

## SECTION 7: MONITORING & OBSERVABILITY

### 7.1 Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    app: 'ok',
    database: await checkDB(),
    s3: await checkS3(),
    timestamp: new Date().toISOString(),
  };

  const allOk = Object.values(checks).every(v => v === 'ok');
  return Response.json(checks, { status: allOk ? 200 : 503 });
}

// Monitored by: https://status.dogpassport.app (every 60s)
```

### 7.2 Key Metrics to Track

| Metric | Target | Tool | Alert |
|--------|--------|------|-------|
| **Uptime** | 99.5% | Vercel | < 99% |
| **API Latency** | < 500ms p95 | Vercel Analytics | > 1s |
| **Error Rate** | < 0.1% | Sentry | > 1% |
| **DB Connection Pool** | 80% max | CloudWatch | > 90% |
| **S3 Upload Success** | > 99% | CloudWatch | < 99% |

### 7.3 Incident Response

**On-call:** Rotating 1 dev per week (starts week 12)
**Escalation:**
- Tier 1: On-call (30 min response)
- Tier 2: Tech Lead (if > $1k/hr impact)
- Tier 3: CTO (if data loss or security)

**Post-incident:** Root cause analysis within 24h, publish findings.

---

## SECTION 8: TESTING STRATEGY

### 8.1 Test Coverage Goals

```
Unit Tests:        70% line coverage (utilities, helpers, components)
Integration Tests: Core API routes (happy path + errors)
E2E Tests:         Critical user flows (5-7 scenarios)
Manual QA:         Cross-browser, mobile, accessibility
Load Test:         1000 concurrent users (week 12)
```

### 8.2 Test Suite Structure

```
__tests__/
├── unit/
│   ├── lib/ (validators, utils, api-client)
│   ├── components/ (atomic components: Button, Badge)
│   └── pages/ (page rendering snapshots)
├── integration/
│   ├── api/ (route handlers + real DB)
│   └── auth/ (login, signup, session)
└── e2e/
    ├── cypress/
    │   ├── auth.cy.ts (login flow)
    │   ├── upload.cy.ts (drag/drop, processing)
    │   ├── passport.cy.ts (view, QR, share)
    │   └── travel.cy.ts (checklist, DOT form)
    └── lighthouse.cy.ts (performance)
```

### 8.3 Example Unit Test

```typescript
// components/__tests__/Badge.test.tsx
import { render, screen } from '@testing-library/react';
import Badge from '@/components/shared/Badge';

describe('Badge', () => {
  it('renders verified status with checkmark', () => {
    render(<Badge status="verified">Verified</Badge>);
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('text-green-600');
  });

  it('renders expiring_soon status with warning color', () => {
    render(<Badge status="expiring_soon">Expiring Soon</Badge>);
    expect(screen.getByText('Expiring Soon')).toHaveClass('bg-amber-100');
  });
});
```

### 8.4 Example E2E Test

```typescript
// cypress/e2e/upload.cy.ts
describe('Upload Flow', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/dogs/dog-123/records/new');
  });

  it('uploads a file and processes it', () => {
    // Upload
    cy.get('[data-testid=upload-zone]').selectFile('cypress/fixtures/rabies.pdf', {
      force: true,
    });

    // Wait for processing
    cy.get('[data-testid=spinner]').should('be.visible');
    cy.get('[data-testid=result]', { timeout: 10000 }).should('be.visible');

    // Verify result
    cy.get('[data-testid=result-title]').should('contain', 'Rabies Vaccination');
    cy.get('[data-testid=result-expiry]').should('contain', '03/15/26');

    // Save
    cy.get('[data-testid=save-button]').click();
    cy.get('[data-testid=success-toast]').should('contain', 'Record Added');
  });
});
```

---

## SECTION 9: HANDOFF TO TEAM

### 9.1 Onboarding Checklist (New Dev)

- [ ] Clone repo + run `npm install && npm run dev`
- [ ] Read this playbook (sections 1-3)
- [ ] Read architecture document (dog-passport-arch.md)
- [ ] Read UI specs (dog-passport-ui.md)
- [ ] Add SSH key to GitHub
- [ ] Get AWS IAM credentials (s3, rds, secrets)
- [ ] Get Vercel account access
- [ ] Attend 30min architecture walk-through
- [ ] Pick up first task from Jira
- [ ] Do code review with Tech Lead

**Time to first commit:** < 3 hours

### 9.2 Documentation Site (Phase 2)

```
/docs
├── README.md (overview)
├── ARCHITECTURE.md (this)
├── API.md (endpoint reference)
├── COMPONENTS.md (component library)
├── SETUP.md (dev environment)
├── DEPLOYMENT.md (CI/CD, production)
├── TROUBLESHOOTING.md (common issues)
├── SECURITY.md (secrets, compliance)
└── CONTRIBUTING.md (git workflow, code style)
```

Host on: ReadTheDocs or GitHub Pages

### 9.3 Communication Channels

| Channel | Tool | Purpose |
|---------|------|---------|
| **Quick Q&A** | Slack #dev | Blocking issues, quick answers |
| **Decisions** | GitHub Discussions | Architecture, design decisions |
| **Bugs/Features** | GitHub Issues / Jira | Tracked, assigned, prioritized |
| **Code Review** | GitHub PR comments | Design feedback, nitpicks |
| **Demo/Feedback** | Slack or Zoom | Show progress, get UX feedback |

---

## SECTION 10: COST PROJECTIONS

### 10.1 Infrastructure Costs (Monthly)

| Item | Unit | Qty | Cost |
|------|------|-----|------|
| **Compute (Vercel)** | GB | 50 | $50 |
| **Database (RDS)** | db.t3.small | 1 | $120 |
| **S3 Storage** | GB | 100 | $2.30 |
| **S3 Requests** | M uploads | 10k | $15 |
| **Email (SendGrid)** | k emails | 10k | $20 |
| **Background Jobs** | M invocations | 5k | $0 (free tier) |
| **Monitoring** | services | 2 | $30 |
| **Backups** | snapshots | 30 | $30 |
| **Miscellaneous** | — | — | $30 |
| **TOTAL** | — | — | **$297/mo** |

### 10.2 Scaling Forecast (12 months)

| Month | Dogs | QR Scans | Infra Cost | Notes |
|-------|------|----------|-----------|-------|
| 0 (launch) | 500 | 100 | $297 | MVP0 |
| 3 | 5k | 2k | $400 | Early adopters |
| 6 | 25k | 15k | $650 | Vet partner integrated |
| 9 | 100k | 80k | $1,200 | Airline integrations |
| 12 | 250k | 250k | $2,500 | National scale |

**Action:** Re-architect DB sharding if dogs > 500k (year 2).

---

## APPENDIX A: LAUNCH READINESS CHECKLIST

- [ ] All tests passing (> 70% coverage)
- [ ] Lighthouse score > 90 (performance, accessibility)
- [ ] Security audit completed (penetration test optional)
- [ ] Privacy policy + terms reviewed by legal
- [ ] GDPR data export/delete working
- [ ] Prod database backup + restore tested
- [ ] Incident response runbook created
- [ ] On-call schedule published
- [ ] Status page live (status.dogpassport.app)
- [ ] Customer support email setup (support@dogpassport.app)
- [ ] Analytics tracking enabled (Sentry, Vercel)
- [ ] PR from develop → main reviewed by CTO
- [ ] Deployment to prod automated
- [ ] Smoke tests run against prod
- [ ] Team celebration 🎉

---

## APPENDIX B: COMMON GOTCHAS & MITIGATION

| Gotcha | Risk | Mitigation |
|--------|------|-----------|
| **N+1 queries** | Slow API → Timeout | Use DataLoader, joins in query |
| **S3 CORS** | File upload fails | Pre-configure CORS headers |
| **NextAuth session expiry** | User logged out | Set appropriate `maxAge` |
| **Tailwind class purge** | Styles missing | Use `safelist` for dynamic classes |
| **Vercel serverless timeout** | AI processing fails | Max 10s; use background jobs |
| **Database connection pool** | Too many connections | Monitor + scale RDS |
| **QR token collisions** | Security issue | Use UUID v4, highly unlikely |
| **File upload size** | Large PDFs fail | Compress server-side, limit 10MB |
| **Mobile Safari bugs** | iOS app fails | Test on real device (not simulator) |

---

**END OF DOCUMENT**

This playbook is ready for handoff to your CTO / VP Eng for final approval and team kickoff.

**Next Step:** Schedule architecture alignment meeting + send this doc to team.
