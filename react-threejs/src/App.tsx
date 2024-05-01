import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, Color, Vector3, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Object3DEventMap } from "three";
import { pointsInner } from "./utils/utils";

// function App() {
//   return (
//     <Canvas>
//       <ambientLight intensity={Math.PI / 2} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//       <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//       <Box position={[-1.2, 0, 0]} />
//       <Box position={[1.2, 0, 0]} />
//     </Canvas>
//   );
// }

function App() {
  return (
    <div className="relative">
      <Canvas camera={{ position: [10, -7.5, -5] }} className="bg-[#101010]" style={{ height: "100vh" }}>
        <OrbitControls maxDistance={20} minDistance={10}/>
        <directionalLight />
        <pointLight position={[-10, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
    </div>
  );
}

const PointCircle = () => {
  const ref = useRef<Group<Object3DEventMap>>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map(point => <Point key={point.idx} position={point.position} color={point.color} />)}
    </group>
  );
};

const Point = ({ position, color }: { position: Vector3; color: Color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
      />
    </Sphere>
  );
};

export default App;
