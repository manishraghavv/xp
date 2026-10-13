"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { SCENE_COLORS } from "@/lib/motion";

export interface HeroSceneProps {
  variant: "home" | "migration" | "calm";
  tier: "full" | "lite";
  active: boolean;
}

/** Small deterministic PRNG so the layout is identical between renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface NodeData {
  p: THREE.Vector3;
  s: number;
  phase: number;
}

function buildNodes(count: number, seed: number): NodeData[] {
  const rnd = mulberry32(seed);
  const nodes: NodeData[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      p: new THREE.Vector3((rnd() - 0.5) * 20, (rnd() - 0.5) * 9, -rnd() * 9 + 1),
      s: 0.28 + rnd() * 0.55,
      phase: rnd() * Math.PI * 2,
    });
  }
  return nodes;
}

function Network({ variant, count }: { variant: HeroSceneProps["variant"]; count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const nodes = useMemo(() => buildNodes(count, variant === "migration" ? 7 : 21), [count, variant]);

  const linePositions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].p.distanceTo(nodes[j].p) < 4.2) {
          pts.push(nodes[i].p.x, nodes[i].p.y, nodes[i].p.z, nodes[j].p.x, nodes[j].p.y, nodes[j].p.z);
        }
      }
    }
    return new Float32Array(pts);
  }, [nodes]);

  // Per-instance colour: migration goes legacy amber (left) to S/4HANA cyan/violet (right)
  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const c = new THREE.Color();
    nodes.forEach((n, i) => {
      if (variant === "migration") {
        const t = THREE.MathUtils.clamp((n.p.x + 10) / 20, 0, 1);
        c.set(SCENE_COLORS.amber).lerp(new THREE.Color(SCENE_COLORS.cyan), t);
        if (t > 0.6) c.lerp(new THREE.Color(SCENE_COLORS.violet), (t - 0.6) * 0.8);
      } else {
        const pick = i % 3;
        c.set(pick === 0 ? SCENE_COLORS.blue : pick === 1 ? SCENE_COLORS.violet : SCENE_COLORS.cyan);
      }
      m.setColorAt(i, c);
    });
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [nodes, variant]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    nodes.forEach((n, i) => {
      dummy.position.copy(n.p);
      dummy.position.y += Math.sin(t * 0.5 + n.phase) * 0.12;
      dummy.rotation.set(t * 0.08 + n.phase, t * 0.11 + n.phase, 0);
      const s = n.s * (1 + Math.sin(t * 0.8 + n.phase) * 0.06);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, nodes.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          roughness={0.12}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.62}
          emissive="#3B82F6"
          emissiveIntensity={0.16}
          envMapIntensity={1.3}
        />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5aa8ff" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const rnd = mulberry32(99);
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rnd() - 0.5) * 26;
      a[i * 3 + 1] = (rnd() - 0.5) * 14;
      a[i * 3 + 2] = -rnd() * 12 + 2;
    }
    return a;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9ad7ff" size={0.035} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

/** Pointer + scroll driven parallax rig around the whole scene. */
function Rig({ children, calm }: { children: React.ReactNode; calm: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const k = calm ? 0.4 : 1;
    const t = clock.getElapsedTime();
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.22 * k + Math.sin(t * 0.07) * 0.08, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.1 * k, 0.04);
    g.position.y = THREE.MathUtils.lerp(g.position.y, window.scrollY * 0.0018, 0.06);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ variant, tier, active }: HeroSceneProps) {
  const full = tier === "full";
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: full, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 6]} intensity={1.6} color="#bcd7ff" />
      <pointLight position={[-8, -2, 3]} intensity={30} color={SCENE_COLORS.violet} distance={24} />
      <pointLight position={[8, 3, 2]} intensity={26} color={SCENE_COLORS.cyan} distance={24} />
      {/* Procedural studio lighting: no network request for an HDR file */}
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, -6]} scale={[14, 3, 1]} color="#9cc4ff" />
        <Lightformer form="rect" intensity={1.6} position={[-6, 0, 2]} scale={[2, 8, 1]} color="#7C5CFF" />
        <Lightformer form="rect" intensity={1.6} position={[6, 0, 2]} scale={[2, 8, 1]} color="#06B6D4" />
      </Environment>
      <Rig calm={variant === "calm"}>
        <Network variant={variant} count={full ? 38 : 16} />
        <Particles count={full ? 220 : 70} />
      </Rig>
      {full && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.55} luminanceThreshold={0.62} luminanceSmoothing={0.3} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
