# Dog Passport

**The Official Digital Identity and Health Vault System for Service Dogs**

Dog Passport is an ADA-compliant platform designed to become the national standard for service dog verification and pet health record management. It provides instant verification through QR codes, NFC technology, and a comprehensive digital wallet system for all veterinary records.

---

## 🎯 What is Dog Passport?

Dog Passport is a **trusted digital identity and vet-record platform** designed to simplify mobility, care, and verification for service dogs and everyday pets. It serves as:

- **Digital ID for Service Dogs**: Instant verification through QR codes and NFC technology
- **Vet Wallet for All Pets**: Centralized storage for all medical records, vaccinations, and health documents
- **QR-Code Verification System**: Businesses can instantly verify service dog status
- **Auto-Generated DOT Forms**: Streamlined airline travel documentation
- **Standard Verification Method**: Trusted by airlines, hotels, rideshares, and public venues
- **Future Ecosystem**: Integration with vets, grooming services, insurance, and dog-friendly venues

### Core Problem Solved

1. **No Official Identification System**: Lack of standardized paperwork causes confusion
2. **Frequent Denials**: Businesses reject individuals due to insufficient documentation
3. **Manual Airline Reviews**: Slow, resource-heavy DOT form processing
4. **Scattered Medical Records**: Pet records spread across various formats and systems

### Solution

Dog Passport provides a single, verifiable platform that:
- Reduces service dog access denials by 90%
- Automates airline DOT form submissions
- Centralizes all pet health records
- Builds trust between handlers, businesses, and public venues

---

## 🏗️ Frontend Architecture

### Technology Stack

- **Framework**: Next.js 14.2.33 (React 18.3.1)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4.1.9 with custom theme system
- **UI Components**: Radix UI primitives + shadcn/ui components
- **State Management**: React hooks and context
- **Icons**: Lucide React
- **QR Code Generation**: qrcode library
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Fonts**: Geist Sans & Geist Mono

### Project Structure

```
app/
├── (auth)/              # Authentication routes (login, signup, onboarding)
├── (dashboard)/         # Protected dashboard routes
│   ├── blog/           # Community blog with posts and comments
│   ├── community/      # Breed communities and member connections
│   ├── education/      # Educational content for handlers and staff
│   ├── health/         # Health tracking, appointments, meals
│   ├── records/        # Document vault and record management
│   ├── resources/     # Partner resources and integrations
│   ├── subscription/  # Premium subscription management
│   ├── support/        # Support topics and FAQs
│   ├── travel/         # Travel guides and DOT form generation
│   ├── verification/   # Service dog verification workflow
│   └── wallet/         # Digital passport badge with QR code
├── dashboard/          # Alternative dashboard route structure
├── globals.css         # Global styles and Tailwind theme
├── layout.tsx          # Root layout with fonts and analytics
└── page.tsx            # Landing page

components/
├── dashboard/
│   └── bottom-nav.tsx  # Mobile bottom navigation
├── theme-provider.tsx  # Theme context provider
└── ui/                 # shadcn/ui component library (50+ components)

lib/
├── auth-context.tsx    # Authentication context
├── mock-data.ts        # Comprehensive mock data (see below)
├── types.ts           # TypeScript type definitions
└── utils.ts           # Utility functions (cn, etc.)

public/                # Static assets (images, icons)
```

### Styling System

**Custom Color Palette** (Navy & Forest Theme):
- **Navy**: `navy-900` (#1E3A8A), `navy-800` (#1E40AF), `navy-700`, `navy-600`
- **Forest**: `forest-600` (#065F46), `forest-700` (#047857), `forest-300`, `forest-50`
- **Ice**: `ice-100` (#DBEAFE), `ice-50` (#F0F9FE)
- **Emerald**: `emerald-100`, `emerald-500` (#10B981), `emerald-600`, `emerald-700`, `emerald-800`
- **Accent Colors**: `amber-400`, `red-600`, `gray-400`, `gray-600`, `gray-700`

**Theme Configuration**:
- Defined in `app/globals.css` using Tailwind v4's `@theme inline` syntax
- CSS variables for semantic colors (background, foreground, primary, etc.)
- Custom color utilities registered in theme for use throughout app
- Dark mode support via `.dark` class

### Key Features

1. **Mobile-First Design**: Responsive layout optimized for mobile devices
2. **QR Code Generation**: Dynamic QR codes with dog verification data
3. **Document Management**: Upload, organize, and track expiration dates
4. **Health Tracking**: Appointments, meals, and health metrics
5. **Community Features**: Breed communities, blog posts, and member connections
6. **Travel Guides**: Context-specific guides for airlines, restaurants, hotels, etc.
7. **Verification System**: Multi-tier verification (yellow, green, blue checkmarks)
8. **Education Hub**: Content for handlers and business staff

---

## 📊 Mock Data Structure

All mock data is defined in `lib/mock-data.ts` and follows TypeScript interfaces from `lib/types.ts`.

### 1. User Data

```typescript
mockUser: {
  id: 'user-1',
  email: 'john.doe@gmail.com',
  name: 'John Doe',
  subscriptionTier: 'premium' | 'free',
  subscriptionExpiresAt: Date,
  createdAt: Date
}
```

### 2. Dog Profile

```typescript
mockDog: {
  id: 'dog-1',
  userId: 'user-1',
  name: 'Buddy',
  breed: 'Labrador Retriever',
  weight: 68,
  age: 6,
  dateOfBirth: Date,
  color: 'Golden Yellow',
  sex: 'Male',
  photo: '/service-dog-labrador.jpg',
  microchip: 'MC-123456789',
  taskType: 'ptsd' | 'mobility' | 'medical-alert' | 'hearing' | 'vision',
  verificationStatus: 'verified' | 'pending' | 'rejected',
  checkmarkStatus: 'blue' | 'green' | 'yellow' | 'none',
  hypoallergenicRating: 'high' | 'medium' | 'low',
  certificationDate: Date,
  trainerName: string,
  personality: string,
  specialNotes: string,
  serviceDogInfoSubmitted: boolean,
  vetInfoUploaded: boolean,
  vetVerificationRequested: boolean,
  vetVerificationStatus: 'approved' | 'pending' | 'rejected',
  vetVerificationDate: Date
}
```

### 3. Dog Badges

```typescript
mockDogBadges: {
  adaCompliant: boolean,
  tsaApproved: boolean,
  vetVerified: boolean,
  hypoallergenic: boolean,
  publicAccessCleared: boolean
}
```

### 4. Veterinary Records

```typescript
mockRecords: VetRecord[] = [
  {
    id: 'rec-1',
    dogId: 'dog-1',
    fileName: 'Rabies Vaccination Certificate 2024',
    fileUrl: '/placeholder.pdf',
    category: 'vaccination' | 'training-cert' | 'vet-visit' | 'health',
    status: 'active' | 'expiring-soon' | 'expired',
    expirationDate: Date,
    uploadedAt: Date,
    verifiedByVet: boolean,
    vetName: 'Dr. Emily Chen, DVM'
  },
  // ... 8 total records including:
  // - Vaccinations (Rabies, DHPP, Bordetella)
  // - Training certificates
  // - Health screenings (Hip Dysplasia)
  // - Health certificates for travel
  // - Microchip registration
]
```

**Record Categories**:
- `vaccination`: Rabies, DHPP, Bordetella, etc.
- `training-cert`: Service dog training certificates
- `vet-visit`: Regular checkups and health exams
- `health`: Screenings, microchip, general health records

**Record Status**:
- `active`: Current and valid
- `expiring-soon`: Expires within 60 days
- `expired`: Past expiration date

### 5. Travel Guides

```typescript
mockTravelGuides: TravelGuide[] = [
  {
    id: 'tg-1',
    destination: 'Air Travel',
    guideType: 'airline',
    title: 'Flying with Your Service Dog: Complete Guide',
    content: string,
    tips: string[],
    documents: string[],
    icon: '✈️',
    difficulty: 'easy' | 'moderate' | 'hard'
  },
  // ... 6 guides covering:
  // - Air Travel
  // - Rideshare Services (Uber/Lyft)
  // - Restaurants & Cafes
  // - Hotels & Accommodations
  // - National Parks & Outdoor
  // - Events & Public Spaces
]
```

### 6. Resource Partners

```typescript
mockResourcePartners: ResourcePartner[] = [
  {
    id: 'rp-1',
    name: 'American Airlines',
    category: 'airline' | 'rideshare' | 'hotel' | 'grooming' | 'insurance' | 'retail' | 'training',
    description: string,
    logo: string (emoji),
    link: '#',
    badge: 'Verified Partner' | 'Partner' | 'Official Partner'
  },
  // ... 9 partners including:
  // - Airlines: American Airlines
  // - Rideshare: Uber, Lyft
  // - Hotels: Ritz-Carlton, Hyatt
  // - Grooming: Wagz Grooming
  // - Insurance: Healthy Paws
  // - Retail: Chewy
  // - Training: International Service Dog Alliance
]
```

### 7. Support Topics

```typescript
mockSupportTopics: SupportTopic[] = [
  {
    id: 'sp-1',
    category: 'verification' | 'legal' | 'technical' | 'account' | 'health',
    question: string,
    answer: string,
    relatedTopics: string[]
  },
  // ... 6 topics covering:
  // - Blue checkmark verification process
  // - Required documents
  // - ADA rights
  // - Document upload process
  // - Multiple dogs on account
  // - Health record tracking
]
```

### 8. Education Cards

```typescript
mockEducationCards: EducationCard[] = [
  {
    id: 'ed-staff-1',
    title: 'What is a Service Dog?',
    description: string,
    content: string (detailed markdown-like content),
    audience: 'staff' | 'handler' | 'both',
    readTime: number (minutes),
    icon: string (emoji)
  },
  // ... 10+ cards including:
  // Staff Education (5 core cards):
  //   - What is a Service Dog?
  //   - The 2-Question Rule
  //   - Allergy Concerns & Service Dogs
  //   - Breed Myths Debunked
  //   - 10-Second Staff Training Quick Reference
  // Handler Education:
  //   - ADA Compliance Guide
  //   - Service Dog vs. Emotional Support Animal
  //   - What to Do If Denied Access
  //   - Allergy Management Protocol
]
```

### 9. Appointments

```typescript
mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    dogId: 'dog-1',
    title: 'Annual Wellness Check',
    type: 'vet' | 'grooming' | 'training' | 'check-up',
    date: Date,
    vetName?: string,
    notes: string,
    status: 'scheduled' | 'completed' | 'missed'
  },
  // ... 7 appointments including:
  // - Upcoming: Annual wellness, grooming, training, behavior check
  // - Past: Completed wellness, grooming, training sessions
]
```

### 10. Meals

```typescript
mockMeals: Meal[] = [
  {
    id: 'meal-1',
    dogId: 'dog-1',
    date: Date,
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (morning)',
    notes?: string
  },
  // ... 8 meals tracking:
  // - Today's meals (morning & evening)
  // - Yesterday's meals
  // - 3 days ago
  // - 5 days ago
]
```

### 11. Breed Community

```typescript
mockBreedCommunity: {
  id: 'bc-1',
  breed: 'Labrador Retriever',
  memberCount: 1247,
  totalDogs: 2891,
  avgWeight: 65,
  commonHealthConcerns: string[],
  topTips: string[]
}

mockCommunityMembers: CommunityMember[] = [
  {
    id: 'cm-1',
    dogName: 'Max',
    breed: 'Labrador Retriever',
    photo: string,
    location: 'Portland, OR',
    taskType: 'ptsd' | 'mobility' | 'medical-alert'
  }
]
```

### 12. AI Insights

```typescript
mockAIInsights: AIInsight[] = [
  {
    id: 'ai-1',
    category: 'health' | 'nutrition' | 'wellness' | 'training' | 'behavior',
    title: 'Vaccination Due Soon',
    message: string,
    actionItems: string[],
    priority: 'high' | 'medium' | 'low',
    createdAt: Date
  },
  // ... 6 insights including:
  // - Vaccination reminders
  // - Weight trends
  // - Breed-specific health alerts
  // - Training refresher reminders
  // - Grooming overdue
  // - Exercise recommendations
]
```

### 13. Health Metrics

```typescript
mockHealthMetrics: HealthMetric[] = [
  // Combines meals and appointments into unified timeline
  {
    date: Date,
    type: 'meal' | 'appointment',
    title: string,
    details?: string,
    status: 'scheduled' | 'completed' | 'missed'
  }
]
```

### 14. Blog Posts

```typescript
mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Flying with Buddy: My First TSA Experience',
    author: 'Sarah Johnson',
    authorRole: 'handler' | 'vet' | 'trainer' | 'moderator' | 'expert',
    excerpt: string,
    content: string,
    category: 'tips' | 'story' | 'research' | 'event' | 'question',
    likes: number,
    comments: number,
    createdAt: Date,
    updatedAt: Date,
    tags: string[]
  },
  // ... 6 blog posts covering:
  // - Personal stories
  // - Training tips
  // - Research articles
  // - Community events
  // - Q&A posts
]
```

### 15. Blog Comments

```typescript
mockBlogComments: BlogComment[] = [
  {
    id: 'comment-1',
    postId: 'blog-1',
    author: 'Maria Garcia',
    content: string,
    likes: number,
    createdAt: Date
  }
]
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file (if needed for future backend integration):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
# Add other environment variables as needed
```

---

## 📱 Key Pages & Features

### Wallet Page (`/wallet`)
- **QR Code Badge**: Dynamic QR code with dog verification data
- **Passport Modes**: Standard, Flight, Rideshare, Restaurant, Allergy
- **Trust Badges**: ADA Compliant, TSA Approved, Vet Verified, Hypoallergenic
- **NFC Tap Verification**: Simulated NFC reader interaction
- **Mode-Specific Info**: Context-aware documentation requirements

### Records Page (`/records`)
- **Document Vault**: Upload and organize all veterinary records
- **Expiration Tracking**: Automatic alerts for expiring documents
- **Category Organization**: Vaccination, training, health, vet visits
- **Vet Verification**: Records verified by veterinarians

### Health Page (`/health`)
- **Appointment Calendar**: Upcoming and past appointments
- **Meal Tracking**: Daily meal logs with notes
- **Health Timeline**: Unified view of all health activities
- **AI Insights**: Proactive health recommendations

### Travel Page (`/travel`)
- **Travel Guides**: Context-specific guides for different scenarios
- **DOT Form Generation**: Auto-generated forms for airline travel
- **Document Checklists**: Required documents per travel type
- **Difficulty Ratings**: Easy, moderate, hard travel scenarios

### Verification Page (`/verification`)
- **Verification Workflow**: Step-by-step verification process
- **Blue Checkmark Status**: Premium verification badge
- **Vet Verification**: Veterinary review and approval
- **Document Submission**: Upload required verification documents

### Blog Page (`/blog`)
- **Community Posts**: Stories, tips, research, events, Q&A
- **Category Filtering**: Filter by post type
- **Engagement**: Likes and comments
- **Author Roles**: Handlers, vets, trainers, experts

### Community Page (`/community`)
- **Breed Communities**: Connect with same-breed owners
- **Member Directory**: Find other service dog handlers
- **Health Insights**: Breed-specific health information
- **Community Stats**: Member counts, average weights, tips

### Education Page (`/education`)
- **Staff Training**: Quick reference cards for business staff
- **Handler Resources**: ADA compliance, rights, best practices
- **Interactive Content**: Read time, icons, audience-specific
- **10-Second Training**: Ultra-quick staff reference

---

## 🎨 Design System

### Color Palette

**Primary Brand Colors**:
- Navy Blue: Trust, authority, professionalism
- Forest Green: Health, wellness, verification
- Ice Blue: Clean, modern, accessible
- Emerald: Success, approval, verification

**Semantic Colors**:
- Primary: Navy 900
- Secondary: Ice 100
- Accent: Forest 600
- Destructive: Red 600
- Muted: Gray 400/600

### Typography

- **Sans**: Geist Sans (primary font)
- **Mono**: Geist Mono (code/technical content)

### Component Library

Built on **shadcn/ui** with 50+ components:
- Buttons, Cards, Forms, Dialogs, Dropdowns
- Tables, Charts, Calendars, Tabs
- Navigation, Sidebars, Tooltips
- Toast notifications, Alerts

---

## 🔐 Verification System

### Checkmark Tiers

1. **Yellow Checkmark**: Basic service dog registration
2. **Green Checkmark**: Verified with documentation
3. **Blue Checkmark**: Premium verification with vet review

### Verification Process

1. **Service Dog Info Submission**: Task attestation, training certificates
2. **Vet Info Upload**: Health records, vaccinations
3. **Vet Verification Request**: Submit for veterinary review
4. **Approval**: Blue checkmark granted after review

---

## 📚 Additional Resources

- **Architecture Docs**: See `md-files/dog-passport-arch.md`
- **UI Guidelines**: See `md-files/dog-passport-ui.md`
- **Playbook**: See `md-files/dog-passport-playbook.md`
- **Backend API**: See `backend/README.md`

---

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

---

## 📄 License

Proprietary - All rights reserved

---

## 🎯 Vision

**"Dog Passport is positioned to become the Clear / TSA Precheck of Service Dogs, making travel seamless and reducing operational burden for companies."**

**"Instant Trust. Everywhere."**

---

*Built with ❤️ for service dog handlers and their companions*

