import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";

export default function Portal({ active }) {
    const portalRef = useRef();

    useFrame(({ clock }) => {
        if (portalRef.current) {
            portalRef.current.rotation.y = clock.elapsedTime * 0.5;
        }
    });

    if (!active) return null;

    return (
        <mesh ref={portalRef} position={[0, 1.5, -2]}>
            <torusGeometry args={[1.5, 0.3, 16, 100]} />
            <MeshStandardMaterial color="purple" emissive="blue" emissiveIntensity={1} />
        </mesh>
    );
}
