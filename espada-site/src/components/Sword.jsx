import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Sword({ onClick }) {
    const swordRef = useRef();
    const { scene } = useGLTF("/models/sword.glb");

    useFrame(() => {
        if (swordRef.current) {
            swordRef.current.rotation.y += 0.01; // Rotação suave
        }
    });

    return (
        <primitive
            ref={swordRef}
            object={scene}
            position={[0, 1.5, -15]}
            scale={[0.1, 0.1, 0.1]}
            onClick={onClick}
        />
    );
}
