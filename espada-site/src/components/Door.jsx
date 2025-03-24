import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Door() {
    const leftDoor = useRef();
    const rightDoor = useRef();
    const lightRef1 = useRef();
    const lightRef2 = useRef();
    const { camera } = useThree();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / maxScroll; // Valor entre 0 e 1
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame(() => {
        const maxOpen = 6; // Distância máxima da abertura
        const openAmount = maxOpen * scrollProgress; // Controla abertura com base no scroll

        if (leftDoor.current && rightDoor.current) {
            leftDoor.current.position.x = -3 - openAmount;
            rightDoor.current.position.x = 3 + openAmount;
        }

        // Efeito de piscar luzes laterais
        const intensity = (Math.sin(performance.now() * 0.005) + 1) / 2 * 2;
        if (lightRef1.current && lightRef2.current) {
            lightRef1.current.intensity = intensity;
            lightRef2.current.intensity = intensity;
        }
    });

    return (
        <>
            {/* Porta esquerda */}
            <mesh ref={leftDoor} position={[-3, 0, 0]}>
                <boxGeometry args={[6, 8, 0.4]} />
                <meshStandardMaterial
                    map={new TextureLoader().load("/textures/doorTexture.jpg")}
                    metalness={0.9} roughness={0.2}
                />
            </mesh>

            {/* Porta direita */}
            <mesh ref={rightDoor} position={[3, 0, 0]}>
                <boxGeometry args={[6, 8, 0.4]} />
                <meshStandardMaterial
                    map={new TextureLoader().load("/textures/doorTexture.jpg")}
                    metalness={0.9} roughness={0.2}
                />
            </mesh>

            {/* Luzes laterais piscantes */}
            <pointLight ref={lightRef1} position={[-3.5, 4, 1]} intensity={5} color="cyan" />
            <pointLight ref={lightRef2} position={[3.5, 4, 1]} intensity={5} color="cyan" />
        </>
    );
}
