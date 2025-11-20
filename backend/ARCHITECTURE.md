# Dog Passport Backend Architecture

## Overview

Dog Passport backend is designed as **pet-identity infrastructure** with strict **ADA compliance** separation between internal data and public-facing APIs.

## Core Principles

1. **ADA Compliance**: Internal scores, fraud flags, and breed warnings are NEVER exposed to businesses
2. **Separation of Concerns**: Clear separation between handlers, businesses, vets, trainers, and admin
3. **Audit Trails**: All important events are logged for compliance and debugging
4. **Extensibility**: Designed to evolve into multi-tenant, multi-region infrastructure

## Data Model Architecture

### Core Entities

- **Handler**: Dog owner/user account
- **Dog**: Service dog profile with verification level
- **RawDocument**: Uploaded file before processing
- **NormalizedRecord**: Structured medical/training record extracted from document
- **Organization**: Business, vet clinic, or trainer account
- **AuditEvent**: Event log for compliance

### Verification System

#### Public-Facing (Business APIs)
- `PublicStatusSummary`: What businesses see when scanning QR/NFC
  - Dog name, photo
  - Handler name
  - Verification level (Yellow/Green/Blue)
  - Service role and tasks
  - Vaccination status
  - Training/vet verification flags
  - Behavior status
  - **NO internal scores, NO breed warnings**

#### Internal (Admin Only)
- `InternalVerificationScores`: Internal scoring system
  - `service_eligibility_score`: Based on documentation completeness
  - `training_evidence_score`: Quality of training records
  - `health_completeness_score`: Health record completeness
  - `task_breed_compatibility_score`: Internal flag (not public denial)
  - `fraud_flags`: List of fraud indicators
  - `mismatch_flags`: Size/task/breed mismatches (internal review only)
  - `requires_human_review`: Whether admin review is needed

#### Verification Levels
- **Yellow**: Temporary - incomplete records
- **Green**: Complete - all required records present
- **Blue**: Premium verified - vet + trainer verified, high scores

## Service Layer

### VerificationEngine
- Computes internal scores
- Determines verification levels
- Generates review flags
- **Never exposes internal data to public APIs**

### DocumentAIService
- Processes uploaded documents (OCR, classification, extraction)
- Detects document type (rabies_certificate, training_cert, etc.)
- Extracts structured fields
- Suggests wallet category
- Returns confidence scores

### BusinessVerificationService
- **ADA-safe** public verification for businesses
- Only returns information allowed under ADA
- No breed warnings, no internal scores

### FraudDetectionService
- Detects document reuse
- Checks data inconsistencies
- Computes fraud risk scores
- **Internal only** - never exposed

## API Architecture

### Handler Portal (`/api/handler/*`)
- Upload documents
- View wallet
- Request verification
- See health insights

### Business Portal (`/api/business/*`)
- **Verify dog** (`GET /verify/{dog_id}`)
- **Scan QR** (`POST /verify-scan`)
- **NFC tap** (`GET /verify-nfc/{token}`)
- Returns only `PublicStatusSummary` (ADA-safe)

### Vet Portal (`/api/vet/*`)
- List dogs linked to clinic
- Upload and verify records
- Mark records as "Vet Verified"

### Admin Portal (`/api/admin/*`)
- View internal scores
- Review queue
- Fraud flags
- Manual overrides
- Full audit trails

## Verification Flow

1. **Handler uploads document** → `RawDocument` created
2. **AI processes document** → Classifies, extracts fields
3. **NormalizedRecord created** → Structured data in wallet
4. **VerificationEngine computes scores** → Internal evaluation
5. **Verification level determined** → Yellow/Green/Blue
6. **Business scans QR** → Gets `PublicStatusSummary` (ADA-safe)

## ADA Compliance Rules

### What Businesses CAN See
- Dog name, photo
- Handler name
- Verification level
- Service role and tasks
- Vaccination status
- Training/vet verification
- Behavior status

### What Businesses CANNOT See
- Internal fraud scores
- Breed-based warnings
- Mismatch flags
- Internal review status
- Breed-task compatibility scores
- Any judgment about breed suitability

### Enforcement
- All public APIs return only `PublicStatusSummary`
- Internal scores stored separately
- Admin APIs require authentication
- Audit logs track all access

## Breed Capability Matrix

- Used for **internal recommendations only**
- Triggers **internal review flags** (not public denial)
- Suggests appropriate service roles
- Recommends breed-specific health screenings
- **Never used to deny public access**

## Document Processing Pipeline

1. **Upload** → `RawDocument` stored
2. **AI Processing** → OCR, classification, extraction
3. **Normalization** → `NormalizedRecord` created
4. **Verification** → Vet/trainer can verify
5. **Wallet** → Appears in handler's wallet
6. **Verification Update** → Triggers verification level recomputation

## Future Extensions

- Multi-tenant support (organization isolation)
- Multi-region deployment
- Real AI/ML integration (OCR, classification, fraud detection)
- Webhook system for events
- Public REST APIs for partners
- SDK/widgets for integration
- Payment processing for vet updates

## Security Considerations

- API keys for organization access
- Role-based access control
- Audit trails for all operations
- Data encryption at rest
- Secure document storage
- Rate limiting on public APIs

