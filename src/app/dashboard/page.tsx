import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import DashboardShell from "./DashboardShell";

export const runtime = "edge";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const db = getDb();
  const profile = await db
    .select()
    .from(schema.athleteProfiles)
    .where(eq(schema.athleteProfiles.clerkId, userId))
    .get();

  // New user — send them through onboarding first
  if (!profile?.onboardingComplete) {
    redirect("/onboarding");
  }

  return <DashboardShell profile={profile} />;
}
