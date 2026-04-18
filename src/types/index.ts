export type Sex = "male" | "female" | "prefer_not_to_say";

export type RunningBackground = "none" | "casual" | "club" | "competitive";

export type PrimaryGoal =
  | "general_fitness"
  | "speed_power"
  | "fat_loss"
  | "injury_resilience"
  | "sport_performance";

export type Equipment =
  | "bodyweight"
  | "resistance_bands"
  | "dumbbells"
  | "barbell"
  | "full_gym";

export type TrackAccess = "none" | "outdoor" | "treadmill" | "both";

export type SessionType = "strength" | "sprint" | "mobility" | "skills";

// The shape of data collected during onboarding
export interface OnboardingData {
  firstName: string;
  ageYears: number;
  sex: Sex;
  bodyWeightKg: number | null;
  trainingYears: number;
  runningBackground: RunningBackground;
  sport: string;
  primaryGoal: PrimaryGoal;
  availableDaysPerWeek: number;
  sessionDurationMinutes: number;
  equipment: Equipment[];
  trackAccess: TrackAccess;
  injuries: string;
}
