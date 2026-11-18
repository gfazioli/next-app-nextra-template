import type { ReactNode } from 'react';

/* A ruler's ticks: one every four units along the baseline, a long one every fifth. */
const TICKS = Array.from({ length: 20 }, (_, i) => `M${10 + i * 4} 50v${i % 5 === 0 ? -14 : -6}`);

const HIDDEN = { strokeDasharray: '2 3' };

/**
 * The drawings: each one a few strokes on a 96 by 72 sheet, in the line weight of the page's
 * registration marks. `compass` is the larger one (120 by 120) that sits beside a heading.
 */
const SKETCHES = {
  /** A block in isometric view, its hidden edges dashed */
  block: (
    <>
      <path d="M48 12 80 27 48 42 16 27ZM16 27V45L48 60 80 45V27M48 42V60" />
      <path d="M16 45 48 30 80 45M48 30V12" {...HIDDEN} />
    </>
  ),
  /** Three planes, one over the other */
  layers: (
    <>
      <path d="M48 10 82 26 48 42 14 26ZM14 36 48 52 82 36M14 46 48 62 82 46" />
      <path d="M14 26V46M82 26V46M48 42V62" {...HIDDEN} />
    </>
  ),
  /** A circle found with its two axes */
  target: (
    <>
      <circle cx="48" cy="36" r="22" />
      <circle cx="48" cy="36" r="9" />
      <path d="M48 6V66M18 36H78" {...HIDDEN} />
    </>
  ),
  /** A ruler */
  ruler: <path d={`M10 50H86${TICKS.join('')}`} />,
  /** A page with a folded corner, and the one under it */
  sheets: (
    <>
      <path d="M32 12H58L68 22V58H32ZM58 12V22H68M38 32H62M38 40H62M38 48H54" />
      <path d="M32 20H24V64H60V58" {...HIDDEN} />
    </>
  ),
  /** A page laid out: header, sidebar, footer */
  frame: (
    <>
      <path d="M18 14H78V58H18ZM18 25H78M18 47H78M24 19.5H36M60 19.5H72" />
      <path d="M36 25V47" {...HIDDEN} />
    </>
  ),
  /** Three entries on a line of time */
  timeline: (
    <>
      <circle cx="28" cy="20" r="3.5" />
      <circle cx="28" cy="36" r="3.5" />
      <circle cx="28" cy="52" r="3.5" />
      <path d="M38 20H74M38 36H62M38 52H70" />
      <path d="M28 8V16.5M28 23.5V32.5M28 39.5V48.5M28 55.5V64" {...HIDDEN} />
    </>
  ),
  /** A box, and the arrow that leaves it */
  export: (
    <>
      <path d="M52 30H22V60H66V44M44 38 74 12M60 12H74V26" />
      <path d="M22 45H66" {...HIDDEN} />
    </>
  ),
  /** A sun on the horizon: the half above drawn, the half below dashed */
  sun: (
    <>
      <path d="M12 54H84M28 54A20 20 0 0 1 68 54M68.8 42 75.7 38M60 33.2 64 26.3M48 30V22M36 33.2 32 26.3M27.2 42 20.3 38" />
      <path d="M28 54A20 20 0 0 0 68 54" {...HIDDEN} />
    </>
  ),
  /** Two arcs struck from the corner of two axes */
  compass: (
    <>
      <path d="M14 6V114M6 106H114M14 26A80 80 0 0 1 94 106M9 26H19M94 101V111" />
      <path d="M14 62A44 44 0 0 1 58 106M14 106 70.6 49.4" {...HIDDEN} />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type SketchName = keyof typeof SKETCHES;

/**
 * A line drawing in the page's ink (`currentColor`): the decoration in a card's corner or beside
 * a heading. Inline SVG, so it follows the colour scheme and costs no request. Decorative, so
 * hidden from assistive tech.
 */
export function Sketch({ name, className }: { name: SketchName; className?: string }) {
  const size = name === 'compass' ? '120 120' : '96 72';
  return (
    <svg
      className={className}
      viewBox={`0 0 ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {SKETCHES[name]}
    </svg>
  );
}
