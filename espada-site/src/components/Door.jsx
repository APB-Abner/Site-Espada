import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

export default function Door() {
    const leftDoor = useRef();
    const rightDoor = useRef();
    const lightRef1 = useRef();
    const lightRef2 = useRef();
    const { camera } = useThree();
    const controlsRef = useRef();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [controlsEnabled, setControlsEnabled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / maxScroll;
            setScrollProgress(progress);

            // Ativar controles orbitais no final do scroll
            if (progress >= 1) {
                console.log("Scroll finalizado!");
                setControlsEnabled(true);
            } else {
                setControlsEnabled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame(() => {
        const maxOpen = 6; // Distância máxima que a porta abre
        const maxMove = 15; // Distância máxima que a câmera avança
        const openAmount = maxOpen * scrollProgress;
        let moveAmount = maxMove * scrollProgress;

        if (moveAmount > maxMove - 0.1) moveAmount = maxMove - 0.1;

        // Atualizar a posição da câmera apenas enquanto o scroll estiver ativo
        if (!controlsEnabled) {
            camera.position.z = 15 - moveAmount;
            camera.rotation.set(0, 0, 0); // Resetar rotação para evitar bugs
        }

        // Abrir/fechar portas conforme o scroll
        if (leftDoor.current && rightDoor.current) {
            leftDoor.current.position.x = -3 - openAmount;
            rightDoor.current.position.x = 3 + openAmount;
        }

        // Luz piscante
        const intensity = (Math.sin(performance.now() * 0.005) + 1) / 2 * 2;
        if (lightRef1.current && lightRef2.current) {
            lightRef1.current.intensity = intensity;
            lightRef2.current.intensity = intensity;
        }
    });

    return (
        <>
            {/* Porta esquerda */}
            <mesh ref={leftDoor} position={[-3, 0, 10]}>
                <boxGeometry args={[6, 8, 0.4]} />
                <meshStandardMaterial map={new TextureLoader().load("/textures/doorTexture.jpg")} metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Porta direita */}
            <mesh ref={rightDoor} position={[3, 0, 10]}>
                <boxGeometry args={[6, 8, 0.4]} />
                <meshStandardMaterial map={new TextureLoader().load("/textures/doorTexture.jpg")} metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Luzes laterais piscantes */}
            <pointLight ref={lightRef1} position={[-3.5, 4, 11]} intensity={5} color="cyan" />
            <pointLight ref={lightRef2} position={[3.5, 4, 11]} intensity={5} color="cyan" />

            {/* Controles orbitais (ativados no final do scroll) */}
            <OrbitControls
                ref={controlsRef}
                enabled={controlsEnabled}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4} // Evita virar a câmera completamente
                maxPolarAngle={Math.PI / 2} // Impede de virar de ponta-cabeça
                dampingFactor={controlsEnabled ? 0.05 : 0} // Suaviza movimento quando ativo
            />
        </>
    );
}
