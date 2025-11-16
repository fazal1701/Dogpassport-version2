export type ServiceDogTaskType = 'ptsd' | 'mobility' | 'medical-alert' | 'psychiatric' | 'autism' | 'other';
export type HypoallergenicRating = 'high' | 'moderate' | 'standard' | 'unknown';
export type DocumentCategory = 'vaccination' | 'training-cert' | 'vet-visit' | 'prescription' | 'grooming' | 'health' | 'other';
export type PassportMode = 'default' | 'flight' | 'rideshare' | 'restaurant' | 'allergy';

export type SubscriptionTier = 'free' | 'premium';
export type CheckmarkStatus = 'none' | 'yellow' | 'green' | 'blue';

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt?: Date;
  createdAt: Date;
}

export interface DogProfile {
  id: string;
  userId: string;
  name: string;
  breed: string;
  weight: number;
  photo: string;
  microchip?: string;
  taskType: ServiceDogTaskType;
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  checkmarkStatus: CheckmarkStatus; // Yellow (temp), Green (complete), Blue (verified)
  hypoallergenicRating: HypoallergenicRating;
  createdAt: Date;
  serviceDogInfoSubmitted?: boolean;
  vetInfoUploaded?: boolean;
  vetVerificationRequested?: boolean;
  vetVerificationStatus?: 'pending' | 'approved' | 'rejected';
  vetVerificationDate?: Date;
}

export interface VetRecord {
  id: string;
  dogId: string;
  fileName: string;
  fileUrl: string;
  category: DocumentCategory;
  status: 'active' | 'expiring-soon' | 'expired';
  expirationDate?: Date;
  uploadedAt: Date;
  verifiedByVet: boolean;
  vetName?: string;
}

export interface EducationCard {
  id: string;
  title: string;
  description: string;
  content: string;
  audience: 'handler' | 'staff' | 'both';
  readTime: number;
  icon: string;
}

export interface DogBadges {
  adaCompliant: boolean;
  tsaApproved: boolean;
  vetVerified: boolean;
  hypoallergenic: boolean;
  publicAccessCleared: boolean;
}

export interface ResourcePartner {
  id: string;
  name: string;
  category: 'airline' | 'rideshare' | 'restaurant' | 'hotel' | 'grooming' | 'insurance' | 'veterinary' | 'training' | 'retail';
  description: string;
  logo: string;
  link: string;
  badge: string;
}

export interface TravelGuide {
  id: string;
  destination: string;
  guideType: 'airline' | 'rideshare' | 'restaurant' | 'hotel' | 'national-park' | 'event';
  title: string;
  content: string;
  tips: string[];
  documents: string[];
  icon: string;
  difficulty: 'easy' | 'moderate' | 'complex';
}

export interface SupportTopic {
  id: string;
  category: 'account' | 'verification' | 'technical' | 'legal' | 'health';
  question: string;
  answer: string;
  relatedTopics: string[];
}

export interface HealthMetric {
  date: Date;
  type: 'meal' | 'appointment' | 'medication' | 'exercise' | 'weight';
  title: string;
  details?: string;
  status: 'completed' | 'scheduled' | 'missed';
}

export interface Appointment {
  id: string;
  dogId: string;
  title: string;
  type: 'vet' | 'grooming' | 'training' | 'check-up';
  date: Date;
  vetName?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Meal {
  id: string;
  dogId: string;
  date: Date;
  foodType: string;
  amount: string;
  notes?: string;
}

export interface BreedCommunity {
  id: string;
  breed: string;
  memberCount: number;
  totalDogs: number;
  avgWeight: number;
  commonHealthConcerns: string[];
  topTips: string[];
}

export interface CommunityMember {
  id: string;
  dogName: string;
  breed: string;
  photo: string;
  location?: string;
  taskType?: ServiceDogTaskType;
}

export interface AIInsight {
  id: string;
  category: 'health' | 'nutrition' | 'behavior' | 'training' | 'wellness';
  title: string;
  message: string;
  actionItems?: string[];
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

// Adding blog post and comment types for community section
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorRole: 'handler' | 'vet' | 'trainer' | 'moderator';
  content: string;
  excerpt: string;
  category: 'tips' | 'story' | 'research' | 'event' | 'question';
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface VetVerificationRequest {
  id: string;
  dogId: string;
  userId: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string; // Vet name or admin
  rejectionReason?: string;
  documents: {
    id: string;
    fileName: string;
    fileUrl: string;
    category: string;
  }[];
  handlerSignature?: string; // E-signature data
  vetSignature?: string; // E-signature data
  notes?: string;
}
