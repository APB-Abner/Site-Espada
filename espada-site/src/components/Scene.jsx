// import { useRef, useState } from "react";
// import { useGLTF } from "@react-three/drei";
// import { gsap } from "gsap";
// import HoloMenu from "./HoloMenu";
// import Portal from "./Portal";
// import Book from "./Book";
// import swordModel from "/models/sword.glb";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, CameraControls } from "@react-three/drei";

// export default function Scene() {
//     const swordRef = useRef();
//     const { scene } = useGLTF(swordModel);
//     const [visible, setVisible] = useState(true);
//     const [portalActive, setPortalActive] = useState(false);
//     const [bookVisible, setBookVisible] = useState(false);

//     // Efeito de pegar espada (Bifrost)
//     const handleGrab = () => {
//         console.log("Espada clicada!");
//         // alert("Eu não faria isso...");
//         if (swordRef.current) {
//         gsap.to(swordRef.current.position, { y: 5, duration: 1, ease: "power2.in" });
//         }
//         setVisible(false);
//         // new Audio("/assets/warning.mp3").play(); // Áudio avisando "Eu não faria isso"

//         setTimeout(() => {
//             setVisible(true);
//             if (swordRef.current) {
//             gsap.to(swordRef.current.position, { y: 1.5, duration: 1, ease: "power2.out" });
//             }
//         }, 3000); // Espada reaparece após 3s
//     };

//     // Abrir portal e mostrar livro
//     const handleStory = () => {
//         setPortalActive(true);
//         setTimeout(() => {
//             setBookVisible(true);
//         }, 2000);
//     };

//     return (
//         <Canvas>
//             <CameraControls/>
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[5, 10, 5]} intensity={1} />

//             {portalActive && <Portal active={portalActive} />}
//             {bookVisible && <Book visible={bookVisible} />}

//             {visible && (
//                 <primitive ref={swordRef} object={scene} position={[0, 1.5, 0]} scale={[0.1, 0.1, 0.1]} onClick={handleGrab} />
//             )}
//             <HoloMenu onAnalyze={() => console.log("Analisando...")} onStory={handleStory} onGrab={handleGrab} />

//         </Canvas>

//     );
// }


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
          <Canvas>
                <ambientLight intensity={5} />
                <Sword onClick={handleGrab} />
                <Door />
            {visible && (
                    <group position={[0, 1, -10]}>
                        <HoloMenu onAnalyze={() => console.log("Analisando...")}
                            onStory={() => console.log("Tocando história...")}
                            onGrab={handleGrab} />
                    </group>
            )}
            </Canvas>
        </div>
    );
}
