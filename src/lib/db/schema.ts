import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Every athlete who completes onboarding gets a row here.
// clerk_id links this to the Clerk auth user.
export const athleteProfiles = sqliteTable("athlete_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerkId: text("clerk_id").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),

  // Personal
  firstName: text("first_name").notNull(),
  ageYears: integer("age_years").notNull(),
  sex: text("sex").notNull(), // 'male' | 'female' | 'prefer_not_to_say'
  bodyWeightKg: real("body_weight_kg"),

  // Training background
  trainingYears: integer("training_years").notNull().default(0),
  runningBackground: text("running_background").notNull().default("none"), // 'none' | 'casual' | 'club' | 'competitive'
  sport: text("sport"), // optional

  // Goals
  primaryGoal: text("primary_goal").notNull(), // 'general_fitness' | 'speed_power' | 'fat_loss' | 'injury_resilience' | 'sport_performance'

  // Schedule
  availableDaysPerWeek: integer("available_days_per_week").notNull(),
  sessionDurationMinutes: integer("session_duration_minutes").notNull(),

  // Equipment (stored as comma-separated values for simplicity)
  equipment: text("equipment").notNull(), // e.g. 'bodyweight,dumbbells,barbell'

  // Track / running access
  trackAccess: text("track_access").notNull().default("none"), // 'none' | 'outdoor' | 'treadmill' | 'both'

  // Health flags
  injuries: text("injuries"), // free text, nullable

  // Onboarding complete flag
  onboardingComplete: integer("onboarding_complete", { mode: "boolean" })
    .notNull()
    .default(false),
});

// One row per training session logged.
export const workoutSessions = sqliteTable("workout_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerkId: text("clerk_id").notNull(),
  scheduledDate: text("scheduled_date").notNull(), // ISO date string YYYY-MM-DD
  completedAt: integer("completed_at", { mode: "timestamp" }),
  sessionType: text("session_type").notNull(), // 'strength' | 'sprint' | 'mobility' | 'skills'
  title: text("title").notNull(),
  durationMinutes: integer("duration_minutes"),
  rpe: integer("rpe"), // 1-10 rate of perceived exertion
  notes: text("notes"),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
});

// Individual exercises within a session.
export const sessionExercises = sqliteTable("session_exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id").notNull(),
  exerciseName: text("exercise_name").notNull(),
  orderIndex: integer("order_index").notNull(),
  sets: integer("sets"),
  reps: text("reps"), // stored as string to allow '3x5', '8-12', etc.
  loadKg: real("load_kg"),
  distanceMetres: real("distance_metres"),
  durationSeconds: integer("duration_seconds"),
  notes: text("notes"),
});
