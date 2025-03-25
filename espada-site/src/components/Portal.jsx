import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Portal({ active }) {
    const portalRef = useRef();

    useFrame(({ clock }) => {
        if (portalRef.current) {
            portalRef.current.scale.set(1 + Math.sin(clock.elapsedTime) * 0.1, 1, 1);
            portalRef.current.rotation.y += 0.02;
        }
    });

    if (!active) return null;

    return (
        <mesh ref={portalRef} position={[0, 1.5, -2]}>
            <torusGeometry args={[1.5, 0.3, 16, 100]} />
            <meshStandardMaterial color="purple" emissive="blue" emissiveIntensity={2} />
        </mesh>
    );
}
