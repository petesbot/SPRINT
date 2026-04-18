export const runtime = "edge";

const features = [
  {
    icon: "⚡",
    title: "Sprint & Speed",
    description:
      "Acceleration, max velocity, and speed endurance sessions built around your track or road access.",
  },
  {
    icon: "🏋️",
    title: "Strength Training",
    description:
      "Periodised lifting programmes that adapt to your equipment, from a single pair of dumbbells to a full gym.",
  },
  {
    icon: "🧘",
    title: "Prehab & Mobility",
    description:
      "Targeted movement work that keeps you injury-free and moving well — built into every week automatically.",
  },
  {
    icon: "📅",
    title: "Smart Scheduling",
    description:
      "Drag, drop, and reschedule sessions in a live calendar. The app re-sequences your week to protect recovery.",
  },
  {
    icon: "📈",
    title: "Adapts to You",
    description:
      "Every session logged trains the AI. It tracks your progress and adjusts load, volume, and intensity automatically.",
  },
  {
    icon: "🎯",
    title: "Personalised Onboarding",
    description:
      "Answer a few questions about your age, history, and goals — Sprint builds your first week instantly.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <span className="text-xl font-bold tracking-tight text-orange-500">
          Sprint
        </span>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="/login"
            className="text-slate-400 hover:text-slate-50 transition-colors"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Get started
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24 gap-6">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-sm px-3 py-1 rounded-full border border-orange-500/20">
          <span>⚡</span> AI-powered fitness coaching
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
          Train smarter.{" "}
          <span className="text-orange-500">Sprint faster.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
          Sprint builds your personalised strength, speed, and mobility
          programme — then adapts it every week based on what you actually did.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors"
          >
            Start for free
          </a>
          <a
            href="#features"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-3 rounded-lg font-semibold text-base transition-colors"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="px-6 py-16 max-w-5xl mx-auto w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-12 text-slate-100">
          Everything in one place
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-3"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold text-slate-100">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center text-center px-6 py-20 gap-4">
        <h2 className="text-3xl font-bold">Ready to run faster?</h2>
        <p className="text-slate-400 max-w-md">
          Set up your profile in under 5 minutes. Your first week is ready
          immediately.
        </p>
        <a
          href="/signup"
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-base transition-colors"
        >
          Create your free account
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Sprint. Built by Pete Simon.
      </footer>
    </div>
  );
}
