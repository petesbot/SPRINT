"use client";

import type { OnboardingData, Equipment, TrackAccess } from "@/types";
import { StepHeading, Label, OptionButton, NavButtons } from "./shared";

const equipmentOptions: { value: Equipment; label: string; desc: string }[] = [
  { value: "bodyweight", label: "Bodyweight only", desc: "No equipment needed" },
  { value: "resistance_bands", label: "Resistance bands", desc: "Light bands or loops" },
  { value: "dumbbells", label: "Dumbbells", desc: "Fixed or adjustable" },
  { value: "barbell", label: "Barbell + rack", desc: "Full barbell setup at home or gym" },
  { value: "full_gym", label: "Full gym", desc: "Commercial gym with all equipment" },
];

const trackOptions: { value: TrackAccess; label: string }[] = [
  { value: "none", label: "No track / grass access" },
  { value: "outdoor", label: "Outdoor track or field" },
  { value: "treadmill", label: "Treadmill only" },
  { value: "both", label: "Both outdoor and treadmill" },
];

export default function StepEquipment({
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
  function toggleEquipment(eq: Equipment) {
    const current = data.equipment;
    const updated = current.includes(eq)
      ? current.filter((e) => e !== eq)
      : [...current, eq];
    // Always keep at least bodyweight
    update({ equipment: updated.length === 0 ? ["bodyweight"] : updated });
  }

  return (
    <div>
      <StepHeading
        title="Equipment & training space"
        subtitle="Tick everything you have regular access to."
      />

      <div className="space-y-6">
        <div>
          <Label>Strength equipment (select all that apply)</Label>
          <div className="space-y-2">
            {equipmentOptions.map((o) => (
              <OptionButton
                key={o.value}
                selected={data.equipment.includes(o.value)}
                onClick={() => toggleEquipment(o.value)}
              >
                <span className="font-medium">{o.label}</span>
                <span className="block text-xs text-slate-400 mt-0.5">{o.desc}</span>
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <Label>Sprint / running surface</Label>
          <div className="space-y-2">
            {trackOptions.map((o) => (
              <OptionButton
                key={o.value}
                selected={data.trackAccess === o.value}
                onClick={() => update({ trackAccess: o.value })}
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
