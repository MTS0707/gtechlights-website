export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="grid min-h-[70svh] place-items-center bg-ink-950 pt-20">
      <div className="h-px w-40 overflow-hidden bg-white/10">
        <div className="h-px w-1/2 animate-beam bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
      </div>
    </div>
  );
}
