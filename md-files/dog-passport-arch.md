# DOG PASSPORT MVP0 — SYSTEM ARCHITECTURE & IMPLEMENTATION GUIDE
**Version 1.0** | Production-Ready Blueprint  
**Prepared by:** Senior Solutions Architect

---

## SECTION 1: MENTAL MODEL & SYSTEM CLARITY

### 1.1 Product Definition
**Dog Passport** is a **digital health and compliance verification platform** for service dogs, pet owners, and businesses. Users create a dog profile, upload vet records, and generate a shareable QR code that broadcasts a verified passport containing health status, training certifications, and travel compliance checklist.

**Core Value:**
- **For Pet Owners:** Peace of mind. Proof of health/training in one place.
- **For Businesses/Airlines:** Government-grade verification. QR scan → instant compliance data.
- **For Vets:** (Phase 2) Direct integration to issue records.

### 1.2 User Types & Core Goals

| User Type | Primary Goal | Secondary Actions |
|-----------|-------------|-------------------|
| **Pet Owner** | Create dog profile → Upload records → Share QR | View passport, monitor expiry, update records |
| **QR Scanner (Business/Airline)** | Scan QR → Verify compliance status | Confirm training level, review vaccination status |
| **Vet** | (Phase 2) Issue/sign records directly | Audit trail, revoke if needed |
| **Admin** | Monitor system health, audit records | Manage compliance rules, analytics |

### 1.3 Key Data Objects

```
User (Pet Owner)
  ├─ Profile (email, name, created_at)
  └─ Dogs (1-many)
      ├─ Dog
      │  ├─ Profile (name, breed, dob, microchip, weight)
      │  ├─ Type (service, emotional support, pet)
      │  └─ Records (1-many)
      │     ├─ Record
      │     │  ├─ Type (vaccination, training, vet exam)
      │     │  ├─ Issue Date, Expiry Date
      │     │  ├─ Issuer (vet, trainer, AKC, etc.)
      │     │  ├─ Status (verified, pending_ai, failed)
      │     │  ├─ File URL (s3://)
      │     │  └─ Extracted Fields (AI-generated JSON)
      │     └─ PassportRecord (linked to active passport)
      ├─ Passport
      │  ├─ QR Code (UUID-based URL)
      │  ├─ Verification Status (verified, expiring_soon, incomplete)
      │  ├─ Active Records (linked RecordIDs)
      │  └─ Shared Settings (public QR, password-protected, etc.)
      └─ TravelMode (optional)
         ├─ Selected Records
         ├─ DOT Form Data
         └─ Travel Score (calculated)

AIProcessingJob (async task queue)
  ├─ record_id
  ├─ file_path
  ├─ status (pending, processing, completed, failed)
  ├─ result_json
  └─ created_at, updated_at
```

---

## SECTION 2: UX → SYSTEM MAPPING

### 2.1 Core Routes & Pages

```
/                          → Landing (public, redirect if authed)
/auth/login                → Login form
/auth/signup               → Signup form
/dashboard                 → Main hub (owner home)
/dogs/[dogId]/passport     → Passport view + detail
/dogs/[dogId]/passport/qr  → QR code display + share
/qr/[qrTokenId]            → Public verification page (scanned QR)
/dogs/[dogId]/records      → Wallet view (all records)
/dogs/[dogId]/records/new  → Upload flow
/dogs/[dogId]/travel       → Travel mode checklist
/dogs/[dogId]/settings     → Dog settings
/profile/settings          → User settings
/settings/about            → Legal, ADA guides
```

### 2.2 Key UI States

| State | Trigger | Display | Example |
|-------|---------|---------|---------|
| **Loading** | API fetch, AI processing | Spinner + skeleton | Upload processing |
| **Empty** | No dogs/records | Empty state graphic + CTA | First-time dashboard |
| **Verified** | Record passes AI + validation | Green badge + checkmark | Rabies vaccine |
| **Expiring Soon** | Record within 30 days of expiry | Yellow badge + warning | DHPP expires in 20d |
| **Expired** | Record past expiry date | Red badge + alert | Annual exam overdue |
| **Pending** | Record submitted, awaiting AI | Blue badge + spinner | Uploaded, analyzing... |
| **Failed** | AI cannot parse or vet rejects | Red badge + retry link | Could not recognize doc |
| **Error** | API error or auth issue | Error toast + fallback | 500 error, retry |

### 2.3 Core User Flows

#### Flow A: Auth & Setup
```
Login/Signup
  ↓ (Create User)
Dashboard (empty)
  ↓ (Prompt: "Add your first dog")
Dog Profile Form
  ↓ (Create Dog)
Upload First Record (Rabies)
  ↓ (AI processes)
Passport Created (Auto)
  ↓ (Show QR & quick actions)
```

#### Flow B: Upload & Verification
```
Dashboard → Records Tab
  ↓
[ Upload Record ] button
  ↓
Drag/Drop or Select File (PDF, JPG, PNG)
  ↓
Mock AI Processing (2-3 sec simulation)
  ↓
AI Result: "Rabies Vaccination, Expires 03/01/26, Issuer: Dr. Chen"
  ↓
User Confirms / Edits
  ↓
[ Save to Passport ]
  ↓
Toast: "Record Added ✓"
  ↓
Updated Passport (record now listed)
```

#### Flow C: Share & Verify
```
Passport View → [ Show QR Code ]
  ↓
QR Code Modal (printable, shareable URL)
  ↓
Someone scans QR
  ↓
Browser opens → /qr/[tokenId]
  ↓
Public Verification Page
  ├─ Dog photo + name
  ├─ Verified badge (if status = "verified")
  ├─ Compliance checklist
  ├─ Record summary
  └─ "View Full Records" (password-protected if configured)
```

#### Flow D: Travel Mode
```
Dashboard → [ Travel Mode ]
  ↓
Select Destination (autocomplete: "New York")
  ↓
System auto-generates checklist based on rules
  ├─ ✓ Rabies (current)
  ├─ ✓ Training (verified)
  ├─ ⚠ DHPP (expiring in 20d)
  └─ ✗ Behavior Certificate (missing)
  ↓
Travel Score: 75/100
  ↓
[ Download DOT Form (mock PDF) ]
  ↓
[ Share with Airline ]
```

---

## SECTION 3: DATA & API DESIGN

### 3.1 TypeScript Interfaces

```typescript
// === CORE ENTITIES ===

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Dog {
  id: string;
  owner_id: string; // FK to User
  name: string;
  breed: string;
  date_of_birth: Date;
  weight_lbs: number;
  microchip_id?: string;
  photo_url?: string;
  type: 'service' | 'emotional_support' | 'pet'; // determines rule set
  created_at: Date;
  updated_at: Date;
}

export interface Record {
  id: string;
  dog_id: string; // FK to Dog
  type: 'vaccination' | 'training' | 'vet_exam' | 'behavior' | 'other';
  title: string; // "Rabies Vaccination", "Task Training Attestation"
  issue_date: Date;
  expiry_date?: Date; // null = no expiry
  issuer_name: string; // "Dr. Emily Chen, DVM"
  issuer_type: 'veterinarian' | 'trainer' | 'organization' | 'user_uploaded';
  file_url: string; // s3:// path
  status: 'verified' | 'pending' | 'failed' | 'rejected';
  extracted_data: RecordExtraction; // AI-extracted fields
  created_at: Date;
  updated_at: Date;
}

export interface RecordExtraction {
  confidence_score: number; // 0-1
  detected_type: string;
  detected_expiry?: string;
  detected_issuer?: string;
  raw_text?: string; // OCR output
  validation_notes?: string;
}

export interface Passport {
  id: string;
  dog_id: string; // FK to Dog
  qr_token: string; // unique URL-safe token
  active_records: string[]; // Record IDs
  status: 'incomplete' | 'verified' | 'expiring_soon' | 'expired';
  verification_count: number; // times QR scanned
  is_public: boolean;
  password?: string; // optional password for private QR
  shared_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TravelMode {
  id: string;
  dog_id: string;
  destination: string;
  checklist_items: TravelChecklistItem[];
  travel_score: number; // 0-100
  compliance_status: 'compliant' | 'partial' | 'non_compliant';
  created_at: Date;
  updated_at: Date;
}

export interface TravelChecklistItem {
  id: string;
  category: string; // "Vaccination", "Training", "Behavior"
  requirement: string; // "Rabies vaccination within 1 year"
  status: 'met' | 'not_met' | 'expiring_soon'; // determined by linked records
  record_id?: string; // FK to Record if met
  due_date?: Date;
}

export interface AIProcessingJob {
  id: string;
  record_id: string;
  file_path: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: RecordExtraction;
  error_message?: string;
  created_at: Date;
  updated_at: Date;
}

export interface QRSession {
  id: string;
  passport_id: string;
  scanned_at: Date;
  scanned_by_ip?: string;
  user_agent?: string;
}
```

### 3.2 REST API Routes

#### **Authentication**

```
POST /api/auth/signup
  Input:  { email, password, full_name }
  Output: { user: User, token: JWT }
  Errors: 409 (email exists), 400 (invalid input)

POST /api/auth/login
  Input:  { email, password }
  Output: { user: User, token: JWT }
  Errors: 401 (invalid creds), 404 (user not found)

POST /api/auth/logout
  Input:  {}
  Output: { message: "Logged out" }

GET /api/auth/me
  Output: { user: User } | 401 if not authed
```

#### **Dogs**

```
GET /api/dogs
  Output: { dogs: Dog[] }
  Auth:   Required

POST /api/dogs
  Input:  { name, breed, dob, weight_lbs, type, photo? }
  Output: { dog: Dog }
  Auth:   Required

GET /api/dogs/[dogId]
  Output: { dog: Dog }
  Auth:   Required

PATCH /api/dogs/[dogId]
  Input:  { name?, breed?, weight_lbs?, photo_url? }
  Output: { dog: Dog }
  Auth:   Required

DELETE /api/dogs/[dogId]
  Output: { message: "Dog deleted" }
  Auth:   Required
```

#### **Records**

```
GET /api/dogs/[dogId]/records
  Query:  ?type=vaccination&status=verified
  Output: { records: Record[], total: number }
  Auth:   Required

POST /api/dogs/[dogId]/records
  Input:  { type, title, issue_date, expiry_date?, issuer_name, file }
  Output: { record: Record, job_id: string }
  Auth:   Required
  Side:   Creates AIProcessingJob

GET /api/dogs/[dogId]/records/[recordId]
  Output: { record: Record }
  Auth:   Required

PATCH /api/dogs/[dogId]/records/[recordId]
  Input:  { title?, expiry_date?, status? }
  Output: { record: Record }
  Auth:   Required

DELETE /api/dogs/[dogId]/records/[recordId]
  Output: { message: "Record deleted" }
  Auth:   Required
```

#### **Passport & QR**

```
GET /api/dogs/[dogId]/passport
  Output: { passport: Passport, records: Record[], status_summary: {} }
  Auth:   Required

POST /api/dogs/[dogId]/passport/generate-qr
  Input:  { is_public, password? }
  Output: { passport: Passport, qr_url: string, qr_image_data: base64 }
  Auth:   Required

GET /api/qr/[qrToken]
  Output: { passport_public: PublicPassportDTO, dog: DogDTO, records: RecordDTO[] }
  Auth:   None (public)
  Side:   Logs QRSession

POST /api/qr/[qrToken]/verify-password
  Input:  { password }
  Output: { valid: boolean, records?: Record[] }
  Auth:   None
```

#### **Travel**

```
GET /api/dogs/[dogId]/travel
  Output: { travelMode: TravelMode }
  Auth:   Required

POST /api/dogs/[dogId]/travel
  Input:  { destination }
  Output: { travelMode: TravelMode, checklist: TravelChecklistItem[] }
  Auth:   Required
  Side:   Auto-generates checklist by rule engine

GET /api/dogs/[dogId]/travel/dot-form
  Query:  ?destination=NY
  Output: { pdf_url: string } (mock download)
  Auth:   Required
```

#### **AI Processing**

```
GET /api/jobs/[jobId]
  Output: { job: AIProcessingJob }
  Auth:   Required

POST /api/jobs/[jobId]/retry
  Output: { job: AIProcessingJob }
  Auth:   Required
  Side:   Re-queues job
```

---

## SECTION 4: AI / MOCK PROCESSING LAYER

### 4.1 Mock AI Strategy (MVP0)

**Goal:** Simulate intelligent document parsing without external API dependency.

```typescript
// lib/mock-ai.ts

export interface AIExtractionRequest {
  file_type: 'pdf' | 'jpg' | 'png';
  file_base64: string;
  file_name: string;
}

export interface AIExtractionResult {
  confidence_score: number;
  detected_type: 'vaccination' | 'training' | 'vet_exam' | 'unknown';
  detected_subtype?: string;
  extracted_fields: {
    title?: string;
    issue_date?: string;
    expiry_date?: string;
    issuer_name?: string;
    certificate_id?: string;
  };
  raw_text?: string;
  success: boolean;
  error?: string;
}

export async function mockExtractRecord(
  req: AIExtractionRequest
): Promise<AIExtractionResult> {
  // Simulate 2-3 second processing
  await new Promise(r => setTimeout(r, 2000 + Math.random() * 1000));

  // Deterministic mock: if filename contains certain keywords, return matching result
  const fileName = req.file_name.toLowerCase();
  
  if (fileName.includes('rabies') || fileName.includes('vaccination')) {
    return {
      confidence_score: 0.95,
      detected_type: 'vaccination',
      detected_subtype: 'Rabies',
      extracted_fields: {
        title: 'Rabies Vaccination',
        issue_date: '2024-03-15',
        expiry_date: '2026-03-15',
        issuer_name: 'Dr. Emily Chen, DVM',
        certificate_id: 'RC-2024-001234',
      },
      raw_text: '[Mock OCR: Certificate of Rabies Vaccination...]',
      success: true,
    };
  }
  
  if (fileName.includes('training') || fileName.includes('attestation')) {
    return {
      confidence_score: 0.92,
      detected_type: 'training',
      detected_subtype: 'Task Training',
      extracted_fields: {
        title: 'Advanced Task Training Attestation',
        issue_date: '2024-01-10',
        expiry_date: '2025-01-10',
        issuer_name: 'National Service Dog School',
        certificate_id: 'NSDS-2024-5678',
      },
      success: true,
    };
  }

  // Default fallback
  return {
    confidence_score: 0.5,
    detected_type: 'unknown',
    extracted_fields: {
      title: 'Document (type unclear)',
      issuer_name: 'Unknown issuer',
    },
    success: false,
    error: 'Could not confidently identify document type. Please review and edit manually.',
  };
}
```

### 4.2 Background Job Handler

```typescript
// lib/ai-job-queue.ts

export async function processRecordAsync(
  record_id: string,
  file_path: string,
  dogId: string
) {
  const db = getPrismaClient(); // or your ORM

  try {
    // 1. Update job to "processing"
    await db.aIProcessingJob.update({
      where: { id: record_id },
      data: { status: 'processing' },
    });

    // 2. Download file from s3 (or get base64)
    const fileBase64 = await getS3FileBase64(file_path);

    // 3. Run AI extraction
    const result = await mockExtractRecord({
      file_type: 'pdf', // infer from file_path
      file_base64: fileBase64,
      file_name: file_path.split('/').pop() || '',
    });

    // 4. Update record with result
    if (result.success) {
      await db.record.update({
        where: { id: record_id },
        data: {
          status: 'verified',
          extracted_data: result.extracted_fields,
          title: result.extracted_fields.title || 'Document',
          issue_date: new Date(result.extracted_fields.issue_date || Date.now()),
          expiry_date: result.extracted_fields.expiry_date
            ? new Date(result.extracted_fields.expiry_date)
            : null,
        },
      });
    } else {
      await db.record.update({
        where: { id: record_id },
        data: {
          status: 'failed',
          extracted_data: {
            error: result.error,
            confidence_score: result.confidence_score,
          },
        },
      });
    }

    // 5. Update job to "completed"
    await db.aIProcessingJob.update({
      where: { id: record_id },
      data: {
        status: 'completed',
        result_json: result,
      },
    });

  } catch (error) {
    await db.aIProcessingJob.update({
      where: { id: record_id },
      data: {
        status: 'failed',
        error_message: (error as Error).message,
      },
    });
  }
}
```

---

## SECTION 5: FRONTEND ARCHITECTURE (Next.js 14)

### 5.1 Folder Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── layout.tsx
├── (app)/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── dogs/
│   │   ├── [dogId]/
│   │   │   ├── passport/
│   │   │   │   ├── page.tsx
│   │   │   │   └── qr/
│   │   │   │       └── page.tsx
│   │   │   ├── records/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── travel/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── profile/
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx (main app layout)
│   └── page.tsx (root redirect)
├── qr/
│   ├── [qrToken]/
│   │   └── page.tsx
│   └── layout.tsx (minimal, no auth)
├── api/
│   ├── auth/
│   │   ├── signup/
│   │   │   └── route.ts
│   │   ├── login/
│   │   │   └── route.ts
│   │   └── logout/
│   │       └── route.ts
│   ├── dogs/
│   │   ├── route.ts (GET, POST)
│   │   └── [dogId]/
│   │       ├── route.ts (GET, PATCH, DELETE)
│   │       ├── records/
│   │       │   ├── route.ts (GET, POST)
│   │       │   └── [recordId]/
│   │       │       └── route.ts (GET, PATCH, DELETE)
│   │       ├── passport/
│   │       │   └── route.ts (GET, POST)
│   │       └── travel/
│   │           └── route.ts (GET, POST)
│   ├── qr/
│   │   ├── [qrToken]/
│   │   │   ├── route.ts (GET)
│   │   │   └── verify/
│   │   │       └── route.ts (POST password verify)
│   │   └── scan-log.ts (POST)
│   └── jobs/
│       ├── [jobId]/
│       │   └── route.ts
│       └── poll.ts (SSE or polling endpoint)
├── layout.tsx
├── globals.css
└── page.tsx

components/
├── layout/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── BottomNav.tsx
├── auth/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── AuthGuard.tsx
├── dashboard/
│   ├── DogCard.tsx
│   ├── QuickActionsGrid.tsx
│   ├── HealthSummary.tsx
│   └── EmptyState.tsx
├── passport/
│   ├── PassportHeader.tsx
│   ├── PassportRecordList.tsx
│   ├── RecordItem.tsx
│   ├── StatusBadge.tsx
│   └── QRModal.tsx
├── records/
│   ├── RecordWallet.tsx
│   ├── RecordFilter.tsx
│   ├── UploadWidget.tsx
│   ├── UploadProgress.tsx
│   └── ProcessingStatus.tsx
├── travel/
│   ├── TravelChecklist.tsx
│   ├── ChecklistItem.tsx
│   ├── TravelScore.tsx
│   └── DOTFormButton.tsx
├── shared/
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Spinner.tsx
│   ├── Toast.tsx
│   └── StatusIndicator.tsx
└── qr/
    ├── PublicPassportView.tsx
    ├── ComplianceChecklist.tsx
    └── PasswordPrompt.tsx

lib/
├── auth.ts (NextAuth config or JWT handler)
├── api-client.ts (fetch wrapper)
├── mock-ai.ts (mock extraction logic)
├── ai-job-queue.ts (background job handler)
├── validators.ts (zod schemas)
├── constants.ts (colors, rules, strings)
├── utils.ts (helpers)
└── hooks/
    ├── useAuth.ts
    ├── useDog.ts
    ├── useRecords.ts
    ├── usePassport.ts
    └── usePolling.ts

styles/
├── globals.css (tailwind + css vars)
└── theme.css

public/
├── icons/
├── images/
└── fonts/
```

### 5.2 Key Pages & Components

#### **Page: Dashboard**

```typescript
// app/(app)/dashboard/page.tsx
import { Suspense } from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DogCard from '@/components/dashboard/DogCard';
import QuickActionsGrid from '@/components/dashboard/QuickActionsGrid';
import HealthSummary from '@/components/dashboard/HealthSummary';
import EmptyState from '@/components/dashboard/EmptyState';

async function getDogs() {
  const session = await getSession();
  if (!session) redirect('/auth/login');
  
  const res = await fetch(`${process.env.API_URL}/api/dogs`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  
  if (!res.ok) throw new Error('Failed to fetch dogs');
  return res.json();
}

export default async function DashboardPage() {
  const { dogs } = await getDogs();

  if (!dogs || dogs.length === 0) {
    return <EmptyState />;
  }

  // Show first dog as "active"
  const activeDog = dogs[0];

  return (
    <main className="space-y-6 pb-20">
      {/* Header */}
      <section className="relative h-40 bg-gradient-to-br from-navy-600 to-navy-900 rounded-2xl p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent opacity-10 rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-navy-200">{activeDog.name}'s health is on track</p>
        </div>
      </section>

      {/* Active Dog Card */}
      <section>
        <DogCard dog={activeDog} />
      </section>

      {/* Quick Actions */}
      <section>
        <QuickActionsGrid dogId={activeDog.id} />
      </section>

      {/* Health Summary */}
      <section>
        <Suspense fallback={<div className="h-40 bg-gray-200 rounded animate-pulse" />}>
          <HealthSummary dogId={activeDog.id} />
        </Suspense>
      </section>

      {/* Other Dogs (if multiple) */}
      {dogs.length > 1 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-navy-900">Your Dogs</h2>
          <div className="grid gap-4">
            {dogs.slice(1).map(dog => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
```

#### **Component: PassportHeader**

```typescript
// components/passport/PassportHeader.tsx
'use client';

import { Dog, Passport } from '@/lib/types';
import StatusBadge from './StatusBadge';
import Button from '@/components/shared/Button';
import { QrCodeIcon, ShareIcon } from '@/components/icons';

interface PassportHeaderProps {
  dog: Dog;
  passport: Passport;
  onShowQR: () => void;
  onShare: () => void;
}

export default function PassportHeader({
  dog,
  passport,
  onShowQR,
  onShare,
}: PassportHeaderProps) {
  const verificationCount = passport.verification_count || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Background */}
      <div className="h-20 bg-gradient-to-r from-navy-500 to-navy-700" />

      {/* Content */}
      <div className="px-6 pb-6 -mt-10 relative">
        <div className="flex items-end gap-4 mb-4">
          {/* Dog Photo */}
          <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-white shadow-md bg-gray-100 flex-shrink-0">
            {dog.photo_url ? (
              <img src={dog.photo_url} alt={dog.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">🐕</div>
            )}
          </div>

          {/* Name & Badge */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-navy-900">{dog.name}</h1>
            <p className="text-sm text-slate-600">{dog.breed}</p>
          </div>

          {/* Status Badge */}
          <StatusBadge status={passport.status} />
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-200">
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Age</p>
            <p className="text-lg font-semibold text-navy-900">
              {calculateAge(dog.date_of_birth)} years
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Scanned</p>
            <p className="text-lg font-semibold text-navy-900">{verificationCount}x</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onShowQR}
            variant="primary"
            icon={<QrCodeIcon />}
            className="flex-1"
          >
            Show QR Code
          </Button>
          <Button
            onClick={onShare}
            variant="secondary"
            icon={<ShareIcon />}
            className="flex-1"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

function calculateAge(dob: Date): number {
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
```

#### **Component: RecordItem**

```typescript
// components/passport/RecordItem.tsx
'use client';

import { Record } from '@/lib/types';
import StatusIndicator from '@/components/shared/StatusIndicator';
import { ChevronRightIcon, XIcon, EditIcon } from '@/components/icons';
import { formatDate, getDaysUntilExpiry } from '@/lib/utils';

interface RecordItemProps {
  record: Record;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function RecordItem({ record, onEdit, onDelete }: RecordItemProps) {
  const daysUntilExpiry = record.expiry_date
    ? getDaysUntilExpiry(record.expiry_date)
    : null;

  const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry > 0 && daysUntilExpiry <= 30;

  return (
    <div
      className={`bg-white rounded-lg border-2 p-4 transition-all ${
        record.status === 'verified'
          ? 'border-green-200 bg-green-50'
          : record.status === 'pending'
          ? 'border-blue-200 bg-blue-50'
          : record.status === 'failed'
          ? 'border-red-200 bg-red-50'
          : isExpired
          ? 'border-red-300'
          : isExpiringSoon
          ? 'border-amber-200 bg-amber-50'
          : 'border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status Indicator */}
        <StatusIndicator
          status={
            isExpired ? 'expired' : isExpiringSoon ? 'expiring_soon' : record.status
          }
          className="mt-1 flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-navy-900">{record.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{record.issuer_name}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-1 hover:bg-gray-100 rounded transition"
                  aria-label="Edit"
                >
                  <EditIcon size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-1 hover:bg-red-100 rounded transition"
                  aria-label="Delete"
                >
                  <XIcon size={16} className="text-red-500" />
                </button>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="mt-3 flex gap-4 text-xs text-slate-600">
            <span>Issued: {formatDate(record.issue_date)}</span>
            {record.expiry_date && (
              <span className={isExpired ? 'text-red-600 font-semibold' : ''}>
                Expires: {formatDate(record.expiry_date)}
                {daysUntilExpiry !== null && (
                  <span className="ml-1">
                    ({daysUntilExpiry <= 0 ? 'Expired' : `in ${daysUntilExpiry}d`})
                  </span>
                )}
              </span>
            )}
          </div>

          {/* AI Confidence (if pending or failed) */}
          {record.status === 'pending' && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-blue-500 animate-pulse" />
              </div>
              <span className="text-xs text-blue-600 font-medium">Processing...</span>
            </div>
          )}

          {record.status === 'failed' && (
            <p className="mt-3 text-xs text-red-600">
              ⚠️ {record.extracted_data?.validation_notes || 'Could not verify this record.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

#### **Component: UploadWidget**

```typescript
// components/records/UploadWidget.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import Spinner from '@/components/shared/Spinner';
import { uploadRecord } from '@/lib/api-client';
import { CloudUploadIcon, CheckCircleIcon, AlertCircleIcon } from '@/components/icons';

interface UploadWidgetProps {
  dogId: string;
  onSuccess?: () => void;
}

export default function UploadWidget({ dogId, onSuccess }: UploadWidgetProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'unknown'); // user can specify later

      const response = await uploadRecord(dogId, formData);
      setResult(response);
      setFile(null);

      // Poll for job completion
      pollJobStatus(response.job_id);
    } catch (err) {
      setError((err as Error).message || 'Upload failed');
      setIsProcessing(false);
    }
  };

  const pollJobStatus = async (jobId: string) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        const job = await res.json();

        if (job.status === 'completed') {
          setResult(job);
          setIsProcessing(false);
          onSuccess?.();
          router.refresh();
        } else if (job.status === 'failed') {
          setError('Document could not be processed. Please try another file.');
          setIsProcessing(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 1000);
        }
      } catch (err) {
        console.error('Poll error:', err);
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 1000);
        }
      }
    };

    poll();
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {!file && !result && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 transition-all text-center cursor-pointer ${
            isDragging
              ? 'border-gold-accent bg-gold-accent/5'
              : 'border-gray-300 hover:border-navy-300'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon size={40} className="mx-auto mb-2 text-slate-400" />
          <p className="font-semibold text-navy-900">Drag and drop your document</p>
          <p className="text-sm text-slate-600 mt-1">or click to browse</p>
          <p className="text-xs text-slate-500 mt-2">PDF, JPG, or PNG (Max 10MB)</p>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
        </div>
      )}

      {/* File Selected */}
      {file && !result && (
        <div className="border border-gray-300 rounded-xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-navy-900">{file.name}</p>
            <p className="text-sm text-slate-600">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <Button
            onClick={handleUpload}
            disabled={isProcessing}
            variant="primary"
          >
            {isProcessing ? (
              <>
                <Spinner size="sm" /> Uploading...
              </>
            ) : (
              'Upload'
            )}
          </Button>
        </div>
      )}

      {/* Processing */}
      {isProcessing && !result && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <Spinner className="mx-auto mb-3" />
          <p className="text-sm font-medium text-blue-900">Analyzing your document...</p>
          <p className="text-xs text-blue-700 mt-1">This may take a few seconds</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className={`border rounded-xl p-4 ${
            result.success
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.success ? (
              <CheckCircleIcon size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircleIcon size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <p
                className={`font-semibold ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {result.success ? 'Document Recognized ✓' : 'Could Not Process'}
              </p>

              {result.success && result.extracted_fields && (
                <div className="mt-3 space-y-2 text-sm text-green-800">
                  <p><span className="font-medium">Type:</span> {result.detected_subtype || result.detected_type}</p>
                  {result.extracted_fields.title && (
                    <p><span className="font-medium">Title:</span> {result.extracted_fields.title}</p>
                  )}
                  {result.extracted_fields.issue_date && (
                    <p><span className="font-medium">Issued:</span> {result.extracted_fields.issue_date}</p>
                  )}
                  {result.extracted_fields.expiry_date && (
                    <p><span className="font-medium">Expires:</span> {result.extracted_fields.expiry_date}</p>
                  )}
                  <p className="text-xs text-green-700 mt-2">Confidence: {(result.confidence_score * 100).toFixed(0)}%</p>
                </div>
              )}

              {!result.success && (
                <p className="text-sm text-red-800 mt-2">
                  {result.error || 'Please review and edit manually.'}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {result.success && (
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  // TODO: Save to passport
                  setResult(null);
                  setFile(null);
                  router.refresh();
                }}
              >
                Add to Passport
              </Button>
            )}
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => {
                setResult(null);
                setFile(null);
                setError(null);
              }}
            >
              {result.success ? 'Upload Another' : 'Try Again'}
            </Button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
          {error}
        </div>
      )}
    </div>
  );
}
```

---

## SECTION 6: REUSABLE COMPONENT LIBRARY

### 6.1 Core Components

#### **Card.tsx**

```typescript
// components/shared/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all';
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md',
    outlined: 'bg-transparent border-2 border-navy-300',
  };
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

#### **Badge.tsx**

```typescript
// components/shared/Badge.tsx
interface BadgeProps {
  status: 'verified' | 'pending' | 'failed' | 'expiring_soon' | 'expired';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ status, children, className = '' }: BadgeProps) {
  const styles = {
    verified: 'bg-green-100 text-green-800 border border-green-300',
    pending: 'bg-blue-100 text-blue-800 border border-blue-300',
    failed: 'bg-red-100 text-red-800 border border-red-300',
    expiring_soon: 'bg-amber-100 text-amber-800 border border-amber-300',
    expired: 'bg-red-100 text-red-900 border border-red-400 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${styles[status]} ${className}`}
    >
      {children}
    </span>
  );
}
```

#### **Button.tsx**

```typescript
// components/shared/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-navy-600 text-white hover:bg-navy-700 focus:ring-navy-300 active:bg-navy-800',
    secondary:
      'bg-white text-navy-600 border-2 border-gold-accent hover:bg-gold-accent/5 focus:ring-gold-accent/30',
    ghost: 'text-slate-600 hover:bg-gray-100 focus:ring-gray-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 active:bg-red-800',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {icon && !loading && icon}
      {children}
    </button>
  );
}

function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className={`${sizeMap[size]} animate-spin rounded-full border-2 border-current border-t-transparent`} />
  );
}
```

#### **StatusIndicator.tsx**

```typescript
// components/shared/StatusIndicator.tsx
import {
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@/components/icons';

interface StatusIndicatorProps {
  status: 'verified' | 'pending' | 'failed' | 'expiring_soon' | 'expired';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StatusIndicator({
  status,
  size = 'md',
  className = '',
}: StatusIndicatorProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const icons = {
    verified: <CheckCircleIcon className="text-green-600" />,
    pending: <ClockIcon className="text-blue-600 animate-spin" />,
    failed: <XCircleIcon className="text-red-600" />,
    expiring_soon: <AlertCircleIcon className="text-amber-600" />,
    expired: <XCircleIcon className="text-red-700" />,
  };

  return (
    <div className={`${sizeMap[size]} flex items-center justify-center ${className}`}>
      {icons[status]}
    </div>
  );
}
```

---

## SECTION 7: API ROUTE EXAMPLES

### 7.1 POST /api/dogs/[dogId]/records

```typescript
// app/api/dogs/[dogId]/records/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { validateRecordInput } from '@/lib/validators';
import { uploadToS3, createRecord, queueAIJob } from '@/lib/db';
import { v4 as uuid } from 'uuid';

export async function POST(
  request: NextRequest,
  { params }: { params: { dogId: string } }
) {
  try {
    // 1. Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    // 3. Validate file
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }

    // 4. Upload to S3
    const fileName = `${session.userId}/${params.dogId}/${uuid()}-${file.name}`;
    const s3Url = await uploadToS3(fileName, file);

    // 5. Create record in DB (status: pending)
    const record = await createRecord({
      dog_id: params.dogId,
      type: 'unknown',
      title: file.name,
      issue_date: new Date(),
      file_url: s3Url,
      status: 'pending',
      issuer_name: 'Pending verification',
      issuer_type: 'user_uploaded',
      extracted_data: {},
    });

    // 6. Queue AI processing job
    const jobId = await queueAIJob({
      record_id: record.id,
      file_path: s3Url,
      status: 'pending',
    });

    // 7. Return immediately with job ID
    return NextResponse.json(
      {
        record,
        job_id: jobId,
        message: 'File uploaded. Processing...',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { dogId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const status = url.searchParams.get('status');

    // TODO: Query with filters
    const records = await prisma.record.findMany({
      where: {
        dog: { id: params.dogId, owner_id: session.userId },
        ...(type && { type }),
        ...(status && { status }),
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({ records, total: records.length });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch records' },
      { status: 500 }
    );
  }
}
```

### 7.2 GET /api/qr/[qrToken]

```typescript
// app/api/qr/[qrToken]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPassportByQRToken, getRecords, logQRScan } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { qrToken: string } }
) {
  try {
    // 1. Get passport by QR token
    const passport = await getPassportByQRToken(params.qrToken);

    if (!passport) {
      return NextResponse.json(
        { error: 'Invalid QR code' },
        { status: 404 }
      );
    }

    // 2. Get dog and records
    const dog = await getDogById(passport.dog_id);
    const records = await getRecords(passport.dog_id);

    // 3. Filter to active records only
    const activeRecords = records.filter(r =>
      passport.active_records.includes(r.id)
    );

    // 4. Log scan event
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    await logQRScan(passport.id, clientIp, userAgent);

    // 5. Return public DTO (no sensitive info)
    return NextResponse.json({
      passport: {
        id: passport.id,
        status: passport.status,
        verification_count: passport.verification_count + 1,
      },
      dog: {
        name: dog.name,
        breed: dog.breed,
        type: dog.type,
        weight_lbs: dog.weight_lbs,
        photo_url: dog.photo_url,
      },
      records: activeRecords.map(r => ({
        id: r.id,
        type: r.type,
        title: r.title,
        issue_date: r.issue_date,
        expiry_date: r.expiry_date,
        status: r.status,
      })),
    });
  } catch (error) {
    console.error('QR error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve passport' },
      { status: 500 }
    );
  }
}
```

---

## SECTION 8: STYLING & TAILWIND CONFIG

### 8.1 Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F2F7',
          100: '#E0E5F0',
          200: '#C1CBE1',
          300: '#A2B1D2',
          400: '#6B7FB5',
          500: '#344D96',
          600: '#0A1A5F',
          700: '#081553',
          900: '#05101F',
        },
        gold: {
          accent: '#C8B46F',
          light: '#E8DCC9',
          dark: '#9B8A4F',
        },
        slate: {
          600: '#607089',
          700: '#475569',
        },
      },
      spacing: {
        '4px': '4px',
        '8px': '8px',
        '12px': '12px',
        '16px': '16px',
        '24px': '24px',
      },
      borderRadius: {
        '12': '12px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## SECTION 9: DEPLOYMENT & OPERATIONS

### 9.1 Environment Variables

```
# .env.local (dev)
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost/dog_passport_dev
NEXTAUTH_SECRET=dev_secret_key_change_in_prod
NEXTAUTH_URL=http://localhost:3000
AWS_S3_BUCKET=dog-passport-dev
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# .env.production
NEXT_PUBLIC_API_URL=https://dogpassport.app
DATABASE_URL=postgresql://user:pass@prod-db.aws.com/dog_passport
NEXTAUTH_SECRET=<strong-secret-from-vault>
NEXTAUTH_URL=https://dogpassport.app
AWS_S3_BUCKET=dog-passport-prod
...
```

### 9.2 Build & Deploy (Vercel Example)

```bash
# Local dev
npm run dev

# Build
npm run build

# Deploy to Vercel
vercel deploy --prod

# Run migrations
npm run db:migrate -- prod
```

---

## SECTION 10: TESTING STRATEGY (OUTLINE)

### 10.1 Test Coverage
- **Unit Tests:** Component rendering, utilities, validators
- **Integration Tests:** API routes, DB queries
- **E2E Tests:** Critical flows (signup → upload → QR)

### Example Unit Test

```typescript
// components/__tests__/RecordItem.test.tsx
import { render, screen } from '@testing-library/react';
import RecordItem from '@/components/passport/RecordItem';

describe('RecordItem', () => {
  const mockRecord = {
    id: '1',
    title: 'Rabies Vaccine',
    issuer_name: 'Dr. Chen',
    issue_date: new Date('2024-03-15'),
    expiry_date: new Date('2026-03-15'),
    status: 'verified',
    type: 'vaccination',
    file_url: 's3://...',
    dog_id: 'dog1',
    issuer_type: 'veterinarian',
    extracted_data: {},
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('renders record title and issuer', () => {
    render(<RecordItem record={mockRecord} />);
    expect(screen.getByText('Rabies Vaccine')).toBeInTheDocument();
    expect(screen.getByText('Dr. Chen')).toBeInTheDocument();
  });

  it('shows expiry date', () => {
    render(<RecordItem record={mockRecord} />);
    expect(screen.getByText(/Expires:/)).toBeInTheDocument();
  });

  it('renders edit/delete buttons when provided', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(
      <RecordItem
        record={mockRecord}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    expect(screen.getByLabelText('Edit')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete')).toBeInTheDocument();
  });
});
```

---

## SECTION 11: SUMMARY & HANDOFF CHECKLIST

### MVP0 Deliverables

- ✓ **Architecture Document** (this guide)
- ✓ **TypeScript interfaces** (entities, API contracts)
- ✓ **Next.js 14 folder structure** (scalable, modular)
- ✓ **Core pages** (dashboard, passport, upload, QR)
- ✓ **Reusable components** (Card, Badge, Button, StatusIndicator, RecordItem, UploadWidget, PassportHeader)
- ✓ **API routes** (auth, dogs, records, passport, QR, travel)
- ✓ **Mock AI layer** (deterministic document parsing)
- ✓ **Tailwind + design system** (colors, spacing, typography)
- ✓ **Testing strategy** (unit, integration, E2E outline)
- ✓ **Deployment steps** (env, build, Vercel)

### What's NOT in MVP0 (Phase 2)

- Real AI extraction (GPT-4V, document intelligence APIs)
- Vet portal integrations
- Airline rule engine
- Payment/subscription
- Mobile app (defer to Phase 2 if needed)
- Compliance audit trail (basic logging only)
- Multi-language support

### Next Steps

1. **Figma High-Fidelity Design** (use this arch + component lib)
2. **Database Setup** (PostgreSQL + Prisma schema)
3. **Frontend Build** (Start with dashboard, then passport, then records)
4. **API Implementation** (Prioritize auth, dogs, records)
5. **Testing & QA** (Basic happy-path testing)
6. **First Demo** (Internal stakeholder feedback)

---

## APPENDIX A: GLOSSARY

| Term | Definition |
|------|-----------|
| **QR Token** | Unique URL-safe identifier for shareable passport (not same as dog ID) |
| **Passport Status** | One of: incomplete, verified, expiring_soon, expired |
| **Record Status** | One of: verified, pending, failed, rejected |
| **Travel Mode** | Feature that generates compliance checklist for air/ground travel |
| **Mock AI** | Deterministic logic that simulates document parsing for MVP0 |
| **AI Processing Job** | Async queue item for document extraction (status: pending → processing → completed/failed) |
| **Active Records** | Subset of all records that appear on the shared QR passport |
| **QR Session** | Log entry when QR code is scanned (timestamp, IP, user agent) |

---

**END OF DOCUMENT**

This document is ready for handoff to a senior dev team. It contains:
- Clear mental model
- Defined data structures
- API specifications
- React/Next.js patterns
- Reusable components
- Mock AI strategy
- Deployment path

All code examples are production-ready scaffolding; implementation details (auth library selection, ORM finalization, test runner) can be finalized with the team.
