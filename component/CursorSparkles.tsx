"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TrailStar = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  kind: "trail";
};

type ClickSpark = {
  id: number;
  x: number;
  y: number;
  size: number;
  kind: "click";
};

type Particle = TrailStar | ClickSpark;

let particleId = 0;

function StarIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.5l2.2 6.8h7.1l-5.8 4.2 2.2 6.8L12 16.1l-5.7 4.2 2.2-6.8-5.8-4.2h7.1L12 2.5z" />
    </svg>
  );
}

export default function CursorSparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastTrailRef = useRef({ x: 0, y: 0, time: 0 });

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((particle) => particle.id !== id));
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const addParticles = (next: Particle[]) => {
      setParticles((prev) => [...prev.slice(-100), ...next]);
    };

    // ✨ 產生滑鼠跟隨星星的邏輯
    const spawnTrail = (clientX: number, clientY: number) => {
      const now = performance.now();
      const last = lastTrailRef.current;
      const distance = Math.hypot(clientX - last.x, clientY - last.y);

      // 控制生產頻率（太近或太快就不生，防止畫面卡頓）
      if (now - last.time < 35 && distance < 10) return;

      lastTrailRef.current = { x: clientX, y: clientY, time: now };

      const count = Math.random() > 0.55 ? 2 : 1;
      const stars: TrailStar[] = Array.from({ length: count }, () => ({
        id: ++particleId,
        x: clientX + (Math.random() - 0.5) * 10,
        y: clientY + (Math.random() - 0.5) * 10,
        
        // 💡 【參數調整：跟隨星星的大小】
        // 5 代表基礎最小尺寸，Math.random() * 11 代表隨機加上 0~11 像素。
        // 如果想讓星星變大，可以改成：12 + Math.random() * 15
        size: 6 + Math.random() * 12, 
        
        rotation: Math.random() * 360,
        kind: "trail",
      }));

      addParticles(stars);
    };

    // 🌟 產生點擊單一大型光暈的邏輯
    const spawnClick = (clientX: number, clientY: number) => {
      // 💡 這裡移除了原本四散擴散的小碎屑碎石，只留下剛好在點擊正中心的一顆大光芒物件
      const mainGlow: ClickSpark = {
        id: ++particleId,
        x: clientX,
        y: clientY,
        
        // 💡 【參數調整：點擊光暈的大小】
        // 這裡就是光暈的直徑（像素 px）。因為是單一發光，大膽給它 70~100px 看起來最魔幻！
        size: 80, 
        
        kind: "click",
      };

      addParticles([mainGlow]);
    };

    const onMove = (event: MouseEvent) => {
      spawnTrail(event.clientX, event.clientY);
    };

    const onClick = (event: MouseEvent) => {
      spawnClick(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      className="cursor-fx pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      {particles.map((particle) =>
        particle.kind === "trail" ? (
          <span
            key={particle.id}
            className="cursor-star absolute text-[#fff9e8]"
            style={
              {
                left: particle.x,
                top: particle.y,
                "--star-rot": `${particle.rotation}deg`,
                // 星星的外發光（Glow 效果）
                filter: `drop-shadow(0 0 ${Math.max(2, particle.size * 0.35)}px rgba(255, 245, 210, 0.75))`,
              } as React.CSSProperties
            }
            onAnimationEnd={() => removeParticle(particle.id)} // 動態結束後自動從記憶體刪除
          >
            <StarIcon size={particle.size} />
          </span>
        ) : (
          /* 💡 點擊發光：把它改成一個帶有擴散外發光的聖誕金色圓形粒子 */
          <span
            key={particle.id}
            className="cursor-spark absolute rounded-full bg-amber-100/90"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              // 💡 核心：利用 CSS filter 的 blur 搭配大範圍的 drop-shadow，做出超漂亮的高質感魔法光暈
              filter: `blur(4px) drop-shadow(0 0 18px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 30px rgba(245, 158, 11, 0.6))`,
            }}
            onAnimationEnd={() => removeParticle(particle.id)}
          />
        )
      )}
    </div>
  );
}