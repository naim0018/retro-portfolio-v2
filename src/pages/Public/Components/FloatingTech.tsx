import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
function TechOrb({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 2]} scale={2}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          radius={1}
        />
      </Icosahedron>
    </Float>
  );
}
export default function FloatingTech({ color = "#00ff88" }: { color?: string }) {
  return (
    <div className="w-full h-full min-h-80">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={color} />
        <TechOrb color={color} />
      </Canvas>
    </div>
  );
}
