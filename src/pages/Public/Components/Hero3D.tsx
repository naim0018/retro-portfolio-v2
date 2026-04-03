import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#00ff88"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </Sphere>
    </Float>
  );
}
function CodeFloating() {
  return (
    <group>
      <Float speed={4} rotationIntensity={3}>
        <mesh position={[2, 2, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#00d4ff" />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={2}>
        <mesh position={[-2, 1, 1]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#ff007a" />
        </mesh>
      </Float>
      <Float speed={5} rotationIntensity={4}>
        <mesh position={[1, -2, -1]}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <meshStandardMaterial color="#ff8c00" />
        </mesh>
      </Float>
    </group>
  );
}
export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-100">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff007a" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} color="#00d4ff" />
        
        <AnimatedSphere />
        <CodeFloating />
      </Canvas>
    </div>
  );
}
