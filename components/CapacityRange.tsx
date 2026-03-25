type Props = {
  capacities: string[];
};

const FactoryIcon = ({ level }: { level: number }) => {
  const variants = [
    { width: 28, windows: 2 },
    { width: 36, windows: 3 },
    { width: 44, windows: 4 },
    { width: 52, windows: 5 },
    { width: 60, windows: 6 },
    { width: 68, windows: 7 },
    { width: 76, windows: 8 },
  ];

  const v = variants[level] || variants[variants.length - 1];

  return (
    <svg viewBox="0 0 100 64" className="w-16 h-16 fill-gray-700">
      <rect x="8" y="28" width={v.width} height="24" />

      {Array.from({ length: v.windows }).map((_, i) => (
        <rect key={i} x={14 + i * 8} y="34" width="5" height="5" fill="white" />
      ))}

      <rect x={v.width + 10} y="16" width="6" height="36" />
    </svg>
  );
};

export default function CapacityRange({ capacities }: Props) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10 max-w-5xl mx-auto">
      {capacities.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-primary hover:bg-primary/5 transition"
        >
          <FactoryIcon level={i} />
          <p className="text-lg font-semibold text-gray-800">{c}</p>
        </div>
      ))}
    </div>
  );
}
