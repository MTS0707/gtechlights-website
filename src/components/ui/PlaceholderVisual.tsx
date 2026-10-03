/**
 * Neutral branded visual used where a real photograph has not yet been supplied
 * (e.g. healthcare, residential, UPS). Deliberately abstract so it is never
 * mistaken for an actual project.
 */
export function PlaceholderVisual({
  label = "Photograph to be supplied",
  variant = "rings",
  showLabel = true,
}: {
  label?: string;
  variant?: "rings" | "lines" | "hex";
  showLabel?: boolean;
}) {
  return (
    <div className="arch-grid absolute inset-0 overflow-hidden bg-ink-900" role="img" aria-label={label}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(91,134,240,0.3),transparent_60%)]" />
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {variant === "rings" && (
          <g fill="none" stroke="#dce6fb" strokeOpacity="0.85">
            <ellipse cx="200" cy="130" rx="120" ry="34" strokeWidth="3" />
            <ellipse cx="200" cy="150" rx="84" ry="24" strokeWidth="2.5" strokeOpacity="0.6" />
            <ellipse cx="200" cy="166" rx="48" ry="14" strokeWidth="2" strokeOpacity="0.4" />
          </g>
        )}
        {variant === "lines" && (
          <g stroke="#dce6fb" strokeWidth="3" strokeOpacity="0.8">
            <path d="M40 90H360M80 150H320M120 210H280" />
          </g>
        )}
        {variant === "hex" && (
          <g fill="none" stroke="#dce6fb" strokeWidth="3" strokeOpacity="0.8">
            <path d="M200 70l52 30v60l-52 30-52-30v-60z" />
            <path d="M304 130l52 30v60l-52 30-52-30v-60zM96 130l52 30v60l-52 30-52-30v-60z" strokeOpacity="0.4" />
          </g>
        )}
      </svg>
      {showLabel && <span className="eyebrow absolute bottom-4 left-4 text-[0.65rem] text-ink-300/80">{label}</span>}
    </div>
  );
}
