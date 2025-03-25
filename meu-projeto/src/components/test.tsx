import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Select } from "@react-three/postprocessing";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Bifrost from "/models/Bifrost.glb"
import Sword from "./Sword";

function BifrostEffect({ isReplacing }) {
    const bifrostRef = useRef();
    const { scene } = useGLTF(Bifrost);

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.transparent = true;
                    child.material.opacity = 1;
                    child.material.alphaTest = 0.5;
                    child.material.depthWrite = false;
                    child.material.emissive = new THREE.Color(1, 1, 1);
                    child.material.emissiveMap = child.material.map;
                    child.material.emissiveIntensity = 0.5;
                    child.material.toneMapped = false;
                }
            });
        }
    }, [scene]);

    useEffect(() => {
        if (bifrostRef.current) {
            if (isReplacing) {
                gsap.to(bifrostRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
            } else {
                gsap.to(bifrostRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
            }
        }
    }, [isReplacing]);

    return <primitive ref={bifrostRef} object={scene} position={[0, 1.5, 0]} scale={[0, 0, 0]} />;
}

export default function Scene() {
    const [visible, setVisible] = useState(true);
    const [isReplacing, setIsReplacing] = useState(false);
    const swordRef = useRef();

    const handleGrab = () => {
        console.log("Espada clicada!");
        alert("Eu não faria isso...");

        if (swordRef.current) {
            gsap.to(swordRef.current.position, { y: 5, duration: 1, ease: "power2.in" });
        }

        setTimeout(() => {
            setVisible(false);
            setIsReplacing(true);

            setTimeout(() => {
                setIsReplacing(false);
                setVisible(true);

                if (swordRef.current) {
                    gsap.to(swordRef.current.position, { y: 1.5, duration: 1, ease: "power2.out" });
                }
            }, 3000);
        }, 500);
    };

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={2} position={[5, 10, 5]} />
            {visible && <group ref={swordRef}><Sword onClick={handleGrab} /></group>}
            <EffectComposer>
                <Select enabled={true}>
                    <BifrostEffect isReplacing={true} />
                </Select>
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.1} intensity={1.5} />
            </EffectComposer>
        </Canvas>
    );
}
