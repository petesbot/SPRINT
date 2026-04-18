"use client";

import type { OnboardingData, PrimaryGoal } from "@/types";
import { StepHeading, OptionButton, NavButtons } from "./shared";

const goalOptions: { value: PrimaryGoal; label: string; desc: string; icon: string }[] = [
  {
    value: "general_fitness",
    label: "General fitness",
    desc: "Get fitter, stronger, and healthier overall",
    icon: "💪",
  },
  {
    value: "speed_power",
    label: "Speed & power",
    desc: "Run faster, jump higher, be more explosive",
    icon: "⚡",
  },
  {
    value: "fat_loss",
    label: "Fat loss",
    desc: "Lose body fat while building or keeping muscle",
    icon: "🔥",
  },
  {
    value: "injury_resilience",
    label: "Injury resilience",
    desc: "Stay pain-free, move better, reduce injury risk",
    icon: "🛡️",
  },
  {
    value: "sport_performance",
    label: "Sport performance",
    desc: "Improve at a specific sport or competition",
    icon: "🏆",
  },
];

export default function StepGoals({
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
        title="What's your main goal?"
        subtitle="Pick one — you can always change this later."
      />

      <div className="space-y-2">
        {goalOptions.map((o) => (
          <OptionButton
            key={o.value}
            selected={data.primaryGoal === o.value}
            onClick={() => update({ primaryGoal: o.value })}
          >
            <span className="flex items-start gap-3">
              <span className="text-xl leading-none mt-0.5">{o.icon}</span>
              <span>
                <span className="font-medium block">{o.label}</span>
                <span className="text-xs text-slate-400">{o.desc}</span>
              </span>
            </span>
          </OptionButton>
        ))}
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
