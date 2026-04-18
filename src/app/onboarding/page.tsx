"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import type { OnboardingData, Equipment } from "@/types";
import StepPersonal from "./steps/StepPersonal";
import StepBackground from "./steps/StepBackground";
import StepGoals from "./steps/StepGoals";
import StepSchedule from "./steps/StepSchedule";
import StepEquipment from "./steps/StepEquipment";
import StepHealth from "./steps/StepHealth";

const TOTAL_STEPS = 6;

const defaultData: OnboardingData = {
  firstName: "",
  ageYears: 30,
  sex: "prefer_not_to_say",
  bodyWeightKg: null,
  trainingYears: 0,
  runningBackground: "none",
  sport: "",
  primaryGoal: "general_fitness",
  availableDaysPerWeek: 3,
  sessionDurationMinutes: 60,
  equipment: ["bodyweight"] as Equipment[],
  trackAccess: "none",
  injuries: "",
};

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    ...defaultData,
    firstName: user?.firstName ?? "",
  });
  const [saving, setSaving] = useState(false);

  function update(patch: Partial<OnboardingData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function submit() {
    setSaving(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      router.push("/dashboard");
    } catch {
      setSaving(false);
    }
  }

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <span className="text-lg font-bold text-orange-500">Sprint</span>
        <span className="text-sm text-slate-400">
          Step {step} of {TOTAL_STEPS}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step content */}
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {step === 1 && (
            <StepPersonal data={data} update={update} onNext={next} />
          )}
          {step === 2 && (
            <StepBackground data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 3 && (
            <StepGoals data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 4 && (
            <StepSchedule data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 5 && (
            <StepEquipment data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 6 && (
            <StepHealth
              data={data}
              update={update}
              onBack={back}
              onSubmit={submit}
              saving={saving}
            />
          )}
        </div>
      </main>
    </div>
  );
}
