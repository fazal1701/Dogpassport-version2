import { User, DogProfile, VetRecord, EducationCard, DogBadges, TravelGuide, ResourcePartner, SupportTopic, Appointment, Meal, BreedCommunity, CommunityMember, AIInsight, HealthMetric, BlogPost, BlogComment } from './types';

export const mockUser: User = {
  id: 'user-1',
  email: 'john.doe@gmail.com',
  name: 'John Doe',
  subscriptionTier: 'premium',
  subscriptionExpiresAt: new Date('2025-12-31'),
  createdAt: new Date('2024-01-15'),
};

export const mockDog: DogProfile = {
  id: 'dog-1',
  userId: 'user-1',
  name: 'Buddy',
  breed: 'Labrador Retriever',
  weight: 68,
  age: 6,
  dateOfBirth: new Date('2018-03-15'),
  color: 'Golden Yellow',
  sex: 'Male',
  photo: '/service-dog-labrador.jpg',
  microchip: 'MC-123456789',
  taskType: 'ptsd',
  verificationStatus: 'verified',
  checkmarkStatus: 'blue', // Blue checkmark for premium verified
  hypoallergenicRating: 'high',
  createdAt: new Date('2024-01-20'),
  certificationDate: new Date('2020-06-01'),
  trainerName: 'Advanced Service Dog Training Institute',
  personality: 'Calm, alert, highly attuned to handler emotions',
  specialNotes: 'Trained for PTSD alert and grounding techniques',
  serviceDogInfoSubmitted: true,
  vetInfoUploaded: true,
  vetVerificationRequested: true,
  vetVerificationStatus: 'approved',
  vetVerificationDate: new Date('2024-02-01'),
};

export const mockDogBadges: DogBadges = {
  adaCompliant: true,
  tsaApproved: true,
  vetVerified: true,
  hypoallergenic: true,
  publicAccessCleared: true,
};

export const mockRecords: VetRecord[] = [
  {
    id: 'rec-1',
    dogId: 'dog-1',
    fileName: 'Rabies Vaccination Certificate 2024',
    fileUrl: '/placeholder.pdf',
    category: 'vaccination',
    status: 'active',
    expirationDate: new Date('2026-03-15'),
    uploadedAt: new Date('2024-03-10'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-2',
    dogId: 'dog-1',
    fileName: 'Service Dog Task Attestation - Advanced Training',
    fileUrl: '/placeholder.pdf',
    category: 'training-cert',
    status: 'active',
    expirationDate: new Date('2025-12-31'),
    uploadedAt: new Date('2024-06-01'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-3',
    dogId: 'dog-1',
    fileName: 'Annual Health Checkup - October 2024',
    fileUrl: '/placeholder.pdf',
    category: 'vet-visit',
    status: 'active',
    uploadedAt: new Date('2024-10-05'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-4',
    dogId: 'dog-1',
    fileName: 'DHPP Vaccination - 2023',
    fileUrl: '/placeholder.pdf',
    category: 'vaccination',
    status: 'expiring-soon',
    expirationDate: new Date('2025-02-10'),
    uploadedAt: new Date('2023-02-15'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-5',
    dogId: 'dog-1',
    fileName: 'Bordetella (Kennel Cough) Vaccine',
    fileUrl: '/placeholder.pdf',
    category: 'vaccination',
    status: 'active',
    expirationDate: new Date('2025-09-20'),
    uploadedAt: new Date('2024-09-18'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-6',
    dogId: 'dog-1',
    fileName: 'Hip Dysplasia Screening - Clear',
    fileUrl: '/placeholder.pdf',
    category: 'health',
    status: 'active',
    uploadedAt: new Date('2023-06-12'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-7',
    dogId: 'dog-1',
    fileName: 'Microchip Registration Certificate',
    fileUrl: '/placeholder.pdf',
    category: 'health',
    status: 'active',
    uploadedAt: new Date('2024-01-20'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
  {
    id: 'rec-8',
    dogId: 'dog-1',
    fileName: 'Health Certificate - International Travel',
    fileUrl: '/placeholder.pdf',
    category: 'vet-visit',
    status: 'active',
    expirationDate: new Date('2025-11-15'),
    uploadedAt: new Date('2024-11-10'),
    verifiedByVet: true,
    vetName: 'Dr. Emily Chen, DVM',
  },
];

export const mockTravelGuides: TravelGuide[] = [
  {
    id: 'tg-1',
    destination: 'Air Travel',
    guideType: 'airline',
    title: 'Flying with Your Service Dog: Complete Guide',
    content: 'The TSA and DOT have specific requirements for service dogs traveling by air. Dog Passport makes this seamless by providing instant verification through your blue checkmark badge.',
    tips: [
      'Arrive 3 hours early for domestic flights, 4+ for international',
      'Inform the airline at check-in that you have a service dog',
      'Your dog can stay with you in the cabin - no kennel required',
      'Use Dog Passport Flight Mode to pre-verify with airlines',
      'Keep your vaccination records accessible (they are in your vault)',
      'Practice your dog staying calm under your seat during the flight'
    ],
    documents: ['Service Dog Task Attestation', 'Rabies Vaccination', 'Health Certificate (international)'],
    icon: '✈️',
    difficulty: 'moderate',
  },
  {
    id: 'tg-2',
    destination: 'Rideshare Services',
    guideType: 'rideshare',
    title: 'Uber, Lyft & Taxi Services with Your Service Dog',
    content: 'Rideshare companies often struggle with service dog acceptance. Dog Passport\'s Rideshare Mode provides instant credential verification, reducing denial rates by 90%.',
    tips: [
      'Activate Dog Passport Rideshare Mode before requesting a ride',
      'Be upfront: "I have a service dog, not a pet" in your request note',
      'Share your QR badge if driver seems uncertain',
      'Cancel immediately if driver refuses (report to app)',
      'Always rate honestly - poor behavior helps the system learn',
      'Consider premium memberships that prioritize service dogs'
    ],
    documents: ['Service Dog Certification', 'Vaccination Records'],
    icon: '🚗',
    difficulty: 'easy',
  },
  {
    id: 'tg-3',
    destination: 'Restaurants & Cafes',
    guideType: 'restaurant',
    title: 'Dining Out with Your Service Dog',
    content: 'Under the ADA, service dogs are allowed in all food service establishments where the public is allowed. Dog Passport\'s Restaurant Mode prepares businesses for your arrival.',
    tips: [
      'Activate Restaurant Mode when arriving',
      'Your dog stays with you at the table - it\'s allowed',
      'Businesses can only ask two questions: "Is this a service dog?" and "What task does it perform?"',
      'Show your Dog Passport badge for instant credibility',
      'Your hypoallergenic rating is visible to chefs if relevant',
      'Leave feedback to help other handlers'
    ],
    documents: ['ADA Documentation', 'Hypoallergenic Rating'],
    icon: '🍽️',
    difficulty: 'easy',
  },
  {
    id: 'tg-4',
    destination: 'Hotels & Accommodations',
    guideType: 'hotel',
    title: 'Booking Hotels & Accommodations',
    content: 'The Fair Housing Act requires hotels to allow service dogs at no additional fee. Dog Passport integrates with major hotel chains for seamless booking.',
    tips: [
      'Mention service dog during booking - no "pet fees" allowed',
      'Request ground floor rooms away from high-traffic areas',
      'Bring Dog Passport verification documents to check-in',
      'Use the hotel Dog Passport concierge service for nearby parks',
      'Know your hypoallergenic rating - share if relevant',
      'Report any discrimination to disability rights organizations'
    ],
    documents: ['ADA Rights Documentation', 'Vaccination Records', 'Hypoallergenic Certification'],
    icon: '🏨',
    difficulty: 'easy',
  },
  {
    id: 'tg-5',
    destination: 'National Parks & Outdoor',
    guideType: 'national-park',
    title: 'Outdoor Adventures with Your Service Dog',
    content: 'Many national parks and outdoor venues have specific rules. Service dogs are almost always allowed, but preparation is key.',
    tips: [
      'Check NPS website for specific park dog policies',
      'Service dogs are exempt from general dog restrictions',
      'Bring extra water - dehydration is a major health risk',
      'Never leave your dog unattended, even briefly',
      'Watch for heat stress - carry cooling gear in summer',
      'Bring all vaccination and health records'
    ],
    documents: ['Vaccination Records', 'Health Clearance', 'Service Dog Certification'],
    icon: '🏞️',
    difficulty: 'moderate',
  },
  {
    id: 'tg-6',
    destination: 'Events & Public Spaces',
    guideType: 'event',
    title: 'Concerts, Festivals & Large Events',
    content: 'Public events are required to allow service dogs under the ADA. Dog Passport makes your credentials instantly verifiable.',
    tips: [
      'Notify event organizers in advance when possible',
      'Have your Dog Passport ready at entrance',
      'Your dog should remain under your control at all times',
      'Bring water and a portable bowl',
      'Find quiet areas if your dog gets stressed by crowds',
      'Report any denial or harassment to event organizers'
    ],
    documents: ['ADA Service Dog Verification', 'Vaccination Records'],
    icon: '🎉',
    difficulty: 'moderate',
  },
];

export const mockResourcePartners: ResourcePartner[] = [
  {
    id: 'rp-1',
    name: 'American Airlines',
    category: 'airline',
    description: 'Fully integrated with Dog Passport for instant service dog verification at check-in.',
    logo: '✈️',
    link: '#',
    badge: 'Verified Partner',
  },
  {
    id: 'rp-2',
    name: 'Uber',
    category: 'rideshare',
    description: 'Dog Passport Rideshare Mode reduces acceptance issues by 90%.',
    logo: '🚗',
    link: '#',
    badge: 'Verified Partner',
  },
  {
    id: 'rp-3',
    name: 'Lyft',
    category: 'rideshare',
    description: 'Dog Passport certified rideshare partner with dedicated support line.',
    logo: '🚗',
    link: '#',
    badge: 'Verified Partner',
  },
  {
    id: 'rp-4',
    name: 'The Ritz-Carlton',
    category: 'hotel',
    description: 'Premium hotel chain with Dog Passport integration for seamless bookings.',
    logo: '🏨',
    link: '#',
    badge: 'Verified Partner',
  },
  {
    id: 'rp-5',
    name: 'Hyatt Hotels',
    category: 'hotel',
    description: 'Dog Passport verified accommodations across 1000+ locations.',
    logo: '🏨',
    link: '#',
    badge: 'Verified Partner',
  },
  {
    id: 'rp-6',
    name: 'Wagz Grooming',
    category: 'grooming',
    description: 'Professional grooming for service dogs with health tracking integration.',
    logo: '🧴',
    link: '#',
    badge: 'Partner',
  },
  {
    id: 'rp-7',
    name: 'Healthy Paws Insurance',
    category: 'insurance',
    description: 'Pet insurance with special rates for verified service dogs.',
    logo: '🛡️',
    link: '#',
    badge: 'Partner',
  },
  {
    id: 'rp-8',
    name: 'Chewy',
    category: 'retail',
    description: 'Premium pet supplies and prescriptions with Dog Passport integration.',
    logo: '📦',
    link: '#',
    badge: 'Partner',
  },
  {
    id: 'rp-9',
    name: 'International Service Dog Alliance',
    category: 'training',
    description: 'Professional training resources and certification programs.',
    logo: '🎓',
    link: '#',
    badge: 'Official Partner',
  },
];

export const mockSupportTopics: SupportTopic[] = [
  {
    id: 'sp-1',
    category: 'verification',
    question: 'How do I get my service dog verified with a blue checkmark?',
    answer: 'Subscribe to Dog Passport Premium ($99/year or $10/month). Submit your service dog documentation, and our verification team will review within 5 business days. Blue checkmark verification includes: (1) Veterinary review of health records, (2) Validation of service dog training, (3) ADA compliance certification.',
    relatedTopics: ['sp-2', 'sp-3'],
  },
  {
    id: 'sp-2',
    category: 'verification',
    question: 'What documents do I need for blue checkmark verification?',
    answer: 'Required: (1) Service Dog Task Attestation from trainer, (2) Current vaccinations (rabies, DHPP), (3) Photo ID matching Dog Passport account. Optional but helpful: (1) Training certificates, (2) Vet letter, (3) ADA rights documentation.',
    relatedTopics: ['sp-1', 'sp-4'],
  },
  {
    id: 'sp-3',
    category: 'legal',
    question: 'What are my ADA rights as a service dog handler?',
    answer: 'Under the ADA, service dogs are allowed in: (1) All public accommodations (restaurants, hotels, stores), (2) Airplanes in cabin (no fees), (3) Rideshare vehicles, (4) Schools and workplaces. Businesses can only ask two questions. They cannot ask for documentation. However, having Dog Passport verification makes access smoother and reduces discrimination.',
    relatedTopics: ['sp-5', 'sp-6'],
  },
  {
    id: 'sp-4',
    category: 'technical',
    question: 'How do I upload documents to my dog\'s vault?',
    answer: 'In the Records section: (1) Tap "Add Record", (2) Choose the document category, (3) Upload the PDF/image, (4) Name the document, (5) Add expiration date if applicable. Your vet can also upload directly if we have a verified partnership.',
    relatedTopics: ['sp-5'],
  },
  {
    id: 'sp-5',
    category: 'account',
    question: 'Can I have multiple dogs on one account?',
    answer: 'Yes! You can add multiple dogs to your account. Each dog gets their own profile, badge, and document vault. Premium verification applies per dog.',
    relatedTopics: ['sp-1', 'sp-4'],
  },
  {
    id: 'sp-6',
    category: 'health',
    question: 'How do I track my dog\'s health records and expirations?',
    answer: 'Dog Passport automatically tracks all vaccination expirations and sends you reminders 30 days before expiration. You can also set custom reminders for grooming, medications, and vet visits. All records are organized by category and status.',
    relatedTopics: ['sp-4', 'sp-2'],
  },
];

export const mockEducationCards: EducationCard[] = [
  // P0 Staff Education Cards (Core 3-5 cards)
  {
    id: 'ed-staff-1',
    title: 'What is a Service Dog?',
    description: 'Understanding service dogs and their legal rights under the ADA.',
    content: `A service dog is a dog that has been individually trained to do work or perform tasks for a person with a disability. The work or task must be directly related to the person's disability.

Key Facts:
• Service dogs are NOT pets - they are working medical equipment
• They are protected under the Americans with Disabilities Act (ADA)
• They are allowed in ALL public places where the public is allowed
• They do NOT require special vests, ID cards, or documentation
• They can be any breed or size

Common Tasks Service Dogs Perform:
• Alerting to seizures, low blood sugar, or other medical emergencies
• Guiding people who are blind or have low vision
• Pulling wheelchairs or providing balance support
• Alerting to sounds for people who are deaf or hard of hearing
• Interrupting anxiety attacks or providing grounding for PTSD
• Retrieving items, opening doors, or other physical tasks

Remember: Service dogs are working. Do not pet, talk to, or distract them.`,
    audience: 'staff',
    readTime: 3,
    icon: '🐕',
  },
  {
    id: 'ed-staff-2',
    title: 'What Can I Ask? (The 2-Question Rule)',
    description: 'The ONLY two questions you can legally ask about a service dog.',
    content: `Under the ADA, staff members can ONLY ask TWO questions when it's not obvious that the dog is a service dog:

1. "Is this a service dog required because of a disability?"
2. "What work or task has the dog been trained to perform?"

YOU CANNOT ASK:
❌ "What is your disability?" or "What's wrong with you?"
❌ "Can I see your papers/certification/ID card?"
❌ "Can the dog perform the task for me right now?"
❌ "Do you have a doctor's note?"
❌ "What breed is that?" (as a way to determine legitimacy)

YOU CAN:
✅ Ask the two questions above if it's not obvious
✅ Ask the handler to remove the dog if it's out of control or not housebroken
✅ Charge for any damage the dog causes (same as any customer)

If the handler answers the two questions appropriately, you MUST allow access. Having a Dog Passport verification badge provides additional credibility but is not legally required.`,
    audience: 'staff',
    readTime: 2,
    icon: '❓',
  },
  {
    id: 'ed-staff-3',
    title: 'Allergy Concerns & Service Dogs',
    description: 'How to handle allergy concerns while respecting ADA rights.',
    content: `IMPORTANT: Allergies do NOT override ADA rights. Service dogs must be allowed even if staff or other customers have allergies.

However, there are ways to accommodate everyone:

For Staff with Allergies:
• Service dogs must still be allowed access
• You can ask the handler if the dog is hypoallergenic (they may volunteer this)
• Consider assigning a different staff member to serve that customer
• Use Dog Passport's Allergy Mode to see hypoallergenic ratings if shared

For Other Customers with Allergies:
• Service dogs must still be allowed access
• You can offer to seat the allergic customer away from the service dog
• You can offer takeout or delivery options
• You cannot ask the service dog handler to leave

Best Practices:
• Most service dogs are well-groomed and clean
• Hypoallergenic breeds (Poodles, Labradoodles) produce fewer allergens
• Regular grooming reduces dander by 30-50%
• Dog Passport shows grooming history and hypoallergenic ratings when shared

Remember: The ADA protects service dog access. Work with both parties to find a solution that accommodates everyone.`,
    audience: 'staff',
    readTime: 4,
    icon: '🤧',
  },
  {
    id: 'ed-staff-4',
    title: 'Breed Myths Debunked',
    description: 'Common misconceptions about service dog breeds.',
    content: `MYTH: "Service dogs must be Labs or Golden Retrievers"
FACT: Service dogs can be ANY breed or size. Small dogs can be service dogs. Mixed breeds can be service dogs. Even "aggressive" breeds can be service dogs if individually trained.

MYTH: "Service dogs must wear vests or have ID cards"
FACT: The ADA does NOT require vests, ID cards, patches, or special harnesses. Many handlers use them for visibility, but they're not legally required.

MYTH: "I can tell if it's a real service dog by how it behaves"
FACT: Service dogs are trained to be calm and unobtrusive, but even legitimate service dogs can have bad days. You can only ask a handler to remove a dog if it's out of control or not housebroken.

MYTH: "Service dogs are only for blind people"
FACT: Service dogs assist with many disabilities: PTSD, seizures, diabetes, mobility issues, autism, hearing loss, and more.

MYTH: "I need to see certification papers"
FACT: There is NO official certification or registration required. The ADA does not require documentation. If someone shows you a Dog Passport verification, that's helpful but not legally required.

Remember: Focus on the dog's behavior and the handler's answers to the two questions, not the breed or appearance.`,
    audience: 'staff',
    readTime: 3,
    icon: '💭',
  },
  {
    id: 'ed-staff-5',
    title: '10-Second Staff Training: Quick Reference',
    description: 'Ultra-quick reference card for staff members.',
    content: `QUICK REFERENCE - Print and Keep:

✅ DO:
• Welcome service dog handlers like any customer
• Ask ONLY these 2 questions if needed:
  1. "Is this a service dog?"
  2. "What task does it perform?"
• Allow access to all public areas
• Treat the dog as working medical equipment

❌ DON'T:
• Ask about the person's disability
• Ask for papers, certification, or ID
• Pet, talk to, or distract the dog
• Charge extra fees or deposits
• Deny access based on breed or size

🚨 REMOVE DOG ONLY IF:
• Dog is out of control (barking, growling, jumping)
• Dog is not housebroken (accidents)

📱 Dog Passport Badge:
If shown, this provides verification but is not legally required. It helps build trust and reduces conflict.

Remember: Service dogs are protected by federal law. When in doubt, allow access.`,
    audience: 'staff',
    readTime: 1,
    icon: '⚡',
  },
  // Handler Education Cards
  {
    id: 'ed-1',
    title: 'ADA Compliance Guide',
    description: 'Understanding your rights under the ADA and what questions can legally be asked.',
    content: 'Under the Americans with Disabilities Act (ADA), service dogs are allowed in all public spaces where pets are normally prohibited. Businesses can only ask two questions: (1) Is this a service dog? (2) What task does it perform? They cannot ask for documentation or payment.',
    audience: 'handler',
    readTime: 5,
    icon: '⚖️',
  },
  {
    id: 'ed-2',
    title: 'Service Dog vs. Emotional Support Animal',
    description: 'Learn the key differences and what coverage applies to each.',
    content: 'Service dogs are individually trained to perform specific tasks for people with disabilities. They are covered under the ADA and allowed in public spaces. Emotional Support Animals (ESAs) provide comfort through companionship but are not task-trained and are not covered under the ADA for public access.',
    audience: 'both',
    readTime: 4,
    icon: '🐕',
  },
  {
    id: 'ed-3',
    title: 'Staff Training: Service Dogs in Your Business',
    description: 'How to properly welcome and handle service dog situations.',
    content: 'When a service dog handler enters your establishment: 1) Welcome them as you would any customer. 2) Do not pet or distract the dog. 3) If needed, ask only the two legal questions. 4) Treat the dog as a working professional, not a pet.',
    audience: 'staff',
    readTime: 3,
    icon: '👨‍💼',
  },
  {
    id: 'ed-4',
    title: 'Hypoallergenic Dog Breeds',
    description: 'Understanding dander, grooming, and allergy management.',
    content: 'Hypoallergenic dogs produce fewer allergens due to their coat type. Common hypoallergenic service dog breeds include Poodles, Labradoodles, and Goldendoodles. Regular grooming reduces dander by 30-50%.',
    audience: 'both',
    readTime: 4,
    icon: '🚫',
  },
  {
    id: 'ed-5',
    title: 'What to Do If Denied Access',
    description: 'Your rights and steps to take if a business denies your service dog.',
    content: 'If a business denies you access: 1) Stay calm and polite. 2) Ask to speak with management. 3) Explain the ADA requirements clearly. 4) Offer your verification badge. 5) Document the interaction. 6) Report to disability rights organizations if discrimination occurs.',
    audience: 'handler',
    readTime: 5,
    icon: '📋',
  },
  {
    id: 'ed-6',
    title: 'Allergy Management Protocol',
    description: 'How to share hypoallergenic information without revealing medical conditions.',
    content: 'Dog Passport Allergy Mode lets you share your dog\'s hypoallergenic rating and grooming history with family or events without revealing the handler\'s medical condition. This protects privacy while enabling transparency.',
    audience: 'handler',
    readTime: 3,
    icon: '🛡️',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    dogId: 'dog-1',
    title: 'Annual Wellness Check',
    type: 'vet',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    vetName: 'Dr. Emily Chen, DVM',
    notes: 'Annual physical, blood work, and vaccination review',
    status: 'scheduled',
  },
  {
    id: 'apt-2',
    dogId: 'dog-1',
    title: 'Grooming Session - Full Bath & Trim',
    type: 'grooming',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    notes: 'Full bath, nail trim, ear cleaning at Wagz Grooming',
    status: 'scheduled',
  },
  {
    id: 'apt-3',
    dogId: 'dog-1',
    title: 'Advanced Training - Task Refinement',
    type: 'training',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    notes: 'PTSD alert training refresh with certified trainer',
    status: 'scheduled',
  },
  {
    id: 'apt-4',
    dogId: 'dog-1',
    title: 'Quarterly Behavior Check-in',
    type: 'check-up',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    vetName: 'Dr. Emily Chen, DVM',
    notes: 'Handler and dog behavior assessment for service dog maintenance',
    status: 'scheduled',
  },
  {
    id: 'apt-5',
    dogId: 'dog-1',
    title: 'Annual Wellness Check',
    type: 'vet',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    vetName: 'Dr. Emily Chen, DVM',
    notes: 'Annual physical - all tests normal, weight stable',
    status: 'completed',
  },
  {
    id: 'apt-6',
    dogId: 'dog-1',
    title: 'Grooming Session',
    type: 'grooming',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    notes: 'Full bath and nail trim',
    status: 'completed',
  },
  {
    id: 'apt-7',
    dogId: 'dog-1',
    title: 'Advanced Training Session',
    type: 'training',
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    notes: 'Task refresher - grounding techniques practiced',
    status: 'completed',
  },
];

export const mockMeals: Meal[] = [
  // Today's meals
  {
    id: 'meal-1',
    dogId: 'dog-1',
    date: new Date(),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (morning)',
    notes: 'Fed at 7:00 AM, dog ate eagerly',
  },
  {
    id: 'meal-2',
    dogId: 'dog-1',
    date: new Date(),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (evening)',
    notes: 'Fed at 6:00 PM, added chicken broth',
  },
  // Yesterday's meals
  {
    id: 'meal-3',
    dogId: 'dog-1',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (morning)',
    notes: 'Normal appetite',
  },
  {
    id: 'meal-4',
    dogId: 'dog-1',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (evening)',
    notes: 'Mixed with sweet potato',
  },
  // 3 days ago
  {
    id: 'meal-5',
    dogId: 'dog-1',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (morning)',
  },
  {
    id: 'meal-6',
    dogId: 'dog-1',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (evening)',
  },
  // 5 days ago
  {
    id: 'meal-7',
    dogId: 'dog-1',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (morning)',
  },
  {
    id: 'meal-8',
    dogId: 'dog-1',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    foodType: 'Royal Canin Service Dog',
    amount: '2 cups (evening)',
  },
];

export const mockBreedCommunity: BreedCommunity = {
  id: 'bc-1',
  breed: 'Labrador Retriever',
  memberCount: 1247,
  totalDogs: 2891,
  avgWeight: 65,
  commonHealthConcerns: ['Hip dysplasia', 'Elbow dysplasia', 'Bloat', 'Eye issues'],
  topTips: [
    'Monitor weight - Labs are prone to obesity',
    'Regular joint checks recommended',
    'Feed high-quality protein (25-30%)',
    'Daily exercise is critical',
    'Watch for signs of hip dysplasia in first 2 years',
  ],
};

export const mockCommunityMembers: CommunityMember[] = [
  {
    id: 'cm-1',
    dogName: 'Max',
    breed: 'Labrador Retriever',
    photo: '/service-dog-labrador.jpg',
    location: 'Portland, OR',
    taskType: 'ptsd',
  },
  {
    id: 'cm-2',
    dogName: 'Luna',
    breed: 'Labrador Retriever',
    photo: '/service-dog-portrait.jpg',
    location: 'Seattle, WA',
    taskType: 'mobility',
  },
  {
    id: 'cm-3',
    dogName: 'Charlie',
    breed: 'Labrador Retriever',
    photo: '/service-dog-face.jpg',
    location: 'San Francisco, CA',
    taskType: 'medical-alert',
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-1',
    category: 'health',
    title: 'Vaccination Due Soon',
    message: 'Buddy\'s DHPP vaccination expires in 45 days. Schedule an appointment with Dr. Chen to renew before travel.',
    actionItems: ['Schedule vet appointment', 'Update health records', 'Set reminder for next year'],
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: 'ai-2',
    category: 'nutrition',
    title: 'Weight Trending Up',
    message: 'Buddy\'s weight has increased 2 lbs over the past month. Consider adjusting portion sizes or increasing exercise.',
    actionItems: ['Review feeding portions', 'Increase daily exercise by 10%', 'Schedule weight check'],
    priority: 'medium',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ai-3',
    category: 'wellness',
    title: 'Breed-Specific Alert: Hip Dysplasia Screening',
    message: 'Labradors commonly develop hip dysplasia. Early detection is key. Your last screening was 1.5 years ago - consider scheduling an updated orthopedic screening.',
    actionItems: ['Schedule orthopedic screening', 'Learn about dysplasia prevention', 'Join Labs health support group'],
    priority: 'medium',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ai-4',
    category: 'training',
    title: 'Task Refresher Due',
    message: 'It\'s been 3 months since Buddy\'s last advanced training. Regular refreshers keep skills sharp for your safety and his confidence.',
    actionItems: ['Schedule training session', 'Practice alert scenarios at home', 'Review handler technique'],
    priority: 'medium',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ai-5',
    category: 'health',
    title: 'Grooming Overdue',
    message: 'Buddy\'s last grooming was 2 months ago. Regular grooming reduces allergens and keeps his coat healthy. Schedule your next session.',
    actionItems: ['Book grooming appointment', 'Review grooming history', 'Check paw pads at home'],
    priority: 'low',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ai-6',
    category: 'behavior',
    title: 'Exercise Recommendation',
    message: 'Labs need 60+ minutes of daily exercise. Weather has been good lately - great time for outdoor activities and training practice.',
    actionItems: ['Plan longer walks or runs', 'Visit dog-friendly parks', 'Practice task work during exercise'],
    priority: 'low',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

export const mockHealthMetrics: HealthMetric[] = [
  ...mockMeals.map(m => ({
    date: m.date,
    type: 'meal' as const,
    title: `${m.foodType} - ${m.amount}`,
    status: 'completed' as const,
  })),
  ...mockAppointments.map(a => ({
    date: a.date,
    type: 'appointment' as const,
    title: a.title,
    details: a.vetName || a.notes,
    status: a.status as 'scheduled' | 'completed' | 'missed',
  })),
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Flying with Buddy: My First TSA Experience',
    author: 'Sarah Johnson',
    authorRole: 'handler',
    excerpt: 'How Dog Passport made our first flight together seamless and stress-free.',
    content: 'When we first boarded a plane with Buddy, I was nervous. TSA agents, other passengers, tight spaces - I didn\'t know how they\'d react. But with Dog Passport\'s blue checkmark visible on my phone, everything changed. The TSA agents immediately recognized his status, other passengers understood, and Buddy stayed calm the entire flight. The documentation we had organized in our vault made pre-flight check-in take just 5 minutes.',
    category: 'story',
    likes: 234,
    comments: 18,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tags: ['flying', 'travel', 'firsttime', 'verification'],
  },
  {
    id: 'blog-2',
    title: '5 Signs Your Service Dog Needs a Training Refresh',
    author: 'Dr. Marcus Chen',
    authorRole: 'trainer',
    excerpt: 'Keep your dog\'s skills sharp with these simple assessment techniques.',
    content: 'After 6 months of regular training, service dogs need quarterly refreshers to maintain peak performance. Look for: (1) Delayed task response, (2) Inconsistent positioning, (3) Reduced focus during distractions, (4) Handler uncertainty, (5) Dog showing stress signs. If you see any of these, it\'s time to schedule a refresher session. Your dog\'s consistency is what keeps you safe.',
    category: 'tips',
    likes: 456,
    comments: 34,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    tags: ['training', 'maintenance', 'safety', 'skills'],
  },
  {
    id: 'blog-3',
    title: 'New Research: Service Dogs and Handler Stress Reduction',
    author: 'Dr. Patricia Williams',
    authorRole: 'vet',
    excerpt: 'Latest studies show significant cortisol reduction in handlers with verified service dogs.',
    content: 'A 2024 study from UC Davis found that handlers with verified service dogs showed 35% lower cortisol levels during stressful situations compared to handlers without dogs. The research suggests that verification - and the reduced discrimination handlers experience - is a key factor in stress reduction. Dog Passport\'s verification system not only protects access but actively improves handler health outcomes.',
    category: 'research',
    likes: 678,
    comments: 52,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    tags: ['research', 'health', 'stress', 'verification', 'wellness'],
  },
  {
    id: 'blog-4',
    title: 'Lab Owners: Hip Dysplasia Screening Timeline',
    author: 'James Patterson',
    authorRole: 'handler',
    excerpt: 'When to screen and what to watch for - advice from a 20-year Lab owner.',
    content: 'I\'ve owned Labs for 20 years, and hip dysplasia screening saved two of my dogs from serious complications. Here\'s my timeline: (1) Initial screening at 2 years, (2) Follow-up at 4 years if first is clear, (3) Annual checks after age 6. Early detection means preventative care, better quality of life, and often avoided surgery. Don\'t skip these screenings.',
    category: 'tips',
    likes: 345,
    comments: 28,
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    tags: ['breed-specific', 'health', 'screening', 'labradors'],
  },
  {
    id: 'blog-5',
    title: 'Q&A: Restaurants Keep Asking for Papers - What Do I Do?',
    author: 'Community Moderator',
    authorRole: 'moderator',
    excerpt: 'Common legal questions from our community answered by disability rights advocates.',
    content: 'Under ADA law, businesses cannot require documentation. However, many handlers report being asked anyway. Your options: (1) Politely explain the ADA allows two questions only, (2) Show your Dog Passport badge for credibility, (3) Leave feedback about the interaction, (4) Contact disability rights organizations if behavior escalates. You have rights, and we\'re here to support you using them.',
    category: 'question',
    likes: 512,
    comments: 67,
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    tags: ['legal', 'rights', 'restaurants', 'ada'],
  },
  {
    id: 'blog-6',
    title: 'Calling All Lab Owners: Weekend Hiking Meetup in Portland',
    author: 'Portland Labs Community',
    authorRole: 'moderator',
    excerpt: 'Join 20+ Labrador owners for a dog-friendly hike this Sunday at Forest Park.',
    content: 'The Portland Labrador community is organizing a hiking meetup this Sunday, Sept 15th at 10 AM at Forest Park. Bring your pup, bring water, and bring your enthusiasm! This is a great way to connect with other Lab owners, share training tips, and get your pups some quality time together. RSVP in the comments below.',
    category: 'event',
    likes: 198,
    comments: 24,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['community', 'event', 'portland', 'hiking', 'labradors'],
  },
];

export const mockBlogComments: BlogComment[] = [
  {
    id: 'comment-1',
    postId: 'blog-1',
    author: 'Maria Garcia',
    content: 'This gives me so much hope for our first flight! Did TSA ask for any documentation?',
    likes: 12,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'comment-2',
    postId: 'blog-1',
    author: 'Sarah Johnson',
    content: 'They didn\'t ask for a thing! The blue checkmark from Dog Passport was all they needed. They even complimented Buddy!',
    likes: 28,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'comment-3',
    postId: 'blog-2',
    author: 'David Lee',
    content: 'The delayed response thing is so real. We just scheduled a refresher last week.',
    likes: 15,
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
  },
];
