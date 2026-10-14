import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

import JavaLogo from "./JavaLogo";
import useInView from "../../../hooks/useInView";

const GltfModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (modelPath.includes("three.js")) {
      scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });
    }
  }, [modelPath, scene]);

  return <primitive object={scene} />;
};

const TechIconCardExperience = ({ model }) => {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className="w-full h-full">
      <Canvas dpr={[1, 1.5]} frameloop={inView ? "always" : "never"}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          {/* Float animates the model bobbing and rotating in place */}
          <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <group scale={model.scale} rotation={model.rotation}>
              {model.component === "java" ? (
                <JavaLogo />
              ) : (
                <GltfModel modelPath={model.modelPath} />
              )}
            </group>
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default TechIconCardExperience;
