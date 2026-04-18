import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export const runtime = "edge";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-orange-500 tracking-tight">
          Sprint
        </Link>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-slate-900 border border-slate-800 shadow-xl",
              headerTitle: "text-slate-50",
              headerSubtitle: "text-slate-400",
              formFieldLabel: "text-slate-300",
              formFieldInput:
                "bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500",
              footerActionLink: "text-orange-400 hover:text-orange-300",
              formButtonPrimary:
                "bg-orange-500 hover:bg-orange-600 text-white",
            },
          }}
        />
      </div>
    </div>
  );
}
