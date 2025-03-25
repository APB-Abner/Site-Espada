import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useGLTF, useTexture } from "@react-three/drei";
import { ColorManagement, ACESFilmicToneMapping } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import HoloMenu from "./HoloMenu.jsx";
import Sword from "./Sword.jsx";
import Door from "./Door.jsx";
import Portal from "./Portal.jsx";
import Bifrost from "/models/Bifrost.glb";
import Emission from "../assets/Texture/Emission.png";
import Room from "./Room.jsx";


// Ativa um mapeamento de cores mais realista
ColorManagement.enabled = true;


function BifrostEffect({ isReplacing }) {
    const bifrostRef = useRef();
    const { scene } = useGLTF(Bifrost); // Carrega o modelo
    const emissiveTexture = useTexture(Emission); // Caminho da textura emissiva

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: child.material.map, // Mantém a textura original
                        emissiveMap: emissiveTexture, // Aplica a textura emissiva
                        emissive: new THREE.Color(0xffffff), // Define a cor da emissão
                        emissiveIntensity: 1.0, // Ajuste para o brilho desejado
                        metalness: 0.8,
                        roughness: 0.2,
                    });
                    emissiveTexture.flipY = false; // Evita problemas de UV invertido
                }
            });
        }
    }, [scene, emissiveTexture]);

    // Animação de entrada/saída do Bifrost
    useEffect(() => {
        if (isReplacing && bifrostRef.current) {
            gsap.to(bifrostRef.current.scale, { x: 2.5, y: 8, z: 2.5, duration: 0.5, ease: "power2.out" });
            gsap.to(bifrostRef.current.position, { x: 0, y: 9, z: -9, duration: 0.5, ease: "power2.out" });
        } else if (bifrostRef.current) {
            gsap.to(bifrostRef.current.scale, { x: 2.5, y: 0, z: 2.5, duration: 0.5, ease: "power2.in" });
            gsap.to(bifrostRef.current.position, { x: 0, y: 22, z: -9, duration: 0.5, ease: "power2.out" });
        }
    }, [isReplacing]);

    return (
        <primitive
            object={scene}
            ref={(ref) => (bifrostRef.current = ref)}
            rotation={[0, 0, 22]} // Inverte a direção do Bifrost
            position={[0, 22, -9]} // Ajuste para alinhar com a espada
            scale={[0, 0, 0]} // Começa invisível
        />
    );
}


export default function Scene() {
    const [visible, setVisible] = useState(true);
    const [isReplacing, setIsReplacing] = useState(false);
    const swordRef = useRef();
    const navigate = useNavigate();


    // Efeito de pegar espada (Bifrost)
    const handleGrab = () => {
        console.log("Espada clicada!");
        // alert("Eu não faria isso...");

        if (swordRef.current) {
            gsap.to(swordRef.current.position, { y: 5, duration: 3, ease: "power2.in" });
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
        <div className="h-dvh">
            <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>

                <ambientLight intensity={0.5} />
                <directionalLight intensity={2} position={[5, 10, 5]} />
                <directionalLight intensity={2} position={[-15, 10, 15]} />
                <directionalLight intensity={0.15} position={[15, 10, 15]} color= "orange"/>

                <group ref={swordRef}>
                    <Sword onClick={handleGrab} />
                </group>
                <Door />
                <Room />
                <EffectComposer>
                <BifrostEffect isReplacing={true} />
                <BifrostEffect isReplacing={isReplacing} />
                {visible && (
                    <group position={[0, 1, -10]}>
                        <HoloMenu
                            onStory={() => navigate("/story")} // Agora abre a história
                            onGrab={handleGrab}
                        />
                    </group>
                )}
                {/* <Portal  /> */}
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.1} intensity={1.5} />
            </EffectComposer>
            </Canvas>
        </div>
    );
}
