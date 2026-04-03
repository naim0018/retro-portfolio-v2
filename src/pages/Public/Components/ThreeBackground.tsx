import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Stars,
  MeshDistortMaterial,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
function Particles({ count = 200 }) {
  // Generate random positions once and memoize them
  // This ensures Math.random() is only called during initial mount, not on every render
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps array ensures this only runs once
  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = time * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ff88"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}
function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[4, 2, -5]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color="#00d4ff"
            speed={3}
            distort={0.4}
            radius={1}
          />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-5, -2, -8]}>
          <octahedronGeometry args={[1.5, 0]} />
          <MeshDistortMaterial
            color="#ff007a"
            speed={2}
            distort={0.3}
            radius={1}
          />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[0, -4, -10]}>
          <torusGeometry args={[2, 0.4, 16, 100]} />
          <MeshDistortMaterial
            color="#ff8c00"
            speed={4}
            distort={0.2}
            radius={1}
          />
        </mesh>
      </Float>
    </>
  );
}
export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-2 pointer-events-none opacity-40">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#ff007a"
        />
        <Particles count={300} />
        <FloatingShapes />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
