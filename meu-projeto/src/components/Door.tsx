import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Texture } from "@react-three/drei";
import TextureDoor from "../assets/door.jpg"
import * as THREE from "three";

export default function Door() {
    const leftDoor = useRef<THREE.Mesh>(null);
    const rightDoor = useRef<THREE.Mesh>(null);
    const lightRef1 = useRef<THREE.PointLight>(null);
    const lightRef2 = useRef<THREE.PointLight>(null);
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [controlsEnabled, setControlsEnabled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / maxScroll;
            setScrollProgress(progress);

            setControlsEnabled(progress >= 1);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame(() => {
        const maxOpen = 6;
        const maxMove = 15;
        const openAmount = maxOpen * scrollProgress;
        let moveAmount = maxMove * scrollProgress;

        if (moveAmount > maxMove - 0.1) moveAmount = maxMove - 0.1;

        if (!controlsEnabled) {
            camera.position.z = 15 - moveAmount;
            camera.rotation.set(0, 0, 0);
        }

        if (leftDoor.current && rightDoor.current) {
            leftDoor.current.position.x = -3 - openAmount;
            rightDoor.current.position.x = 3 + openAmount;
        }

        const intensity = ((Math.sin(performance.now() * 0.005) + 1) / 2) * 2;
        if (lightRef1.current && lightRef2.current) {
            lightRef1.current.intensity = intensity;
            lightRef2.current.intensity = intensity;
        }
    });

    const texture = new THREE.TextureLoader().load(TextureDoor);

    return (
        <>
            <mesh ref={leftDoor} position={[-3, 0, 10]}>
                <boxGeometry args={[6, 8, 0.4]} />
                <meshStandardMaterial map={texture} metalness={0.9} roughness={0.2} />
            </mesh>

            <mesh ref={rightDoor} position={[3, 0, 10]}>
                <boxGeometry args={[6, 8, 0.4]} />
                <meshStandardMaterial map={texture} metalness={0.9} roughness={0.2} />
            </mesh>

            <pointLight ref={lightRef1} position={[-3.5, 4, 11]} intensity={5} color="cyan" />
            <pointLight ref={lightRef2} position={[3.5, 4, 11]} intensity={5} color="cyan" />

            <OrbitControls
                ref={controlsRef}
                enabled={controlsEnabled}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                dampingFactor={controlsEnabled ? 0.05 : 0}
            />
        </>
    );
}
