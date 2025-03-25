import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Select } from "@react-three/postprocessing";
import Portal from "./HoloMenu.jsx";


export default function Scene() {
    
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            {/* <directionalLight intensity={2} position={[5, 10, 5]} />
            <EffectComposer>
            </EffectComposer>
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.1} intensity={1.5} /> */}
                <Portal />

        </Canvas>
    );
}
