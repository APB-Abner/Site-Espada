import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import HoloMenu from "./HoloMenu.tsx";
import Sword from "./Sword.tsx";
import Door from "./Door.tsx";
import Portal from "./Portal.tsx";
import { Group } from "three";
import { useNavigate } from "react-router-dom";


export default function Scene() {
    const navigate = useNavigate();
    const swordRef = useRef<Group | null>(null);
    const [visible, setVisible] = useState<boolean>(true);
    const [portalActive, setPortalActive] = useState<boolean>(false); // Estado do portal


    // Efeito de pegar espada (Bifrost)
    const handleGrab = () => {
        console.log("Espada clicada!");
        alert("Eu não faria isso...");
        if (swordRef.current) {
            gsap.to(swordRef.current.position, { y: 5, duration: 1, ease: "power2.in" });
        }
        setVisible(false);
        // new Audio("/assets/warning.mp3").play(); // Áudio avisando "Eu não faria isso"

        setTimeout(() => {
            setVisible(true);
            if (swordRef.current) {
                gsap.to(swordRef.current.position, { y: 1.5, duration: 1, ease: "power2.out" });
            }
        }, 3000); // Espada reaparece após 3s
    };

    return (
        <div className="h-dvh">
            <Canvas >

                <ambientLight intensity={5} />
                <Sword onClick={handleGrab} />
                <Door />
                {visible && (
                    <group position={[0, 1, -10]}>
                        <HoloMenu
                            onStory={() => navigate("/story")} // Agora abre a história
                            onGrab={handleGrab}
                        />
                    </group>
                )}
                <Portal  />
            </Canvas>
        </div>
    );
}
