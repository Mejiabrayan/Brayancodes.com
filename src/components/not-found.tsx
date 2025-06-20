import { useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  AsciiRenderer,
  Center,
  OrbitControls,
  Float,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import { Mesh } from "three";

type ASCIIProps = { text?: string };

function CustomText({ text = "404" }: ASCIIProps) {
  const ref = useRef<Mesh>(null!);
  const viewport = useThree((state) => state.viewport);

  return (
    <Center>
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[0, 0.5]}
      >
        <mesh ref={ref} scale={Math.min(viewport.width, viewport.height) / 5}>
          <Text
            font="/fonts/Tobias/Tobias-Italic.ttf"
            fontSize={1}
            letterSpacing={-0.05}
            textAlign="center"
          >
            {text}
            <meshStandardMaterial
              color="white"
              roughness={0.2}
              metalness={0.8}
            />
          </Text>
        </mesh>
      </Float>
    </Center>
  );
}

export default function ASCIIText({ text = "404 Page Not Found" }: ASCIIProps) {
  return (
    <div style={{ width: "100%", height: "70vh" }}>
      <Canvas shadows>
        <color attach="background" args={["black"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <pointLight position={[-10, -10, -10]} />
        <spotLight
          position={[23, 10, 10]}
          angle={0.15}
          penumbra={2}
          intensity={5}
        />
        <CustomText text={text} />
        <AsciiRenderer
          fgColor="white"
          bgColor="transparent"
          characters=" .:;=+*▲"
        />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
