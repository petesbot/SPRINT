"use client";

import type { OnboardingData, Sex } from "@/types";
import { StepHeading, Label, Input, OptionButton, NavButtons } from "./shared";

const sexOptions: { value: Sex; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export default function StepPersonal({
  data,
  update,
  onNext,
}: {
  data: OnboardingData;
  update: (p: Partial<OnboardingData>) => void;
  onNext: () => void;
}) {
  const valid = data.firstName.trim().length > 0 && data.ageYears >= 13;

  return (
    <div>
      <StepHeading title="Tell us about yourself" subtitle="Basic info so we can personalise your plan." />

      <div className="space-y-5">
        <div>
          <Label>First name</Label>
          <Input
            value={data.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
            placeholder="Your first name"
          />
        </div>

        <div>
          <Label>Age</Label>
          <Input
            type="number"
            min={13}
            max={100}
            value={data.ageYears}
            onChange={(e) => update({ ageYears: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div>
          <Label>Sex</Label>
          <div className="space-y-2">
            {sexOptions.map((o) => (
              <OptionButton
                key={o.value}
                selected={data.sex === o.value}
                onClick={() => update({ sex: o.value })}
              >
                {o.label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <Label>Body weight (kg) — optional</Label>
          <Input
            type="number"
            min={30}
            max={300}
            value={data.bodyWeightKg ?? ""}
            onChange={(e) =>
              update({ bodyWeightKg: e.target.value ? parseFloat(e.target.value) : null })
            }
            placeholder="e.g. 75"
          />
        </div>
      </div>

      <NavButtons onNext={onNext} isFirst nextLabel="Continue" />
      {!valid && (
        <p className="mt-2 text-xs text-slate-500 text-center">
          Enter your name and age to continue.
        </p>
      )}
    </div>
  );
}
