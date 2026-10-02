import { cn } from "@/lib/utils";

/*
 * The network motif from the Capabilities Portfolio's navy bands: a sparse
 * field of connected nodes plus a faint pink-violet arc. Fixed coordinates so
 * server and client render identically; purely decorative.
 */
const nodes: [number, number][] = [
  [620, 40], [700, 95], [790, 60], [860, 130], [940, 85], [1010, 150],
  [760, 180], [880, 230], [1080, 60], [1150, 140], [1040, 260], [960, 330],
  [1180, 300], [820, 320], [700, 260], [1240, 200],
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [6, 3], [3, 7], [4, 8],
  [8, 9], [5, 9], [5, 10], [7, 10], [10, 11], [11, 12], [9, 15], [12, 15],
  [7, 13], [13, 11], [6, 14], [14, 13],
];

export function Constellation({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="560 -40 760 440"
      preserveAspectRatio="xMaxYMin meet"
      className={cn(
        "pointer-events-none absolute top-0 right-0 h-auto w-[min(70%,860px)]",
        className,
      )}
    >
      <defs>
        <linearGradient id="constellation-arc" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e25c9e" />
          <stop offset="100%" stopColor="#6d52d8" />
        </linearGradient>
      </defs>
      <circle
        cx="1290"
        cy="-40"
        r="300"
        fill="none"
        stroke="url(#constellation-arc)"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <g stroke="#8fa3c7" strokeWidth="1" opacity="0.35">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g fill="#c9d4ea" opacity="0.7">
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
