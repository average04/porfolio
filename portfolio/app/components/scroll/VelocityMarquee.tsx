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

export default function VelocityMarquee({
  items,
  baseVelocity = 2,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const reduced = usePrefersReducedMotion();

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

  // 4 copies so the -25% wrap is always covered.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  if (reduced) {
    return (
      <div className="ticker-wrap -mx-6">
        <div className="ticker-track">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot"> ✦ </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-wrap -mx-6">
      <motion.div className="ticker-track" style={{ x }}>
        {row.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-dot"> ✦ </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
