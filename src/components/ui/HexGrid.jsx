import { useMemo } from "react";

const hotCells = new Set([
  "0,0",
  "-1,0",
  "1,0",
  "0,-1",
  "-1,-1",
  "1,-1",
  "0,1",
]);

export default function HexGrid({ pulse }) {
  const grid = useMemo(() => {
    const cells = [];
    for (let q = -2; q <= 2; q += 1) {
      for (let s = -2; s <= 2; s += 1) {
        cells.push([q, s]);
      }
    }
    return cells;
  }, []);

  const counts = useMemo(() => {
    const map = new Map();
    hotCells.forEach((key) => {
      map.set(key, Math.floor(Math.random() * 8) + 3);
    });
    return map;
  }, []);

  const radius = 20;
  const dx = radius * Math.sqrt(3);
  const dy = radius * 1.5;
  const cx = 130;
  const cy = 100;

  return (
    <div className="relative w-full aspect-[13/10] overflow-hidden rounded-3xl bg-slate-950/50">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 200" aria-hidden="true">
        {grid.map(([q, s]) => {
          const x = cx + dx * (q + s * 0.5);
          const y = cy + dy * s;
          const key = `${q},${s}`;
          const hot = hotCells.has(key);
          const points = Array.from({ length: 6 }, (_, index) => {
            const angle = (Math.PI / 180) * (60 * index - 30);
            return `${(x + radius * Math.cos(angle)).toFixed(1)},${(y + radius * Math.sin(angle)).toFixed(1)}`;
          }).join(" ");

          return (
            <g key={key}>
              <polygon
                points={points}
                fill={hot ? (pulse ? "#f9d65d" : "#d4ac0d") : "#111827"}
                stroke={hot ? "#a38500" : "#334155"}
                strokeWidth="1.2"
                className={hot ? "transition-colors duration-700" : ""}
              />
              {hot && (
                <text
                  x={x.toFixed(1)}
                  y={(y + 4).toFixed(1)}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill="#111827"
                >
                  {counts.get(key)}
                </text>
              )}
            </g>
          );
        })}
        <text x="130" y="192" textAnchor="middle" fontSize="9" fill="#64748b">
          Gold cells = high-density student zones
        </text>
      </svg>
    </div>
  );
}
