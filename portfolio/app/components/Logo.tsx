/**
 * JRB monogram logo — two variants:
 *  "mark"  → just the JRB glyph + circuit dots (for header)
 *  "full"  → glyph + "JAY-R BAYOG" + </> rule  (for footer / standalone)
 */

interface LogoProps {
  variant?: "mark" | "full";
  className?: string;
  color?: string;        // overrides currentColor for the mark
  mutedColor?: string;   // used for name text in "full" variant
}

export function Logo({
  variant = "mark",
  className = "",
  color = "currentColor",
  mutedColor = "currentColor",
}: LogoProps) {
  const font = "'Barlow Condensed', 'Arial Narrow', sans-serif";
  const mono = "'JetBrains Mono', 'Courier New', monospace";

  const Glyph = () => (
    <>
      {/* ── JRB text ── */}
      <text
        x="6"
        y="155"
        fontFamily={font}
        fontWeight="900"
        fontSize="158"
        letterSpacing="-4"
        fill={color}
      >
        JRB
      </text>

      {/* ── Circuit node — top of J ── */}
      {/* filled pad where J's stroke originates */}
      <circle cx="43" cy="24"  r="4"   fill={color} />
      {/* trace going up */}
      <line   x1="43" y1="20"  x2="43" y2="9"
              stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* open ring endpoint */}
      <circle cx="43" cy="7"   r="4.5" fill="none"
              stroke={color} strokeWidth="1.8" />

      {/* ── Circuit node — bottom-right of B ── */}
      {/* filled pad where B's foot exits */}
      <circle cx="268" cy="152" r="4"   fill={color} />
      {/* trace going right */}
      <line   x1="272" y1="152" x2="284" y2="152"
              stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* open ring endpoint */}
      <circle cx="286" cy="152" r="4.5" fill="none"
              stroke={color} strokeWidth="1.8" />
    </>
  );

  /* ── Mark variant ── */
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 300 168"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Jay-R Bayog — JRB logo mark"
      >
        <Glyph />
      </svg>
    );
  }

  /* ── Full variant ── */
  return (
    <svg
      viewBox="0 0 300 258"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jay-R Bayog logo"
    >
      <Glyph />

      {/* ── Name ── */}
      <text
        x="150"
        y="191"
        textAnchor="middle"
        fontFamily={font}
        fontWeight="600"
        fontSize="15.5"
        letterSpacing="7.5"
        fill={mutedColor}
        opacity="0.75"
      >
        JAY-R BAYOG
      </text>

      {/* ── </> rule ── */}
      <line x1="40"  y1="211" x2="113" y2="211"
            stroke={mutedColor} strokeWidth="0.8" opacity="0.3" />
      <text
        x="150"
        y="215"
        textAnchor="middle"
        fontFamily={mono}
        fontSize="9.5"
        fill={mutedColor}
        opacity="0.45"
        letterSpacing="2"
      >
        {"</>"}
      </text>
      <line x1="187" y1="211" x2="260" y2="211"
            stroke={mutedColor} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}
