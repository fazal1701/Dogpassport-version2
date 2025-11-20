// Dog Passport: Comprehensive TypeScript Types
// Extracted from final-mock-data.md specification

export type SubscriptionTier = 'free' | 'premium' | 'blue' | 'family';
export type CheckmarkStatus = 'none' | 'yellow' | 'green' | 'blue';
export type VerificationStatus = 'pending' | 'yellow' | 'green' | 'blue';
export type ServiceDogTaskType = 'ptsd' | 'mobility' | 'medical-alert' | 'hearing' | 'vision' | 'psychiatric' | 'autism' | 'other';
export type HypoallergenicRating = 'high' | 'moderate' | 'low' | 'unknown';
export type DocumentCategory = 'vaccination' | 'training-cert' | 'vet-visit' | 'prescription' | 'grooming' | 'health' | 'other';
export type DocumentType = 'rabies' | 'dhpp' | 'bordetella' | 'health-cert' | 'training' | 'exam' | 'prescription' | 'other';
export type RecordStatus = 'active' | 'expiring-soon' | 'expired';
export type PassportMode = 'default' | 'flight' | 'rideshare' | 'restaurant' | 'allergy';
export type NotificationType = 'health-alert' | 'appointment-reminder' | 'verification-update' | 'community' | 'travel' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high';
export type AppointmentType = 'vet' | 'grooming' | 'training' | 'check-up';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';
export type AIInsightCategory = 'health' | 'nutrition' | 'behavior' | 'training' | 'wellness';
export type AIInsightPriority = 'low' | 'medium' | 'high';
export type TravelGuideType = 'airline' | 'rideshare' | 'restaurant' | 'hotel' | 'national-park' | 'event';
export type TravelDifficulty = 'easy' | 'moderate' | 'complex';
export type PartnerCategory = 'airline' | 'rideshare' | 'restaurant' | 'hotel' | 'grooming' | 'insurance' | 'veterinary' | 'training' | 'retail';
export type BlogPostCategory = 'tips' | 'story' | 'research' | 'event' | 'question';
export type AuthorRole = 'handler' | 'vet' | 'trainer' | 'moderator';
export type Theme = 'light' | 'dark' | 'auto';
export type Units = 'imperial' | 'metric';

// User Preferences
export interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  theme: Theme;
  language: string;
  units: Units;
}

// User Stats
export interface UserStats {
  dogsManaged: number;
  recordsUploaded: number;
  communityPosts: number;
  travelBookings: number;
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt: Date | null;
  createdAt: Date;
  location?: string;
  timezone?: string;
  preferences: UserPreferences;
  stats: UserStats;
}

// Emergency Contact
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// Dog Badges
export interface DogBadges {
  adaCompliant: boolean;
  tsaApproved: boolean;
  vetVerified: boolean;
  hypoallergenic: boolean;
  publicAccessCleared: boolean;
}

// Dog Profile
export interface Dog {
  id: string;
  userId: string;
  name: string;
  breed: string;
  dateOfBirth: Date;
  age: number;
  weight: number;
  weightUnit: 'lbs' | 'kg';
  sex: 'Male' | 'Female' | 'Neutered' | 'Spayed';
  color: string;
  photo: string;
  microchip?: string;
  isServiceDog: boolean;
  taskType: ServiceDogTaskType | null;
  taskDescription: string | null;
  trainingCertification: string | null;
  handlerAttestation: boolean;
  handlerSignature: string | null;
  verificationStatus: VerificationStatus;
  checkmarkStatus: CheckmarkStatus;
  verificationDate: Date | null;
  verifiedBy: string | null;
  badges: DogBadges;
  personality: string;
  specialNotes: string;
  hypoallergenicRating: HypoallergenicRating;
  serviceDogId: string | null;
  favoriteActivities: string[];
  dietaryRestrictions: string[];
  knownAllergies: string[];
  emergencyContact: EmergencyContact;
  createdAt: Date;
  updatedAt: Date;
}

// Vet Record
export interface VetRecord {
  id: string;
  dogId: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: 'pdf' | 'jpg' | 'png';
  category: DocumentCategory;
  documentType: DocumentType;
  status: RecordStatus;
  expirationDate?: Date;
  daysUntilExpiration?: number;
  uploadedAt: Date;
  verifiedByVet: boolean;
  vetName?: string;
  vetClinic?: string;
  notes?: string;
}

// Appointment
export interface Appointment {
  id: string;
  dogId: string;
  title: string;
  type: AppointmentType;
  date: Date;
  vetName?: string;
  notes?: string;
  status: AppointmentStatus;
}

// Meal Log
export interface MealLog {
  id: string;
  dogId: string;
  date: Date;
  foodType: string;
  amount: string;
  notes?: string;
}

// AI Insight
export interface AIInsight {
  id: string;
  dogId?: string;
  category: AIInsightCategory;
  title: string;
  message: string;
  actionItems?: string[];
  priority: AIInsightPriority;
  createdAt: Date;
}

// Travel Guide
export interface TravelGuide {
  id: string;
  destination: string;
  guideType: TravelGuideType;
  title: string;
  content: string;
  tips: string[];
  documents: string[];
  icon: string;
  difficulty: TravelDifficulty;
}

// Resource Partner
export interface ResourcePartner {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  logo: string;
  link: string;
  badge: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  dogId?: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  icon?: string;
  iconColor?: 'amber' | 'blue' | 'green' | 'red' | 'navy' | 'forest';
}

// Education Card
export interface EducationCard {
  id: string;
  title: string;
  description: string;
  content: string;
  audience: 'handler' | 'staff' | 'both';
  readTime: number;
  icon: string;
}

// Support Topic
export interface SupportTopic {
  id: string;
  category: 'account' | 'verification' | 'technical' | 'legal' | 'health';
  question: string;
  answer: string;
  relatedTopics: string[];
}

// Health Metric
export interface HealthMetric {
  date: Date;
  type: 'meal' | 'appointment' | 'medication' | 'exercise' | 'weight';
  title: string;
  details?: string;
  status: 'completed' | 'scheduled' | 'missed';
}

// Breed Community
export interface BreedCommunity {
  id: string;
  breed: string;
  memberCount: number;
  totalDogs: number;
  avgWeight: number;
  commonHealthConcerns: string[];
  topTips: string[];
}

// Community Member
export interface CommunityMember {
  id: string;
  dogName: string;
  breed: string;
  photo: string;
  location?: string;
  taskType?: ServiceDogTaskType;
}

// Blog Post
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorRole: AuthorRole;
  content: string;
  excerpt: string;
  category: BlogPostCategory;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

// Blog Comment
export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  likes: number;
  createdAt: Date;
}

// Mobile Navigation
export interface MobileNavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge: number | null;
}

export interface MobileNavigation {
  items: MobileNavigationItem[];
}

// Swipe Action
export interface SwipeAction {
  action: string;
  icon: string;
  color: 'blue' | 'green' | 'red' | 'amber';
  label: string;
}

export interface MobileInteractions {
  swipeActions: {
    vetRecords: SwipeAction[];
    appointments: SwipeAction[];
  };
  pullToRefresh: {
    threshold: number;
    loadingText: string;
    successText: string;
    animationDuration: number;
  };
}

// Haptic Feedback
export interface HapticFeedbackEvent {
  trigger: string;
  type: 'success' | 'error' | 'warning' | 'impact' | 'selection';
  intensity: 'light' | 'medium' | 'strong';
}

export interface HapticFeedback {
  events: HapticFeedbackEvent[];
}

// Empty State
export interface EmptyState {
  illustration: string;
  title: string;
  description: string;
  cta: {
    label: string;
    action: string;
  };
}

export interface EmptyStates {
  noRecords: EmptyState;
  noAppointments: EmptyState;
  noCommunityPosts: EmptyState;
  noTravelHistory: EmptyState;
}

// Skeleton State
export interface SkeletonLine {
  width: string;
  height: string;
  marginBottom?: string;
}

export interface SkeletonState {
  recordCard: {
    lines: SkeletonLine[];
    animation: string;
    duration: number;
  };
  dogProfile: {
    avatar: { width: string; height: string; borderRadius: string };
    name: { width: string; height: string; marginBottom: string };
    breed: { width: string; height: string; marginBottom: string };
    badges: {
      count: number;
      width: string;
      height: string;
      gap: string;
    };
  };
}

// Error State
export interface ErrorState {
  icon: string;
  title: string;
  description: string;
  cta: {
    label: string;
    action: string;
  };
}

export interface ErrorStates {
  networkError: ErrorState;
  uploadFailed: ErrorState;
  verificationRejected: ErrorState;
}
