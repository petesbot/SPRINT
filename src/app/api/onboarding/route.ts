import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import type { OnboardingData } from "@/types";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body: OnboardingData = await req.json();
  const db = getDb();

  await db
    .insert(schema.athleteProfiles)
    .values({
      clerkId: userId,
      firstName: body.firstName,
      ageYears: body.ageYears,
      sex: body.sex,
      bodyWeightKg: body.bodyWeightKg ?? undefined,
      trainingYears: body.trainingYears,
      runningBackground: body.runningBackground,
      sport: body.sport || null,
      primaryGoal: body.primaryGoal,
      availableDaysPerWeek: body.availableDaysPerWeek,
      sessionDurationMinutes: body.sessionDurationMinutes,
      equipment: body.equipment.join(","),
      trackAccess: body.trackAccess,
      injuries: body.injuries || null,
      onboardingComplete: true,
    })
    .onConflictDoUpdate({
      target: schema.athleteProfiles.clerkId,
      set: {
        firstName: body.firstName,
        ageYears: body.ageYears,
        sex: body.sex,
        bodyWeightKg: body.bodyWeightKg ?? undefined,
        trainingYears: body.trainingYears,
        runningBackground: body.runningBackground,
        sport: body.sport || null,
        primaryGoal: body.primaryGoal,
        availableDaysPerWeek: body.availableDaysPerWeek,
        sessionDurationMinutes: body.sessionDurationMinutes,
        equipment: body.equipment.join(","),
        trackAccess: body.trackAccess,
        injuries: body.injuries || null,
        onboardingComplete: true,
      },
    });

  return NextResponse.json({ ok: true });
}
