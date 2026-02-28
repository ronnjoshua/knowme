"use client";

import { useRef, useMemo } from "react";
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
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechIcon {
  Icon: IconType;
  color: string;
  name: string;
}

const techIcons: TechIcon[] = [
  { Icon: SiDocker, color: "#2496ED", name: "Docker" },
  { Icon: SiKubernetes, color: "#326CE5", name: "Kubernetes" },
  { Icon: SiAmazonwebservices, color: "#FF9900", name: "AWS" },
  { Icon: SiPython, color: "#3776AB", name: "Python" },
  { Icon: SiReact, color: "#61DAFB", name: "React" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: SiNextdotjs, color: "#ffffff", name: "Next.js" },
  { Icon: SiGit, color: "#F05032", name: "Git" },
  { Icon: SiRedis, color: "#DC382D", name: "Redis" },
  { Icon: SiApachekafka, color: "#231F20", name: "Kafka" },
  { Icon: SiJavascript, color: "#F7DF1E", name: "JavaScript" },
  { Icon: SiNodedotjs, color: "#339933", name: "Node.js" },
  { Icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind" },
  { Icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL" },
];

function FloatingIcon({
  icon,
  position,
  speed = 1,
  rotationSpeed = 1,
  floatIntensity = 1
}: {
  icon: TechIcon;
  position: [number, number, number];
  speed?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const initialRotation = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = initialRotation + state.clock.elapsedTime * 0.3 * rotationSpeed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.5}
      floatIntensity={floatIntensity * 2}
    >
      <group ref={groupRef} position={position}>
        <Html
          transform
          distanceFactor={8}
          style={{
            transition: 'all 0.3s',
            pointerEvents: 'none',
          }}
        >
          <div
            className="flex items-center justify-center p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              boxShadow: `0 0 20px ${icon.color}40`,
            }}
          >
            <icon.Icon
              className="w-8 h-8 sm:w-10 sm:h-10"
              style={{ color: icon.color }}
            />
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Particles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        size={0.04}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  // Distribute icons in a spherical pattern
  const iconPositions: [number, number, number][] = useMemo(() => [
    [-4, 2, -2],
    [4, 1.5, -1],
    [-3, -1.5, -3],
    [3.5, -2, -2],
    [0, 3, -4],
    [-5, 0, -2],
    [5, -0.5, -3],
    [-2, -3, -2],
    [2, 2.5, -3],
    [-4.5, -2.5, -1],
    [4.5, 2.5, -2],
    [-1, -2, -4],
    [1, 1, -5],
    [3, -3, -1],
  ], []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

      {techIcons.map((icon, index) => (
        <FloatingIcon
          key={icon.name}
          icon={icon}
          position={iconPositions[index]}
          speed={0.8 + Math.random() * 0.4}
          rotationSpeed={0.5 + Math.random() * 0.5}
          floatIntensity={0.8 + Math.random() * 0.4}
        />
      ))}

      <Particles count={100} />
    </>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
