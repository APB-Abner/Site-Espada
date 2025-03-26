import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const RectangleFrame = () => {
    const lineRef = useRef();
    const [time, setTime] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(scrollY / maxScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        if (lineRef.current) {
            setTime((prev) => prev + 0.05);
        }
    });

    const fullPoints = [
        new THREE.Vector3(-13, 1.5, 0),
        new THREE.Vector3(-7, 1.5, 0),
        new THREE.Vector3(-7, -1.5, 0),
        new THREE.Vector3(-13, -1.5, 0),
        new THREE.Vector3(-13, 1.5, 0),
    ];

    const totalSegments = fullPoints.length - 1;
    const segmentProgress = progress * totalSegments;
    const visibleSegmentCount = Math.floor(segmentProgress);
    const partialSegmentProgress = segmentProgress - visibleSegmentCount;

    let visiblePoints = fullPoints.slice(0, visibleSegmentCount + 1);

    if (visibleSegmentCount < totalSegments) {
        const start = fullPoints[visibleSegmentCount];
        const end = fullPoints[visibleSegmentCount + 1];
        const interpolatedPoint = new THREE.Vector3().lerpVectors(start, end, partialSegmentProgress);
        visiblePoints.push(interpolatedPoint);
    }

    const lineMaterial = new THREE.ShaderMaterial({
        vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform float time;
      void main() {
        float brightness = 0.8 + 0.6 * sin(time * 8.0);
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * brightness;
      }
    `,
        uniforms: {
            time: { value: time },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
    });

    return (
        <mesh ref={lineRef}>
            <line>
                <bufferGeometry attach="geometry" setFromPoints={visiblePoints} />
                <primitive object={new THREE.Line(new THREE.BufferGeometry().setFromPoints(visiblePoints), lineMaterial)} />
            </line>
        </mesh>
    );
};

const RectangleFill = ({ scrollProgress }) => {
    const progress = Math.min(scrollProgress, 1);

    return (
        <mesh position={[-10, 0, 0]}>
            <planeGeometry args={[6, 3]} />
            <meshBasicMaterial
                color="hsl(60, 75%, 30%)"
                opacity={progress}
                transparent={true}
            />
        </mesh>
    );
};

const MenuButton = ({ label, onClick, position, isHovered, onPointerEnter, onPointerLeave }) => {
    return (
        <mesh
            position={position}
            onClick={onClick}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            <planeGeometry args={[3, 1]} />
            <meshBasicMaterial color={isHovered ? "gray" : "black"} />
            <Text fontSize={0.3} position={[0.1, 0, 0.1]} color={isHovered ? "black" : "white"}>
                {label}
            </Text>
        </mesh>
    );
};

const Menu = () => {
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [active, setActive] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / maxScroll;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleStory = () => {
        setActive("Contando história...");
        navigate("/story");
    };

    const handlePointerEnter = (button) => {
        setHoveredButton(button);
    };

    const handlePointerLeave = () => {
        setHoveredButton(null);
    };

    return (
        <group>
            <RectangleFill scrollProgress={scrollProgress} />
            <RectangleFrame />

            <MenuButton
                label="📖 Ouvir História"
                onClick={handleStory}
                position={[0 + -10, -0, 0.02]}
                isHovered={hoveredButton === "story"}
                onPointerEnter={() => handlePointerEnter("story")}
                onPointerLeave={handlePointerLeave}
            />

            {active && (
                <Text
                    position={[0 + -10, -1.5, 0]}
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
};

export default Menu;
