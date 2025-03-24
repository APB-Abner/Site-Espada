import { useState } from "react";
import { Html } from "@react-three/drei";

export default function HoloMenu({ onAnalyze, onStory, onGrab }) {
    const [visible, setVisible] = useState(false);

    return (
        <Html position={[0, 2, 0]} center>
            <div
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{
                    display: visible ? "block" : "none",
                    background: "rgba(0, 255, 255, 0.2)",
                    padding: "10px",
                    borderRadius: "10px",
                    backdropFilter: "blur(5px)",
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Orbitron, sans-serif",
                    boxShadow: "0 0 10px cyan",
                }}
            >
                <p onClick={onAnalyze} style={{ cursor: "pointer" }}>🔍 Analisar Espada</p>
                <p onClick={onStory} style={{ cursor: "pointer" }}>📖 Ouvir História</p>
                <p onClick={onGrab} style={{ cursor: "pointer" }}>⚡ Pegar Espada</p>
            </div>
        </Html>
    );
}
