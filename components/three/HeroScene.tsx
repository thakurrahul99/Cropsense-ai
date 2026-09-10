"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createElement,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type MousePos = { x: number; y: number };

// ------------------------------------------------------------------
// Repulsion constants
// ------------------------------------------------------------------
const REPULSION_RADIUS = 1.4; // world-space radius around cursor
const REPULSION_STRENGTH = 0.06; // push force per frame
const RETURN_STRENGTH = 0.02; // spring-back force per frame

function ParticleField({ mousePos }: { mousePos: MousePos }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesGroup = useMemo(() => new THREE.Group(), []);

  // Store mutable particle velocity + target positions for repulsion
  const velRef = useRef<Float32Array | null>(null);
  const origPosRef = useRef<Float32Array | null>(null);

  const positions = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 80 : 180;
    const pos = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    // Velocity buffer (zero-init)
    velRef.current = new Float32Array(count * 3);
    // Original positions for spring-back
    origPosRef.current = new Float32Array(pos);

    // Build connection lines
    const mat = new THREE.LineBasicMaterial({
      color: "#00E5A0",
      transparent: true,
      opacity: 0.08,
    });
    let lineCount = 0;
    for (let i = 0; i < pts.length && lineCount < 100; i++) {
      for (let j = i + 1; j < pts.length && lineCount < 100; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.2) {
          const geom = new THREE.BufferGeometry();
          const linePos = new Float32Array([
            pts[i].x, pts[i].y, pts[i].z,
            pts[j].x, pts[j].y, pts[j].z,
          ]);
          geom.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
          linesGroup.add(new THREE.Line(geom, mat));
          lineCount++;
        }
      }
    }
    return pos;
  }, [linesGroup]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const rotY = t * 0.04 + mousePos.x * 0.15;
    const rotX = Math.sin(t * 0.02) * 0.1 + mousePos.y * 0.08;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = rotY;
      pointsRef.current.rotation.x = rotX;
    }
    linesGroup.rotation.y = rotY;
    linesGroup.rotation.x = rotX;

    // ── Repulsion ──
    const pts = pointsRef.current;
    const vel = velRef.current;
    const orig = origPosRef.current;
    if (!pts || !vel || !orig) return;

    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const count = pos.count;

    // Map mouse NDC (-1..1) to rough world-space on z=0 plane
    const aspect = state.size.width / state.size.height;
    const fovRad = (60 * Math.PI) / 180;
    const halfH = Math.tan(fovRad / 2) * 5; // camera z=5
    const mwx = mousePos.x * halfH * aspect;
    const mwy = mousePos.y * halfH;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const px = pos.getX(i);
      const py = pos.getY(i);

      const dx = px - mwx;
      const dy = py - mwy;
      const distSq = dx * dx + dy * dy;

      if (distSq < REPULSION_RADIUS * REPULSION_RADIUS && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS * REPULSION_STRENGTH;
        vel[ix] += (dx / dist) * force;
        vel[ix + 1] += (dy / dist) * force;
      }

      // Spring back to original position
      vel[ix] += (orig[ix] - px) * RETURN_STRENGTH;
      vel[ix + 1] += (orig[ix + 1] - py) * RETURN_STRENGTH;

      // Dampen velocity
      vel[ix] *= 0.88;
      vel[ix + 1] *= 0.88;

      // Apply velocity
      pos.setX(i, px + vel[ix]);
      pos.setY(i, py + vel[ix + 1]);
    }
    pos.needsUpdate = true;
  });

  return (
    <>
      <Points
        ref={pointsRef}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00E5A0"
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
      {createElement("primitive", { object: linesGroup })}
    </>
  );
}

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(0, 229, 160, 0.08) 0%, transparent 70%)",
      }}
    />
  );
}

interface HeroSceneProps {
  /** Optional external MotionValue<number> from parent's useScroll to drive fade-out */
  scrollYProgress?: MotionValue<number>;
}

export function HeroScene({ scrollYProgress }: HeroSceneProps) {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  // If no external progress value is provided, create a local one that stays at 0
  const { scrollYProgress: localScroll } = useScroll();
  const progress = scrollYProgress ?? localScroll;

  // Fade from fully visible → transparent over the first 35% of scroll
  const canvasOpacity = useTransform(progress, [0, 0.35], [0.9, 0]);
  // Slight upward parallax as user scrolls
  const canvasY = useTransform(progress, [0, 0.5], ["0%", "-12%"]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    try {
      const canvas = document.createElement("canvas");
      const ctx =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!ctx) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (!mounted || reducedMotion || !webglSupported) {
    return <StaticFallback />;
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: canvasOpacity, y: canvasY }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ParticleField mousePos={mousePos} />
      </Canvas>
    </motion.div>
  );
}
