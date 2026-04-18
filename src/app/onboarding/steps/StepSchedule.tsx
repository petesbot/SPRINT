"use client";

import type { OnboardingData } from "@/types";
import { StepHeading, Label, OptionButton, NavButtons } from "./shared";

const dayOptions = [2, 3, 4, 5, 6];
const durationOptions = [
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
  { value: 90, label: "90 min" },
];

export default function StepSchedule({
  data,
  update,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  update: (p: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeading
        title="Your schedule"
        subtitle="Be realistic — the best plan is one you'll actually stick to."
      />

      <div className="space-y-6">
        <div>
          <Label>Days available per week</Label>
          <div className="grid grid-cols-5 gap-2 mt-1">
            {dayOptions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => update({ availableDaysPerWeek: d })}
                className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                  data.availableDaysPerWeek === d
                    ? "border-orange-500 bg-orange-500/10 text-orange-400"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Typical session length</Label>
          <div className="space-y-2">
            {durationOptions.map((o) => (
              <OptionButton
                key={o.value}
                selected={data.sessionDurationMinutes === o.value}
                onClick={() => update({ sessionDurationMinutes: o.value })}
              >
                {o.label}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
