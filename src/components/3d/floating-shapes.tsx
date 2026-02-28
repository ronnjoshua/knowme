"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({ position, color, speed = 1, distort = 0.3 }: { position: [number, number, number]; color: string; speed?: number; distort?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={0.8}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedBox({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={0.6}>
        <MeshWobbleMaterial
          color={color}
          attach="material"
          factor={0.4}
          speed={2}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
    </Float>
  );
}

function AnimatedTorus({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <Torus ref={meshRef} args={[0.6, 0.25, 32, 64]} position={position} scale={0.7}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
}

function AnimatedIcosahedron({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4 * speed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={2} floatIntensity={1.8}>
      <Icosahedron ref={meshRef} args={[0.8, 1]} position={position} scale={0.5}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Icosahedron>
    </Float>
  );
}

function Particles({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#06b6d4" />

      <AnimatedSphere position={[-3, 1.5, -2]} color="#8b5cf6" speed={0.8} distort={0.4} />
      <AnimatedBox position={[3.5, -1, -1]} color="#06b6d4" speed={1.2} />
      <AnimatedTorus position={[-2.5, -2, -3]} color="#f59e0b" speed={0.6} />
      <AnimatedIcosahedron position={[2.5, 2, -2]} color="#10b981" speed={1} />
      <AnimatedSphere position={[0, -2.5, -4]} color="#ec4899" speed={0.5} distort={0.5} />
      <AnimatedBox position={[-4, 0, -3]} color="#3b82f6" speed={0.9} />

      <Particles count={150} />
    </>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
