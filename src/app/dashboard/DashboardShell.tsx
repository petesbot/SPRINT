"use client";

import { UserButton } from "@clerk/nextjs";
import type { InferSelectModel } from "drizzle-orm";
import type { schema } from "@/lib/db";

type Profile = InferSelectModel<typeof schema.athleteProfiles>;

const goalLabels: Record<string, string> = {
  general_fitness: "General fitness",
  speed_power: "Speed & power",
  fat_loss: "Fat loss",
  injury_resilience: "Injury resilience",
  sport_performance: "Sport performance",
};

export default function DashboardShell({ profile }: { profile: Profile }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <span className="text-lg font-bold text-orange-500">Sprint</span>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
            <a href="/dashboard" className="text-slate-50 font-medium">Dashboard</a>
            <a href="/workouts" className="hover:text-slate-50 transition-colors">Workouts</a>
            <a href="/calendar" className="hover:text-slate-50 transition-colors">Calendar</a>
            <a href="/profile" className="hover:text-slate-50 transition-colors">Profile</a>
          </nav>
          <UserButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Welcome back, {profile.firstName} 👋
          </h1>
          <p className="text-slate-400 mt-1">
            Goal: {goalLabels[profile.primaryGoal]} · {profile.availableDaysPerWeek} days/week ·{" "}
            {profile.sessionDurationMinutes} min sessions
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "This week", value: "0 / " + profile.availableDaysPerWeek, unit: "sessions" },
            { label: "Streak", value: "0", unit: "days" },
            { label: "Total sessions", value: "0", unit: "logged" },
            { label: "Training age", value: String(profile.trainingYears), unit: "years" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
              <p className="text-xs text-slate-500">{s.unit}</p>
            </div>
          ))}
        </div>

        {/* Next session placeholder */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-1">Next session</h2>
          <p className="text-slate-400 text-sm">
            Workout scheduling is coming in Phase 2. Your personalised plan is
            being built based on your onboarding answers.
          </p>
        </div>
      </main>
    </div>
  );
}
