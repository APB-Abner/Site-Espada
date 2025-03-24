import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import HoloMenu from "./HoloMenu";
import Sword from "./Sword";
import Door from "./Door";


export default function Scene() {
    const swordRef = useRef();
    
    const [visible, setVisible] = useState(true);

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
            {visible && (<Canvas>
                <ambientLight intensity={5} />

                    <Sword onClick={handleGrab} />
                    <Door />
                    <HoloMenu onAnalyze={() => console.log("Analisando...")}
                        onStory={() => console.log("Tocando história...")}
                    onGrab={handleGrab} />
                        </Canvas>
            )}
        </div>
    );
}
