"use client";

import { useEffect, useState } from "react";

type Props = {
  target: number;
  duration?: number;
  suffix?: string;
  label: string;
};

export default function Counter({
  target,
  duration = 2000,
  suffix = "",
  label,
}: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <p className="text-white/60 text-sm mt-2">{label}</p>
    </div>
  );
}