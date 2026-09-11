// src/components/PixelBg.jsx
const pixels = [
  // solid squares — { top, left in %, size in px, color, shape }
  { top: 4, left: 82, size: 16, color: "accent" },
  { top: 18, left: 6, size: 12, color: "ink" },
  { top: 62, left: 90, size: 20, color: "ink" },
  { top: 9, left: 68, size: 10, color: "accent" },
  { top: 71, left: 76, size: 14, color: "accent" },
  { top: 27, left: 58, size: 8, color: "ink" },
  { top: 42, left: 34, size: 12, color: "accent" },
  { top: 78, left: 20, size: 16, color: "ink" },
  { top: 35, left: 48, size: 10, color: "accent" },
  { top: 5, left: 15, size: 16, color: "accent" },
  { top: 19, left: 3, size: 12, color: "ink" },
  { top: 63, left: 12, size: 20, color: "ink" },
  { top: 10, left: 40, size: 10, color: "accent" },
  { top: 72, left: 55, size: 14, color: "accent" },
  { top: 28, left: 30, size: 20, color: "ink" },
  { top: 44, left: 88, size: 36, color: "accent" },
  { top: 80, left: 92, size: 16, color: "ink" },
  { top: 33, left: 65, size: 24, color: "accent" },
  { top: 13, left: 50, size: 12, color: "ink" },
  { top: 17, left: 44, size: 8, color: "accent" },
  { top: 23, left: 57, size: 16, color: "ink" },
  { top: 55, left: 48, size: 10, color: "accent" },
  { top: 68, left: 38, size: 12, color: "ink" },
  { top: 85, left: 55, size: 20, color: "accent" },
  { top: 47, left: 47, size: 8, color: "ink" },
  { top: 60, left: 61, size: 12, color: "accent" },
  // extra rows to cover mid/lower page on short-content pages
  { top: 92, left: 25, size: 14, color: "ink" },
  { top: 96, left: 70, size: 10, color: "accent" },
  { top: 88, left: 10, size: 8, color: "accent" },
  { top: 90, left: 85, size: 18, color: "ink" },
  { top: 50, left: 5, size: 10, color: "accent" },
  { top: 53, left: 95, size: 12, color: "ink" },
];

const hollowPixels = [
  { top: 14, left: 78, size: 16, color: "ink" },
  { top: 52, left: 8, size: 12, color: "accent" },
  { top: 64, left: 72, size: 14, color: "ink" },
  { top: 84, left: 45, size: 14, color: "accent" },
];

const clusters = [
  { top: 41, left: 88, gap: 2, items: ["accent", "ink"] },
  { top: 76, left: 15, gap: 2, items: ["ink", "accent", "ink"] },
  { top: 8, left: 30, gap: 2, items: ["accent", "accent", "ink"] },
];

const colorClass = (color) => (color === "accent" ? "bg-accent" : "bg-ink");
const borderClass = (color) => (color === "accent" ? "border-accent" : "border-ink");

const PixelBg = () => {
  return (
    <div className="pointer-events-none absolute inset-0 min-h-full w-full overflow-hidden">
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(#e5e0d3 1px, transparent 1px), linear-gradient(90deg, #e5e0d3 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* solid scattered pixels */}
      {pixels.map((p, i) => (
        <div
          key={`solid-${i}`}
          className={`absolute ${colorClass(p.color)}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}

      {/* hollow/outlined pixels for variety */}
      {hollowPixels.map((p, i) => (
        <div
          key={`hollow-${i}`}
          className={`absolute border-2 ${borderClass(p.color)}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}

      {/* pixel debris clusters */}
      {clusters.map((c, i) => (
        <div
          key={`cluster-${i}`}
          className="absolute flex"
          style={{ top: `${c.top}%`, left: `${c.left}%`, gap: `${c.gap * 4}px` }}
        >
          {c.items.map((color, j) => (
            <div key={j} className={`h-2 w-2 ${colorClass(color)}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelBg;