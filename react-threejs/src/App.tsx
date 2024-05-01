import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, Color, Vector3, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Object3DEventMap } from "three";

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
      <Canvas className="bg-[#101010]" style={{ height: "100vh" }}>
        <OrbitControls />
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
      <Point position={[0, 0, 0]} color="purple"/>
      <Point position={[1, 1, 1]} color="red"/>
      <Point position={[2, 2, 2]} color="green"/>
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
