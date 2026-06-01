"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type Props = {
  items: string[];
  baseVelocity?: number;
};

function Item({ label }: { label: string }) {
  return (
    <span className="ticker-item">
      {label}
      <span className="ticker-dot"> ✦ </span>
    </span>
  );
}

function StaticTicker({ items }: { items: string[] }) {
  return (
    <div className="ticker-wrap -mx-6">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <Item key={i} label={item} />
        ))}
      </div>
    </div>
  );
}

function AnimatedTicker({ items, baseVelocity = 2 }: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const directionFactor = useRef(1);

  // 4 copies so the -25% wrap is always covered (seamless loop).
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="ticker-wrap -mx-6">
      <motion.div className="ticker-track" style={{ x }}>
        {row.map((item, i) => (
          <Item key={i} label={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function VelocityMarquee({ items, baseVelocity = 2 }: Props) {
  // Gate at the loader level so the animated internals (motion hooks, rAF,
  // scroll listener) never mount for reduced-motion users.
  const reduced = usePrefersReducedMotion();
  if (reduced) return <StaticTicker items={items} />;
  return <AnimatedTicker items={items} baseVelocity={baseVelocity} />;
}
