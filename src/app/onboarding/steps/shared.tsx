export function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-50">{title}</h1>
      <p className="mt-1 text-slate-400">{subtitle}</p>
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-300 mb-1">{children}</label>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-slate-800 border border-slate-700 text-slate-50 rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 ${props.className ?? ""}`}
    />
  );
}

export function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
        selected
          ? "border-orange-500 bg-orange-500/10 text-orange-400"
          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
      }`}
    >
      {children}
    </button>
  );
}

export function NavButtons({
  onBack,
  onNext,
  onSubmit,
  saving,
  nextLabel = "Continue",
  isFirst = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  saving?: boolean;
  nextLabel?: string;
  isFirst?: boolean;
}) {
  return (
    <div className="flex gap-3 mt-8">
      {!isFirst && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-slate-700 text-slate-300 rounded-lg py-2 text-sm hover:border-slate-500 transition-colors"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext ?? onSubmit}
        disabled={saving}
        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium transition-colors"
      >
        {saving ? "Saving…" : nextLabel}
      </button>
    </div>
  );
}
