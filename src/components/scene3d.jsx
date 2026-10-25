import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { MeshDistortMaterial, Sphere, Float, Environment, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003;
      mesh.current.rotation.y += 0.005;
      mesh.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      mesh.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={mesh} args={[1.2, 180, 360]} scale={1.8}>
        <MeshDistortMaterial
          color="#06b6d4"
          distort={0.5}
          speed={2}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function RotatingTorus() {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.001;
      mesh.current.rotation.y -= 0.002;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusGeometry args={[2.5, 0.4, 64, 100]} />
      <meshStandardMaterial color="#a855f7" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function FloatingIcosahedron() {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.002;
      mesh.current.rotation.y += 0.003;
      mesh.current.position.z = Math.sin(state.clock.elapsedTime * 0.7) * 1;
    }
  });

  return (
    <mesh ref={mesh} position={[2.5, -1, 0]} scale={0.6}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial 
        color="#ff00ff" 
        metalness={0.9} 
        roughness={0.1}
        emissive="#ff00ff"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function ParticleRing() {
  const particles = useRef();
  const [positions] = useState(() => {
    const count = 100;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  });

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
      particles.current.rotation.z += 0.0005;
    }
  });

  return (
    <group ref={particles}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#06b6d4" sizeAttenuation transparent />
      </points>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          precision: 'highp',
          toneMappingExposure: 1.3
        }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#06b6d4" />
        <pointLight position={[-10, -10, 5]} intensity={1.2} color="#a855f7" />
        <pointLight position={[5, -5, 10]} intensity={1} color="#ff00ff" />
        
        {/* 3D Objects */}
        <AnimatedSphere />
        <RotatingTorus />
        <FloatingIcosahedron />
        <ParticleRing />
      </Canvas>
    </div>
  );
}