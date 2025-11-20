// Dog Passport: Mock Data Index
// Centralized exports for all mock data modules

export * from './users';
export * from './dogs';

// Re-export helper functions explicitly to ensure proper module resolution
export { 
  getDogsByUserId, 
  getDogById, 
  getServiceDogs, 
  getDogsByVerificationStatus 
} from './dogs';
export { getUserById, getCurrentUser } from './users';

// Re-export all mock data from the main mock-data file
export {
  mockRecords,
  mockAppointments,
  mockMeals,
  mockAIInsights,
  mockTravelGuides,
  mockResourcePartners,
  mockSupportTopics,
  mockEducationCards,
  mockBreedCommunity,
  mockCommunityMembers,
  mockHealthMetrics,
  mockBlogPosts,
  mockBlogComments,
} from '../mock-data';

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
import { getDogById, getDogsByUserId } from './dogs';
import { mockDogs } from './dogs';

export const mockUser = getCurrentUser();
// Get the first dog for the current user, or fallback to dog-001
const userDogs = getDogsByUserId(mockUser.id);
export const mockDog = userDogs[0] || getDogById('dog-001') || mockDogs[0];

// Helper function to get primary dog for a user
export function getPrimaryDogForUser(userId: string) {
  const dogs = getDogsByUserId(userId);
  return dogs[0] || null;
}

// Export mock badges for backward compatibility
export const mockDogBadges = mockDog?.badges || {
  adaCompliant: false,
  tsaApproved: false,
  vetVerified: false,
  hypoallergenic: false,
  publicAccessCleared: false,
};

