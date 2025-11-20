# DOG PASSPORT MVP0 — COMPONENT LIBRARY & UI SPECIFICATIONS
**Version 1.0** | Design System Reference

---

## SECTION 1: COMPONENT INVENTORY & REUSABILITY MATRIX

### 1.1 Component Reusability Roadmap

This table shows which components are used across MVP0 screens, their dependency chain, and phase recommendations.

| Component | Type | Screens Used | Dependencies | Reusable Score | Phase | Notes |
|-----------|------|-------------|--------------|-----------------|-------|-------|
| **Card** | Layout | Dashboard, Passport, Records, Travel | None | ⭐⭐⭐⭐⭐ | MVP0 | Foundation; use everywhere |
| **Button** | Interactive | All | None | ⭐⭐⭐⭐⭐ | MVP0 | All CTAs use this |
| **Badge** | Status | Passport, Records, Travel | StatusIndicator | ⭐⭐⭐⭐ | MVP0 | Core to verification UX |
| **StatusIndicator** | Visual | Records, Passport, Travel | Icons | ⭐⭐⭐⭐ | MVP0 | Atomic visual element |
| **RecordItem** | Composite | Records, Passport | Card, Badge, StatusIndicator, Button | ⭐⭐⭐⭐ | MVP0 | Reused 15+ times |
| **PassportHeader** | Composite | Passport detail | Card, Badge, Button, Dog photo | ⭐⭐⭐⭐ | MVP0 | Page-level component |
| **UploadWidget** | Composite | Records/Upload flow | Button, Spinner, StatusIndicator | ⭐⭐⭐⭐ | MVP0 | Complex, encapsulated |
| **DogCard** | Composite | Dashboard, Dog list | Card, Badge, Button | ⭐⭐⭐⭐ | MVP0 | Reused per dog |
| **QuickActionsGrid** | Layout | Dashboard | Button | ⭐⭐⭐⭐ | MVP0 | Simple, flexible grid |
| **Modal** | Interactive | QR display, settings, confirmations | Button, Card | ⭐⭐⭐⭐ | MVP0 | Reuse for all overlays |
| **Spinner** | Visual | All async states | None | ⭐⭐⭐⭐⭐ | MVP0 | Atomic, everywhere |
| **Toast** | Notification | Global | None | ⭐⭐⭐⭐⭐ | MVP0 | System notification |
| **Navbar** | Layout | App layout | Button, Avatar | ⭐⭐⭐⭐ | MVP0 | Global nav header |
| **BottomNav** | Layout | Mobile app layout | Button | ⭐⭐⭐ | Phase 2 | Mobile-only |
| **Sidebar** | Layout | Desktop app layout | Button, NavLink | ⭐⭐⭐ | Phase 2 | Desktop variant |
| **TravelChecklist** | Composite | Travel mode | Card, ChecklistItem, TravelScore | ⭐⭐⭐ | MVP0 | Moderate reuse |
| **QRModal** | Composite | Passport → QR | Card, Button, QR code canvas | ⭐⭐⭐⭐ | MVP0 | One main use, modular |
| **EmptyState** | Composite | Dashboard (no dogs), Records (no uploads) | Card, Button | ⭐⭐⭐⭐ | MVP0 | Flexible layout |
| **Avatar** | Visual | User/dog photos, profiles | None | ⭐⭐⭐⭐ | MVP0 | Reused globally |
| **AuthGuard** | Logic | All protected routes | None | ⭐⭐⭐⭐ | MVP0 | Route protection wrapper |

---

## SECTION 2: CORE COMPONENT SPECIFICATIONS

### 2.1 Card Component (Foundation)

**Purpose:** Universal container for all content surfaces.

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  interactive?: boolean; // if true, show hover state
}
```

**Variants:**

| Variant | BG | Border | Shadow | Use Case |
|---------|----|---------|----|-----------|
| **default** | White | 1px gray-200 | soft | Primary content container |
| **elevated** | White | none | md (4px, 0.1 opacity) | Featured content, records |
| **outlined** | Transparent | 2px navy-300 | none | Secondary or editable areas |

**Responsive Sizing:**
- `sm`: p-3 (12px)
- `md`: p-6 (24px) — default
- `lg`: p-8 (32px)

**Example Usage:**
```tsx
<Card variant="elevated" padding="lg">
  <h2>Vaccination Records</h2>
  {/* content */}
</Card>
```

---

### 2.2 Button Component (Interactive)

**Purpose:** All clickable actions.

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}
```

**Variants:**

| Variant | Background | Text | Border | Hover | Use Case |
|---------|------------|------|--------|--------|----------|
| **primary** | navy-600 | white | none | navy-700 | Main action (Upload, Save) |
| **secondary** | white | navy-600 | 2px gold-accent | gold-accent/5 | Supporting action (Cancel) |
| **ghost** | transparent | slate-600 | none | gray-100 | Low priority (View, Learn) |
| **danger** | red-600 | white | none | red-700 | Destructive (Delete) |

**Sizes:**
- `sm`: px-3 py-1.5 text-sm — inline/compact
- `md`: px-4 py-2.5 text-base — standard
- `lg`: px-6 py-3 text-lg — CTA blocks

**States:**
```
default → hover → active → disabled
  (shadow)   (+outline)   (bg darker)   (opacity-50)
```

**Example Usage:**
```tsx
<Button
  variant="primary"
  size="md"
  icon={<UploadIcon />}
  loading={isUploading}
  onClick={handleUpload}
>
  Upload Record
</Button>
```

---

### 2.3 Badge Component (Status)

**Purpose:** Visual indicator of record/passport status.

**Props:**
```typescript
interface BadgeProps {
  status: 'verified' | 'pending' | 'failed' | 'expiring_soon' | 'expired';
  children: React.ReactNode;
  size?: 'sm' | 'md'; // icon + text size
}
```

**Variants:**

| Status | BG | Text | Border | Icon | Use Case |
|--------|-------|------|--------|------|----------|
| **verified** | green-100 | green-800 | green-300 | ✓ | Active, valid records |
| **pending** | blue-100 | blue-800 | blue-300 | ⏳ | Processing upload |
| **failed** | red-100 | red-800 | red-300 | ✗ | Could not parse |
| **expiring_soon** | amber-100 | amber-800 | amber-300 | ⚠️ | Within 30 days of expiry |
| **expired** | red-100 | red-900 | red-400 | ✗ | Past expiry date |

**Styling:**
- Shape: Pill (border-radius: full, px-3 py-1.5)
- Typography: text-xs, font-medium
- Flex: `inline-flex items-center gap-2`

**Example Usage:**
```tsx
<Badge status="verified">
  <CheckCircleIcon size={16} />
  Verified
</Badge>
```

---

### 2.4 StatusIndicator Component (Atomic Visual)

**Purpose:** Minimal, icon-only status display (no text).

**Props:**
```typescript
interface StatusIndicatorProps {
  status: 'verified' | 'pending' | 'failed' | 'expiring_soon' | 'expired';
  size?: 'sm' | 'md' | 'lg';
}
```

**Rendering:**
```
Status          Icon                  Color
─────────────────────────────────────────────
verified        CheckCircle (filled)   green-600
pending         Clock (spinning)      blue-600
failed          XCircle (filled)       red-600
expiring_soon   AlertCircle (outline) amber-600
expired         XCircle (filled)       red-700
```

**Sizes:** 16px, 24px (default), 32px

---

### 2.5 RecordItem Component (Composite)

**Purpose:** Reusable card for displaying a single record with edit/delete actions.

**Props:**
```typescript
interface RecordItemProps {
  record: Record;
  onEdit?: () => void;
  onDelete?: () => void;
  expandable?: boolean; // show details on click
}
```

**Anatomy:**
```
┌─────────────────────────────────────┐
│ [Status]  Title          [✎][✗]     │
│ Issuer: Dr. Name                     │
│ Issued: 03/15/24  Expires: 03/15/26 │
│ (20 days remaining)                  │
└─────────────────────────────────────┘
```

**States:**
- **verified**: green-50 border, checkmark visible
- **pending**: blue-50 border, spinner + progress bar
- **failed**: red-50 border, error message + "Try Again" link
- **expiring_soon**: amber-50 border, days-until count
- **expired**: red border, red text

**Interaction:**
- Click edit icon → Modal form to update fields
- Click delete icon → Confirm dialog
- Hover card → Shadow + slight lift (elevation)

---

### 2.6 PassportHeader Component (Composite)

**Purpose:** Top section of passport page (dog photo, name, status, quick actions).

**Anatomy:**
```
┌──────────────────────────────────┐
│  [Navy gradient background]      │
│  ┌────────────┐                  │
│  │ Dog Photo  │  Buddy           │
│  │            │  Labrador        │
│  │            │  [VERIFIED ✓]    │
│  └────────────┘                  │
│  Age: 5 years | Scans: 12x       │
│  ┌──────────────┬──────────────┐  │
│  │ Show QR Code │ Share        │  │
│  └──────────────┴──────────────┘  │
└──────────────────────────────────┘
```

**Props:**
```typescript
interface PassportHeaderProps {
  dog: Dog;
  passport: Passport;
  onShowQR: () => void;
  onShare: () => void;
}
```

**Styling:**
- Header BG: gradient navy-500 to navy-700
- Dog photo: 80px × 80px, border-4 white, rounded-lg, -mt-10 (overlap)
- Badge: Positioned top-right of photo
- Buttons: Full-width on mobile, side-by-side on desktop

---

### 2.7 UploadWidget Component (Composite, Complex)

**Purpose:** Complete upload flow (zone → processing → result).

**Props:**
```typescript
interface UploadWidgetProps {
  dogId: string;
  onSuccess?: (record: Record) => void;
}
```

**States & Rendering:**

1. **Upload Zone (initial state)**
   ```
   ┌─────────────────────────────────┐
   │  ☁️ Drag and drop your document │
   │     or click to browse           │
   │     PDF, JPG, PNG (Max 10MB)    │
   └─────────────────────────────────┘
   ```
   - Dashed border: 2px, gray-300
   - Hover: border gold-accent, bg gold-accent/5
   - Click: open file picker

2. **File Selected (pending upload)**
   ```
   ┌──────────────────────────────┐
   │ my-rabies-certificate.pdf    │
   │ 245 KB          [Upload →]   │
   └──────────────────────────────┘
   ```
   - Solid border, file icon left
   - Button: primary, right-aligned

3. **Processing**
   ```
   ┌───────────────────────────────┐
   │  [⏳ Spinner]                  │
   │  Analyzing your document...    │
   │  This may take a few seconds   │
   └───────────────────────────────┘
   ```
   - Blue-50 bg, blue border
   - Centered spinner + text

4. **Result: Success**
   ```
   ┌──────────────────────────────────┐
   │ ✓ Document Recognized            │
   │                                  │
   │ Type: Rabies Vaccination         │
   │ Title: Rabies Vaccination        │
   │ Issued: 03/15/24                 │
   │ Expires: 03/15/26                │
   │ Confidence: 95%                  │
   │                                  │
   │ [Add to Passport]  [Try Again]   │
   └──────────────────────────────────┘
   ```
   - Green-50 bg, green border
   - Checkmark icon
   - Show extracted fields with edit capability

5. **Result: Failed**
   ```
   ┌──────────────────────────────────┐
   │ ⚠️ Could Not Process              │
   │                                  │
   │ Document type unclear. Please    │
   │ review and edit manually.        │
   │                                  │
   │ [ Upload Manual Form ]  [Cancel] │
   └──────────────────────────────────┘
   ```
   - Red-50 bg, red border
   - Alert icon
   - Fallback form inputs

**Behavior:**
- Drag & drop support for accessibility
- File validation (type, size) before upload
- Polling for AI job status (poll every 1s, max 30s)
- Toast notification on completion

---

### 2.8 Modal Component (Interactive, Reusable)

**Purpose:** Overlay for QR display, confirmations, settings.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  footer?: React.ReactNode; // buttons
}
```

**Variants:**

| Size | Width (desktop) | Use Case |
|------|----------------|----------|
| **sm** | 320px (90% mobile) | Confirmations |
| **md** | 500px (90% mobile) | Forms, QR code |
| **lg** | 700px (95% mobile) | Detailed views |

**Anatomy:**
```
╔════════════════════════════╗
║ Title         [×]          ║
╠════════════════════════════╣
║                            ║
║   Main Content             ║
║                            ║
╠════════════════════════════╣
║  [Cancel]      [Confirm]   ║
╚════════════════════════════╝
```

**Styling:**
- Backdrop: black, opacity-50
- Modal: white, rounded-xl, shadow-lg
- Header: bold, navy-900, close button (top-right)
- Body: p-6, scrollable if tall
- Footer: flex justify-end, gap-3, pt-6, border-t

**Animation:**
- Fade in/out: 200ms
- Scale: 0.95 → 1.0 on enter

---

### 2.9 Toast Component (Notification)

**Purpose:** Temporary notifications (success, error, info).

**Props:**
```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms, default 5000
  onClose?: () => void;
}
```

**Variants:**

| Type | BG | Icon | Text | Example |
|------|----|------|------|---------|
| **success** | green-50 | ✓ | green-800 | "Record added!" |
| **error** | red-50 | ✗ | red-800 | "Upload failed" |
| **info** | blue-50 | ℹ️ | blue-800 | "Saved to draft" |
| **warning** | amber-50 | ⚠️ | amber-800 | "Expiring soon" |

**Position:** Fixed, bottom-right, above bottom-nav (mobile)
**Animation:** Slide-in from right, fade-out

---

### 2.10 Spinner Component (Visual, Atomic)

**Purpose:** Loading indicator for async states.

**Props:**
```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'slate';
  inline?: boolean; // vertical align in text
}
```

**Rendering:**
- Circular border, 3px stroke width
- 75% border visible, 25% transparent (forming spinner arc)
- Rotate animation: 360° over 1s, infinite
- Color: inherits from text or explicit color prop

**Sizes:** 16px, 24px (default), 32px

---

## SECTION 3: COMPOSITE PAGE LAYOUTS

### 3.1 Dashboard Page Layout

```
┌─────────────────────────────────────┐
│ [Navbar: Dog name + menu]           │
├─────────────────────────────────────┤
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║  Welcome back              │   ║
│ ║  Buddy's health is on track │   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ [Dog Photo]  Buddy            │   │
│ │              Labrador         │   │
│ │              [VERIFIED ✓]     │   │
│ │              [Quick Actions]  │   │
│ └───────────────────────────────┘   │
│                                     │
│ Health Summary                      │
│ Verified: 7 | Expiring: 1 | Score: 92%
│                                     │
│ Your Dogs (if multiple)             │
│ [Dog 1]  [Dog 2]  [Dog 3]          │
│                                     │
├─────────────────────────────────────┤
│ [Bottom Nav: Home|Wallet|Records]   │
└─────────────────────────────────────┘
```

**Responsive:**
- Desktop (>640px): 2-col grid for multi-dog
- Mobile: Stack all vertically
- Bottom nav: Mobile only

---

### 3.2 Passport Detail Page Layout

```
┌─────────────────────────────────────┐
│ [Navbar]                            │
├─────────────────────────────────────┤
│                                     │
│ ╔═════════════════════════════════╗ │
│ ║ [Header: photo + name + badge] ║ │
│ ║ Age: 5 | Scans: 12x            ║ │
│ ║ [Show QR]    [Share]           ║ │
│ ╚═════════════════════════════════╝ │
│                                     │
│ Records                             │
│ ┌─────────────────────────────────┐ │
│ │ ✓ Rabies Vaccine                │ │
│ │   Dr. Chen | Expires 03/15/26   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ✓ Task Training                 │ │
│ │   NSDS | Expires 01/10/25       │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ⚠️  DHPP — Expiring Soon        │ │
│ │   20 days remaining             │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Upload New Record]                 │
│                                     │
├─────────────────────────────────────┤
│ [Bottom Nav]                        │
└─────────────────────────────────────┘
```

---

### 3.3 Upload Flow Layout

```
Step 1: Upload Zone
┌──────────────────────────────┐
│  ☁️ Drag and drop document    │
└──────────────────────────────┘

Step 2: Processing
┌──────────────────────────────┐
│  [⏳ Spinner]                 │
│  Analyzing...                │
└──────────────────────────────┘

Step 3: Review
┌──────────────────────────────┐
│ ✓ Rabies Vaccination         │
│                              │
│ Title: ________________      │
│ Issue Date: 03/15/24         │
│ Expiry: 03/15/26             │
│                              │
│ [Edit]  [Confirm]            │
└──────────────────────────────┘

Step 4: Success
┌──────────────────────────────┐
│ ✓ Record Added               │
│ Back to Passport →           │
└──────────────────────────────┘
```

**Multi-step form:**
- Prev/Next buttons (hide prev on step 1)
- Progress indicator: Step 1/4
- Auto-advance on success

---

### 3.4 QR Verification Page (Public)

```
┌─────────────────────────────────────┐
│  (Minimal navbar or logo)           │
├─────────────────────────────────────┤
│                                     │
│        ┌────────────────┐           │
│        │  [Dog Photo]   │           │
│        │  8" × 8"       │           │
│        └────────────────┘           │
│                                     │
│     VERIFIED SERVICE DOG ✓          │
│                                     │
│        Buddy — Labrador             │
│        65 lbs                       │
│        Microchip: 123456789         │
│                                     │
│  ─────────────────────────────────  │
│  COMPLIANCE CHECKLIST               │
│                                     │
│  ✓ Rabies vaccination current       │
│  ✓ Task training verified           │
│  ⚠️  DHPP expiring in 20 days       │
│  ✓ Behavior attested                │
│                                     │
│  Compliance Score: 92/100           │
│                                     │
│  [View Full Records] (pwd protected)│
│  [Learn More - ADA Guide]           │
│                                     │
├─────────────────────────────────────┤
│  © Dog Passport | Privacy           │
└─────────────────────────────────────┘
```

**Design:**
- Large, centered dog photo
- Prominent verification badge
- High contrast for QR scanning environment
- Minimal distractions

---

## SECTION 4: INTERACTION PATTERNS & STATES

### 4.1 Form Validation Pattern

```
Input Field (Normal)
┌──────────────────────┐
│ Email Address        │
│ [____________________]│  ← Focus ring on interaction
└──────────────────────┘
Help text

Input Field (Error)
┌──────────────────────┐
│ Email Address        │
│ [____________________]│  ← Border red-300
└──────────────────────┘
⚠️ Invalid email format

Input Field (Success)
┌──────────────────────┐
│ Email Address        │
│ [____________________]│ ✓ ← Border green-300
└──────────────────────┘
```

**Rules:**
- Errors show inline, below field
- Success checkmark on valid
- Clear, friendly error messages
- Real-time validation on blur/change

---

### 4.2 Loading State Pattern

**Global Page Load:**
- Skeleton cards (gray shimmer effect)
- Same layout as real content (layout shift prevention)

**Component-level Load:**
- Spinner badge on card corner
- Disabled state on buttons
- "Loading..." text

**API Error:**
- Error toast (red)
- Retry button (in error state card)
- Fallback content if applicable

---

### 4.3 Empty State Pattern

```
┌────────────────────────────────┐
│                                │
│        📁                       │
│   No Records Yet               │
│                                │
│   You haven't uploaded any     │
│   vaccination records yet.     │
│                                │
│   [Upload Your First Record]   │
│                                │
└────────────────────────────────┘
```

**Elements:**
- Large icon (128px, gray)
- Headline (20px, navy-900)
- Subheading (16px, slate-600)
- Call-to-action button

---

## SECTION 5: MOBILE-SPECIFIC ADAPTATIONS

### 5.1 Breakpoints (Tailwind)

```
Mobile:    < 640px  (default)
Tablet:    640px+   (sm:)
Desktop:   1024px+  (lg:)
```

### 5.2 Mobile Navigation

**Top Nav (always visible):**
- Back button (left)
- Page title (center)
- Menu/options (right)
- Fixed, h-16

**Bottom Nav (mobile only):**
- 5 tabs: Home | Wallet | Records | Travel | Profile
- Icons + labels
- Active = navy-600 text + navy-100 bg
- Fixed at bottom, pb-safe-area

### 5.3 Touch-Friendly Interactions

- Minimum touch target: 44px × 44px
- Spacing between buttons: ≥ 8px
- Long-press actions for secondary (copy, delete)
- Swipe gestures (left/right) for card actions

---

## SECTION 6: ACCESSIBILITY (A11Y)

### 6.1 Color Contrast

| Element | Foreground | Background | WCAG |
|---------|-----------|-----------|------|
| Body text | slate-700 | white | AAA (7.5:1) |
| Links | navy-600 | white | AA (5.2:1) |
| Button text | white | navy-600 | AAA (8.5:1) |
| Badge text | green-800 | green-100 | AA (5:1) |

### 6.2 Focus States

All interactive elements must have visible focus ring:
```css
:focus-visible {
  outline: 2px solid navy-600;
  outline-offset: 2px;
}
```

### 6.3 ARIA Labels

```tsx
<button aria-label="Upload new record">
  <UploadIcon /> Upload
</button>

<div role="status" aria-live="polite">
  {loadingMessage}
</div>

<div aria-hidden="true">{decorativeIcon}</div>
```

### 6.4 Semantic HTML

- Use `<button>` for actions, not `<div>` + CSS
- Use `<form>` with `<label>` + `<input>`
- Use `<nav>` for navigation
- Heading hierarchy: h1 > h2 > h3 (no skips)

---

## SECTION 7: ANIMATION & MICRO-INTERACTIONS

### 7.1 Transitions

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Button hover | :hover | 150ms | ease-out |
| Spinner | ongoing | 1000ms | linear |
| Modal open | isOpen=true | 200ms | ease-in-out |
| Card expand | click | 300ms | ease-out |
| Toast enter | show | 200ms | ease-out |
| Page transition | route change | 200ms | fade |

### 7.2 Example: Button Hover

```css
@apply transition-all duration-150 ease-out

/* Normal → Hover */
background-color → darker
box-shadow → soft
transform → scale(1.02)

/* Hover → Active */
transform → scale(0.98)
```

### 7.3 Loading Animation

```css
@apply animate-spin
/* 360° rotation over 1s, infinite */
```

---

## SECTION 8: DARK MODE (Future Phase)

**Strategy:** Prepare component structure now; toggle in Phase 2.

```typescript
// lib/theme.ts
const colors = {
  light: {
    bg: '#FFFFFF',
    text: '#0A1A5F',
    border: '#E5E7EB',
  },
  dark: {
    bg: '#1F2937',
    text: '#F3F4F6',
    border: '#4B5563',
  },
};

// Use CSS variables for easy toggle
:root {
  --bg-primary: #FFFFFF;
  --text-primary: #0A1A5F;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1F2937;
    --text-primary: #F3F4F6;
  }
}
```

---

## SECTION 9: DESIGN SYSTEM TOKENS (CSS VARIABLES)

```css
/* Typography */
--font-family: 'Inter', sans-serif;
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 20px;
--font-size-xl: 24px;
--font-size-2xl: 32px;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Colors (Primary Brand) */
--color-navy-600: #0A1A5F;
--color-gold-accent: #C8B46F;
--color-green-verify: #0B9A6D;
--color-amber-warn: #DEA93A;
--color-red-error: #C62828;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

## APPENDIX: COMPONENT CHECKLIST FOR MVP0

### Build Now (Week 1-2)
- [ ] Card (all variants)
- [ ] Button (all variants)
- [ ] Badge (all statuses)
- [ ] StatusIndicator
- [ ] Spinner
- [ ] Modal
- [ ] Toast
- [ ] RecordItem
- [ ] PassportHeader
- [ ] UploadWidget

### Build Week 3
- [ ] DogCard
- [ ] QuickActionsGrid
- [ ] EmptyState
- [ ] AuthGuard wrapper

### Build Week 4 (Polish)
- [ ] Navbar
- [ ] BottomNav (mobile)
- [ ] TravelChecklist
- [ ] QRModal
- [ ] Avatar
- [ ] Form components (Input, Select, Textarea)

---

**END OF DOCUMENT**

This UI specification is ready for:
1. Figma designer → High-fidelity mocks
2. Frontend team → Component build-out
3. QA → Visual regression testing
4. Design system evolution (Phase 2+)
