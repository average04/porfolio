"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Loaded only on larger screens; the poster also covers load/WebGL failures. */
export default function AstronautScene() {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("Loading interactive view…");
  const pauseRef = useRef(false);
  const resetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;
    let generation = 0;

    async function start() {
      const current = ++generation;
      dispose?.();
      dispose = undefined;
      setReady(false);
      if (!media.matches || !host) {
        setStatus("Still view · reduced motion");
        return;
      }
      setStatus("Loading interactive view…");
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const { RoomEnvironment } =
        await import("three/addons/environments/RoomEnvironment.js");
      if (current !== generation) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        setStatus("Still view · 3D unavailable");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
      camera.position.set(0, 0, 5.8);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();
      scene.add(new THREE.HemisphereLight(0xd7e9ff, 0x182d4a, 2));
      const key = new THREE.DirectionalLight(0xdceaff, 4);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x7ab8ff, 7);
      rim.position.set(3, 1, -2);
      scene.add(rim);
      const astronaut = new THREE.Group();
      scene.add(astronaut);
      let active = true;
      let visible = true;
      let frame = 0;
      let time = 0;
      let last = 0;
      let drag = false;
      let previousX = 0;
      let rotation = 0;
      let pointerX = 0;
      let pointerY = 0;

      const releaseModel = (root: InstanceType<typeof THREE.Object3D>) => {
        const textures = new Set<InstanceType<typeof THREE.Texture>>();
        root.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) textures.add(value);
            });
            material.dispose();
          });
        });
        textures.forEach((texture) => {
          texture.dispose();
          if (texture.source.data instanceof ImageBitmap)
            texture.source.data.close();
        });
      };
      new GLTFLoader().load(
        "/models/astronaut.glb",
        (gltf) => {
          if (!active) {
            releaseModel(gltf.scene);
            return;
          }
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const scale = 2.75 / size.y;
          gltf.scene.scale.setScalar(scale);
          gltf.scene.position.copy(center.multiplyScalar(-scale));
          astronaut.add(gltf.scene);
          setReady(true);
        },
        undefined,
        () => {
          if (active) {
            setReady(false);
            setStatus("Still view · 3D unavailable");
          }
        },
      );

      const resize = new ResizeObserver(() => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });
      resize.observe(host);
      function render(now: number) {
        if (!active || !visible || document.hidden) {
          frame = 0;
          return;
        }
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!pauseRef.current) time += dt;
        astronaut.position.y = Math.sin(time * 0.65) * 0.09;
        astronaut.rotation.z = 0.23 + Math.sin(time * 0.4) * 0.025;
        astronaut.rotation.y +=
          (rotation + pointerX * 0.15 - astronaut.rotation.y) * 0.07;
        astronaut.rotation.x += (pointerY * 0.08 - astronaut.rotation.x) * 0.07;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      }
      const resume = () => {
        if (!frame && visible && !document.hidden) {
          last = performance.now();
          frame = requestAnimationFrame(render);
        }
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        resume();
      });
      observer.observe(host);
      document.addEventListener("visibilitychange", resume);
      const down = (event: PointerEvent) => {
        drag = true;
        previousX = event.clientX;
        host.setPointerCapture(event.pointerId);
      };
      const move = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        if (drag) {
          rotation += (event.clientX - previousX) * 0.008;
          previousX = event.clientX;
        }
        if (!pauseRef.current) {
          pointerX = (event.clientX - rect.left) / rect.width - 0.5;
          pointerY = (event.clientY - rect.top) / rect.height - 0.5;
        }
      };
      const up = () => {
        drag = false;
      };
      const leave = () => {
        pointerX = 0;
        pointerY = 0;
      };
      const lost = (event: Event) => {
        event.preventDefault();
        setReady(false);
        setStatus("Still view · 3D unavailable");
      };
      const keydown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          rotation += event.key === "ArrowLeft" ? -0.2 : 0.2;
        }
      };
      resetRef.current = () => {
        rotation = 0;
        pointerX = 0;
        pointerY = 0;
      };
      host.addEventListener("pointerdown", down);
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerup", up);
      host.addEventListener("pointercancel", up);
      host.addEventListener("lostpointercapture", up);
      host.addEventListener("pointerleave", leave);
      host.addEventListener("keydown", keydown);
      renderer.domElement.addEventListener("webglcontextlost", lost);
      resume();
      dispose = () => {
        active = false;
        cancelAnimationFrame(frame);
        resize.disconnect();
        observer.disconnect();
        document.removeEventListener("visibilitychange", resume);
        host.removeEventListener("pointerdown", down);
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerup", up);
        host.removeEventListener("pointercancel", up);
        host.removeEventListener("lostpointercapture", up);
        host.removeEventListener("pointerleave", leave);
        host.removeEventListener("keydown", keydown);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        releaseModel(astronaut);
        environment.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        resetRef.current = null;
      };
    }
    const update = () => {
      void start().catch(() => {
        setReady(false);
        setStatus("Still view · 3D unavailable");
      });
    };
    update();
    media.addEventListener("change", update);
    return () => {
      generation++;
      media.removeEventListener("change", update);
      dispose?.();
    };
  }, []);

  return (
    <div className="astronaut-stage">
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="orbital-planet" aria-hidden="true" />
      <Image
        src="/models/astronaut-still.png"
        alt="An astronaut floating in zero gravity"
        fill
        priority
        sizes="(max-width: 767px) 90vw, 55vw"
        className={`astronaut-poster ${ready ? "is-loaded" : ""}`}
      />
      <div
        ref={mount}
        className="astronaut-canvas"
        tabIndex={ready ? 0 : -1}
        role="img"
        aria-label="Interactive astronaut. Drag or use left and right arrow keys to rotate."
      />
      {!ready && (
        <p className="scene-controls" role="status">
          {status}
        </p>
      )}
      {ready && (
        <div className="scene-controls">
          <span>↔ Drag to explore</span>
          <button
            type="button"
            onClick={() => {
              pauseRef.current = !paused;
              setPaused(!paused);
            }}
            aria-pressed={paused}
          >
            {paused ? "Resume motion" : "Pause motion"}
          </button>
          <button type="button" onClick={() => resetRef.current?.()}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
