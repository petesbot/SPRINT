"use client";

import type { OnboardingData } from "@/types";
import { StepHeading, Label, NavButtons } from "./shared";

export default function StepHealth({
  data,
  update,
  onBack,
  onSubmit,
  saving,
}: {
  data: OnboardingData;
  update: (p: Partial<OnboardingData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  saving: boolean;
}) {
  return (
    <div>
      <StepHeading
        title="Injuries & limitations"
        subtitle="Optional but important — we'll programme around anything you flag."
      />

      <div className="space-y-4">
        <div>
          <Label>Current injuries or pain points (optional)</Label>
          <textarea
            value={data.injuries}
            onChange={(e) => update({ injuries: e.target.value })}
            rows={4}
            placeholder="e.g. Lower back pain, left knee niggle, shoulder impingement…"
            className="w-full bg-slate-800 border border-slate-700 text-slate-50 rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
          <p className="mt-1 text-xs text-slate-500">
            Leave blank if you&apos;re injury-free.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm text-slate-400">
          <p className="font-medium text-slate-300 mb-1">You&apos;re almost done 🎉</p>
          <p>
            Hit <span className="text-orange-400">Build my plan</span> and we&apos;ll generate
            your first week of training based on your answers.
          </p>
        </div>
      </div>

      <NavButtons
        onBack={onBack}
        onSubmit={onSubmit}
        saving={saving}
        nextLabel="Build my plan"
      />
    </div>
  );
}
