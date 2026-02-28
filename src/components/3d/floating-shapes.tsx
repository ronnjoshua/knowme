"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiPython,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiGit,
  SiRedis,
  SiApachekafka,
  SiJavascript,
  SiNodedotjs,
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechIcon {
  Icon: IconType;
  color: string;
  name: string;
  position: [number, number, number];
  speed: number;
  floatIntensity: number;
}

const techIcons: TechIcon[] = [
  { Icon: SiDocker, color: "#2496ED", name: "Docker", position: [-4, 2, 0], speed: 1.5, floatIntensity: 1 },
  { Icon: SiKubernetes, color: "#326CE5", name: "Kubernetes", position: [4, 1.5, 0], speed: 1.8, floatIntensity: 1.2 },
  { Icon: SiAmazonwebservices, color: "#FF9900", name: "AWS", position: [-3, -1.5, 0], speed: 1.3, floatIntensity: 0.8 },
  { Icon: SiPython, color: "#3776AB", name: "Python", position: [3.5, -2, 0], speed: 1.6, floatIntensity: 1.1 },
  { Icon: SiReact, color: "#61DAFB", name: "React", position: [0, 3, 0], speed: 2, floatIntensity: 1.3 },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript", position: [-5, 0, 0], speed: 1.4, floatIntensity: 0.9 },
  { Icon: SiNextdotjs, color: "#ffffff", name: "Next.js", position: [5, -0.5, 0], speed: 1.7, floatIntensity: 1 },
  { Icon: SiGit, color: "#F05032", name: "Git", position: [-2, -3, 0], speed: 1.2, floatIntensity: 1.2 },
  { Icon: SiRedis, color: "#DC382D", name: "Redis", position: [2, 2.5, 0], speed: 1.9, floatIntensity: 0.8 },
  { Icon: SiApachekafka, color: "#231F20", name: "Kafka", position: [-4.5, -2.5, 0], speed: 1.5, floatIntensity: 1.1 },
  { Icon: SiJavascript, color: "#F7DF1E", name: "JavaScript", position: [4.5, 2.5, 0], speed: 1.6, floatIntensity: 1 },
  { Icon: SiNodedotjs, color: "#339933", name: "Node.js", position: [-1, 2, 0], speed: 1.4, floatIntensity: 1.2 },
];

function FloatingIcon({ icon }: { icon: TechIcon }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = icon.position[1] + Math.sin(state.clock.elapsedTime * icon.speed) * 0.3 * icon.floatIntensity;
      meshRef.current.position.x = icon.position[0] + Math.cos(state.clock.elapsedTime * icon.speed * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={icon.position}>
      <Html
        center
        distanceFactor={10}
        style={{ pointerEvents: 'none' }}
        zIndexRange={[0, 0]}
      >
        <div
          className="flex items-center justify-center p-3 rounded-xl bg-background/90 backdrop-blur-md border border-primary/30 shadow-lg"
          style={{
            boxShadow: `0 0 25px ${icon.color}50, 0 0 50px ${icon.color}20`,
          }}
        >
          <icon.Icon
            className="w-7 h-7 sm:w-8 sm:h-8"
            style={{ color: icon.color }}
          />
        </div>
      </Html>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      {techIcons.map((icon) => (
        <FloatingIcon key={icon.name} icon={icon} />
      ))}
      <Particles />
    </>
  );
}

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
