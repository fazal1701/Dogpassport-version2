// Dog Passport: Mock Data Index
// Centralized exports for all mock data modules

export * from './users';
export * from './dogs';

// Re-export types for convenience
export type {
  User,
  Dog,
  VetRecord,
  Appointment,
  MealLog,
  AIInsight,
  TravelGuide,
  ResourcePartner,
  Notification,
  EducationCard,
  SupportTopic,
  HealthMetric,
  BreedCommunity,
  CommunityMember,
  BlogPost,
  BlogComment,
} from '../types';

// For backward compatibility, export a default mock user and dog
import { getCurrentUser } from './users';
import { getDogById } from './dogs';

export const mockUser = getCurrentUser();
export const mockDog = getDogById('dog-001')!;

// Export mock badges for backward compatibility
export const mockDogBadges = mockDog.badges;

