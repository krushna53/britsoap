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
      <div className="text-4xl md:text-5xl font-bold text-primary">
        {count}
        {suffix}
      </div>
      <div className="w-8 h-0.5 bg-accent mx-auto my-2" />
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}