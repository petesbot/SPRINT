import Link from "next/link";

export const runtime = "edge";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-slate-400 text-sm">Login coming soon.</p>
        <Link href="/" className="mt-6 inline-block text-orange-400 text-sm hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
