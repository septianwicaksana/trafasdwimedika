import * as THREE from "three";
import { Suspense } from "react";
import { LayerMaterial, Depth, Noise } from "lamina";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import NF02 from "../components/NF02";

export default function Home() {
  return (
    <>
      <Overlay />
      <div style={{ height: "100vh", width: "100%" }}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
          <Bg />
          <Suspense fallback={null}>
            <NF02 />
            <Caption>{`HOLD ON.\nWE WORKING ON\nSOMETHING REVOLUTIONARY.`}</Caption>
            <Rig />
          </Suspense>
        </Canvas>
      </div>
      <img
        src="/LOGO_TDM-01.png"
        alt="An SVG of an Logo"
        style={{ position: "absolute", top: 45, right: 40, width: 30 }}
      />
    </>
  );
}

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    >
      <a
        href="https://pmnd.rs/"
        style={{ position: "absolute", bottom: 40, left: 40, fontSize: "13px" }}
      >
        trafas dwi medika
      </a>
      <div
        style={{ position: "absolute", top: 40, left: 40, fontSize: "13px" }}
      >
        -medtech
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          fontSize: "13px",
        }}
      >
        @2022
      </div>
    </div>
  );
}

function Caption({ children }) {
  const { width } = useThree((state) => state.viewport);
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      font="/ki-w05-medium.otf"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(
      v.set(state.mouse.x / 2, state.mouse.y / 2, 10),
      0.05
    );
  });
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth
          colorB="red"
          colorA="skyblue"
          alpha={1}
          mode="normal"
          near={130}
          far={200}
          origin={[100, 100, -100]}
        />
        <Noise
          mapping="local"
          type="white"
          scale={1000}
          colorA="white"
          colorB="black"
          mode="subtract"
          alpha={0.2}
        />
      </LayerMaterial>
    </mesh>
  );
}
