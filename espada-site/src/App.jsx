import React from "react";
import Door from "./components/Door";
import Scene from "./components/Scene";
import { Canvas } from "@react-three/fiber";



function App() {
  // const [cameraPosition, setCameraPosition] = useState({ z: 5 });

  return (
    <>
      <Canvas className="" camera={{ position: [0, 2, 10], fov: 50 }}>
        {/* <Door setCameraPosition={setCameraPosition} /> */}
        <Scene />
        {/* <Door />  */}
      </Canvas>
    </>
  );
}

export default App;
