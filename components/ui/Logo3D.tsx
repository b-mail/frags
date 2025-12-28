"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import {
  Environment,
  Float,
  Html,
  useProgress,
  ContactShadows,
  PerspectiveCamera,
  Decal,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="text-sm font-bold text-slate-500">
        {progress.toFixed(0)}%
      </span>
    </Html>
  );
}

function LogoMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "/logo.png");

  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (meshRef.current) {
      const targetRotationX = -state.mouse.y * 0.4;
      const targetRotationY = state.mouse.x * 0.4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1,
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1,
      );
    }
  });

  const width = 2.5;
  const height = 2.5;
  const depth = 0.4;
  const radius = 0.5;

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 4,
    }),
    [depth],
  );

  const decalScale = 2.3;

  const decalMaterialProps = {
    map: texture,
    polygonOffset: true,
    polygonOffsetFactor: -10,
    transparent: true,
    depthWrite: false,
    roughness: 0.3,
    metalness: 0.15,
    envMapIntensity: 2, // 반사 강도 조정
    side: THREE.FrontSide,
  };

  const zOffset = (depth + 0.1) / 2;

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <extrudeGeometry
          args={[shape, extrudeSettings]}
          onUpdate={(geo) => geo.center()}
        />
        <meshStandardMaterial
          color="#334155"
          roughness={0.4}
          metalness={0.3}
          envMapIntensity={2}
        />

        {/* Front Face */}
        <Decal
          position={[0, 0, zOffset]}
          rotation={[0, 0, 0]}
          scale={[decalScale, decalScale, 0.2]}
        >
          <meshStandardMaterial {...decalMaterialProps} />
        </Decal>

        {/* Back Face */}
        <Decal
          position={[0, 0, -zOffset]}
          rotation={[0, Math.PI, 0]}
          scale={[decalScale, decalScale, 0.2]}
        >
          <meshStandardMaterial {...decalMaterialProps} />
        </Decal>
      </mesh>
    </Float>
  );
}

export default function Logo3D() {
  return (
    <div className="h-48 w-full md:h-[300px]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={50} />

        <ambientLight intensity={0.5} />

        <spotLight
          position={[5, 8, 8]}
          angle={0.25}
          penumbra={0.8}
          intensity={3}
          color="#ffffff"
        />

        <pointLight position={[-5, -3, 5]} intensity={2} color="#4ade80" />

        <Suspense fallback={<Loader />}>
          <LogoMesh />

          {/* Shadow from behind */}
          <ContactShadows
            position={[0, 0, -2.5]}
            blur={2.5}
            far={8}
            scale={8}
            opacity={0.4}
          />

          {/* 추상적인 환경 조명 구성 */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer
                form="rect"
                intensity={10}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={[10, 5, 1]}
              />
              <Lightformer
                form="circle"
                intensity={5}
                position={[0, 2, -10]}
                scale={[10, 10, 1]}
              />
              <Lightformer
                form="rect"
                intensity={5}
                rotation-y={Math.PI / 2}
                position={[-5, 2, -1]}
                scale={[20, 2, 1]}
              />
              <Lightformer
                form="rect"
                intensity={5}
                rotation-y={-Math.PI / 2}
                position={[10, 2, -1]}
                scale={[20, 2, 1]}
              />
            </group>
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
