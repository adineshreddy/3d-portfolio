import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

// Extrudes the flat Java SVG into a 3D logo so it matches the .glb icons
const JavaLogo = () => {
  const { paths } = useLoader(SVGLoader, "/images/logos/java.svg");

  const meshes = useMemo(
    () =>
      paths.flatMap((path, i) => {
        const material = new THREE.MeshStandardMaterial({
          color: path.color,
          metalness: 0.2,
          roughness: 0.4,
        });

        return SVGLoader.createShapes(path).map((shape, j) => ({
          key: `${i}-${j}`,
          material,
          geometry: new THREE.ExtrudeGeometry(shape, {
            depth: 6,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.5,
            bevelSegments: 3,
          }),
        }));
      }),
    [paths]
  );

  // SVG space is 128x128 with y pointing down: center it and flip y
  return (
    <group scale={[1, -1, 1]} position={[0, 0, 0]}>
      <group position={[-64, -64, -3]}>
        {meshes.map(({ key, geometry, material }) => (
          <mesh key={key} geometry={geometry} material={material} />
        ))}
      </group>
    </group>
  );
};

export default JavaLogo;
