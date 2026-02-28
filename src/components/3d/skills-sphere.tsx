"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "Docker", "Kubernetes", "AWS", "Python", "React", "TypeScript",
  "Node.js", "Git", "Redis", "Kafka", "Linux", "GSAP",
  "Next.js", "PostgreSQL", "GraphQL", "Tailwind"
];

function SkillText({ text, position, color }: { text: string; position: [number, number, number]; color: string }) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </Float>
  );
}

function OrbitingSkills() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3;

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  const colors = [
    "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#3b82f6",
    "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#3b82f6",
    "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillText
          key={skill}
          text={skill}
          position={positions[index]}
          color={colors[index]}
        />
      ))}
    </group>
  );
}

function CenterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      <CenterSphere />
      <OrbitingSkills />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function SkillsSphere() {
  return (
    <div className="h-[500px] w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
