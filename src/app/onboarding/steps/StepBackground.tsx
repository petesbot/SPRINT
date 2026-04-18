"use client";

import type { OnboardingData, RunningBackground } from "@/types";
import { StepHeading, Label, Input, OptionButton, NavButtons } from "./shared";

const runningOptions: { value: RunningBackground; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "I don't really run" },
  { value: "casual", label: "Casual", desc: "Occasional jogs, nothing structured" },
  { value: "club", label: "Club / recreational", desc: "Regular running, parkrun, local races" },
  { value: "competitive", label: "Competitive", desc: "Track, road races, serious training" },
];

export default function StepBackground({
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
        title="Training background"
        subtitle="Helps us set the right starting intensity."
      />

      <div className="space-y-5">
        <div>
          <Label>Years of strength training</Label>
          <Input
            type="number"
            min={0}
            max={50}
            value={data.trainingYears}
            onChange={(e) => update({ trainingYears: parseInt(e.target.value) || 0 })}
            placeholder="0 if you're just starting"
          />
        </div>

        <div>
          <Label>Running background</Label>
          <div className="space-y-2">
            {runningOptions.map((o) => (
              <OptionButton
                key={o.value}
                selected={data.runningBackground === o.value}
                onClick={() => update({ runningBackground: o.value })}
              >
                <span className="font-medium">{o.label}</span>
                <span className="block text-xs text-slate-400 mt-0.5">{o.desc}</span>
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <Label>Sport (optional)</Label>
          <Input
            value={data.sport}
            onChange={(e) => update({ sport: e.target.value })}
            placeholder="e.g. football, rugby, tennis…"
          />
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
