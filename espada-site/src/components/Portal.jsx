import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

// Componente para as Partículas
const Particles = () => {
    const particlesRef = useRef();
    const particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(0x00ff00),
        size: 0.1,
        transparent: true,
        opacity: 0.5,
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const createParticle = () => {
        return new Float32Array([
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
        ]);
    };

    useFrame((state, delta) => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const index = i * 3;
                const dx = -positions[index];
                const dy = -positions[index + 1];
                const dz = -positions[index + 2];

                positions[index] += dx * 0.05 * delta;
                positions[index + 1] += dy * 0.05 * delta;
                positions[index + 2] += dz * 0.05 * delta;

                if (Math.abs(positions[index]) < 0.1 && Math.abs(positions[index + 1]) < 0.1 && Math.abs(positions[index + 2]) < 0.1) {
                    const newParticle = createParticle();
                    positions[index] = newParticle[0];
                    positions[index + 1] = newParticle[1];
                    positions[index + 2] = newParticle[2];
                }
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />;
};

// Componente para o Buraco Negro com Vórtice
const BlackHole = ({ onClick }) => {
    const sphereRef = useRef();

    const blackHoleShader = `
    precision mediump float;
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      float dist = length(vUv - 0.5);
      float strength = 1.0 / (dist * 3.0 + 0.1);
      vec3 color = vec3(0.1, 0.1, 0.1) * strength;

      float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + time * 2.0;
      float radius = length(vUv - 0.5);
      vec2 uvDistort = vec2(cos(angle) * radius, sin(angle) * radius);
      gl_FragColor = vec4(color + vec3(uvDistort.x * 0.5, uvDistort.y * 0.5, 0.1), 1.0);
    }
  `;

    const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0.0 } },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: blackHoleShader,
        transparent: true,
    });

    useFrame((state, delta) => {
        if (sphereRef.current) {
            material.uniforms.time.value += delta;
        }
    });

    return (
        <mesh ref={sphereRef} position={[0, 0, 0]} onClick={onClick}>
            <sphereGeometry args={[1, 64, 64]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
};

// Componente para a Cena com o Buraco Negro e Partículas
const Sandbox = () => {
    const navigate = useNavigate();

    const handleStory = () => {
        navigate("/legendadary");
    };

    return (
        <group position={[15, 0, -9]}>
            <BlackHole onClick={handleStory} />
            <Particles />
        </group>
    );
};

export default Sandbox;