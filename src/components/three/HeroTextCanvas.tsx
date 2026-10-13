"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Lightformer, Text3D } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  text: string;
  active: boolean;
  onReady: () => void;
}

function TextRig({ text, onReady }: { text: string; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const size = useThree((s) => s.size);
  const [fit, setFit] = useState(0);

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
    const t = clock.getElapsedTime();
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.32 + Math.sin(t * 0.6) * 0.04, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.16, 0.06);
  });

  return (
    <group ref={group} scale={fit || 1} visible={fit > 0}>
      <Center
        onCentered={({ width, height }) => {
          // Fit the text inside the canvas with a little breathing room
          const next = Math.min((size.width * 0.94) / width, (size.height * 0.78) / height);
          setFit(next);
          requestAnimationFrame(onReady);
        }}
      >
        <Text3D
          font="/fonts/sora-800.typeface.json"
          size={1}
          height={0.3}
          curveSegments={10}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelSegments={5}
          letterSpacing={0.005}
        >
          {text}
          <meshPhysicalMaterial
            color="#a9dcff"
            metalness={0.6}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.5}
            emissive="#0b3a66"
            emissiveIntensity={0.35}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export default function HeroTextCanvas({ text, active, onReady }: Props) {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 500 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 10]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-6, -3, 12]} intensity={900} color="#7C5CFF" distance={80} />
      <pointLight position={[6, 2, 12]} intensity={900} color="#06B6D4" distance={80} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 6]} scale={[10, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.8} position={[-5, 0, 3]} scale={[2, 6, 1]} color="#7C5CFF" />
        <Lightformer form="rect" intensity={1.8} position={[5, 0, 3]} scale={[2, 6, 1]} color="#06B6D4" />
      </Environment>
      <Suspense fallback={null}>
        <TextRig text={text} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
