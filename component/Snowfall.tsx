"use client";

import { useEffect, useState } from "react";

type Snowflake = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  glow: number;
};

function createSnowflakes(count: number): Snowflake[] {
  return Array.from({ length: count }, (_, id) => {
    const size = 2 + Math.random() * 6;
    return {
      id,
      left: Math.random() * 100,
      size,
      duration: 9 + Math.random() * 14,
      delay: Math.random() * 16,
      opacity: 0.35 + Math.random() * 0.5,
      drift: -24 + Math.random() * 48,
      glow: Math.max(2, size * 0.65),
    };
  });
}

export default function Snowfall({ count = 48 }: { count?: number }) {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    setFlakes(createSnowflakes(count));
  }, [count]);

  if (flakes.length === 0) return null;

  return (
    <div
      className="snowfall pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake absolute rounded-full bg-white/90"
          style={
            {
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              boxShadow: `0 0 ${flake.glow}px rgba(255, 255, 255, 0.45)`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              "--snow-drift": `${flake.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
