"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float t = uTime * 0.06;
    float n =
      sin(uv.x * 3.0 + t) * 0.5 +
      sin(uv.y * 4.0 - t * 1.3) * 0.5 +
      sin((uv.x + uv.y) * 2.0 + t * 0.7) * 0.5;
    n = n / 1.5 * 0.5 + 0.5;

    vec3 base   = vec3(0.047, 0.039, 0.031); // #0C0A08
    vec3 accent = vec3(0.31, 0.62, 1.0);     // #4F9EFF
    vec3 col = mix(base, accent, smoothstep(0.5, 1.0, n) * 0.30);

    float d = distance(uv, vec2(0.5));
    col *= 1.0 - d * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: false,
    });
    const gl = renderer.gl;
    gl.clearColor(0.047, 0.039, 0.031, 1);
    mount.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      // Guard a 0x0 box on first paint (lazy ssr:false mount): a zero
      // uResolution would divide-by-zero in the fragment shader.
      if (!mount.clientWidth || !mount.clientHeight) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
      if (reduced) renderer.render({ scene: mesh }); // keep static frame correct
    };
    const ro = new ResizeObserver(() => resize());
    ro.observe(mount);
    window.addEventListener("resize", resize);
    resize();

    let cancelled = false;
    let raf = 0;
    let visible = true;

    const render = (t: number) => {
      if (cancelled || !visible) {
        raf = 0; // fully stop the loop; IO restarts it when visible again
        return;
      }
      raf = requestAnimationFrame(render);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    const start = () => {
      if (!cancelled && !reduced && !raf) raf = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0, rootMargin: "50px" },
    );
    io.observe(mount);

    if (reduced) {
      renderer.render({ scene: mesh }); // one static frame
    } else {
      start();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [reduced]);

  return <div ref={ref} aria-hidden className="absolute inset-0 -z-10" />;
}
