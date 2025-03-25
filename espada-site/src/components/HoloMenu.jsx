import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { gsap } from "gsap";

// Função para criar o botão
function MenuButton({ label, onClick, position, hoverEffect }) {
    return (
        <mesh position={position} onClick={onClick}>
            <planeGeometry args={[2.5, 0.8]} />
            <meshStandardMaterial
                color={hoverEffect ? "cyan" : "#0e0e0e"}
                opacity={0.5}
                transparent={true}
                roughness={0.6}
                metalness={0.4}
            />
            <Text
                position={[0, 0, 0.1]}
                fontSize={0.25}
                color="white"
                anchorX="center"
                anchorY="middle"
                className="orbitron-text"
            >
                {label}
            </Text>
        </mesh>
    );
}

export default function HoloMenu({ camera }) {
    const [active, setActive] = useState(null);
    const [hover, setHover] = useState(null);
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            console.log("HoloMenu está montado e a referência está disponível");
        }
    }, []);

    useFrame(() => {
        if (ref.current && camera) {
            ref.current.position.set(
                camera.position.x,
                camera.position.y + 1.5, // Altura ajustada
                camera.position.z - 5 // Distância da câmera
            );
        }
    });

    // Funções para interagir com os botões
    const handleAnalyze = () => {
        setActive("Analisando...");
        console.log("Analisando...");
        gsap.to(ref.current.position, { y: 2, duration: 1, ease: "bounce.out" });
    };

    const handleStory = () => {
        setActive("Contando história...");
        console.log("Contando história...");
    };

    const handleGrab = () => {
        setActive("Espada pega!");
        console.log("Você pegou a espada!");
    };

    return (
        <group ref={ref}>
            {/* Fundo do Menu */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[6, 3]} />
                <meshStandardMaterial
                    color="#0e0e0e"
                    opacity={0.6}
                    transparent={true}
                    roughness={0.4}
                    metalness={0.6}
                    emissive="#00FFFF"
                />
            </mesh>

            {/* Botões com interatividade */}
            <MenuButton
                label="🔍 Analisar Espada"
                onClick={handleAnalyze}
                position={[-2, 0.5, 0]}
                hoverEffect={hover === "analyze"}
            />
            <MenuButton
                label="📖 Ouvir História"
                onClick={handleStory}
                position={[0, 0.5, 0]}
                hoverEffect={hover === "story"}
            />
            <MenuButton
                label="⚡ Pegar Espada"
                onClick={handleGrab}
                position={[2, 0.5, 0]}
                hoverEffect={hover === "grab"}
            />

            {/* Texto de Status como um elemento 3D */}
            {active && (
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.4}
                    color="#fff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {active}
                </Text>
            )}
        </group>
    );
}
