import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { TextureLoader } from "three";

export default function Room() {
    const roomRef = useRef();
    const { scene } = useGLTF("/models/Room.glb");

    const [textures, setTextures] = React.useState({
        albedo: undefined,
        normal: undefined,
        roughness: undefined,
        metallic: undefined,
        ao: undefined,
        height: undefined,
    });

    // Carregar texturas e configurar materiais
    useEffect(() => {
        const textureLoader = new TextureLoader();
        // Carregar todas as texturas necessárias
        const loadedTextures = {
            albedo: textureLoader.load('/models/texture/TCom_Scifi_Panel_1K_albedo.png'),
            normal: textureLoader.load('/models/texture/TCom_Scifi_Panel_1K_normal.png'),
            roughness: textureLoader.load('/models/texture/TCom_Scifi_Panel_1K_roughness.png'),
            metallic: textureLoader.load('/models/texture/TCom_Scifi_Panel_1K_metallic.png'),
            ao: textureLoader.load('/models/texture/TCom_Scifi_Panel_1K_ao.png'),
            height: textureLoader.load('/models/texture/TCom_Scifi_Panel_1K_height.png'),
        };

        setTextures(loadedTextures); // Atualizar o estado com as texturas carregadas
    }, []);

    useEffect(() => {
        if (roomRef.current && Object.keys(textures).length > 0) {
            const material = new THREE.MeshStandardMaterial({
                map: textures.albedo, // Textura base
                normalMap: textures.normal, // Mapa de Normais
                roughnessMap: textures.roughness, // Mapa de rugosidade
                metalnessMap: textures.metallic, // Mapa de metalicidade
                metalness: 0.5, // Intensidade da metalicidade
                aoMap: textures.ao, // Mapa de oclusão ambiente
                displacementMap: textures.height, // Mapa de altura (displacement)
                displacementScale: 0.1, // Ajuste da intensidade do mapa de altura

            });

            roomRef.current.material = material; // Aplicar o material ao mesh
        }
    }, [roomRef, textures]);
    return (
        <primitive
            ref={roomRef}
            object={scene}
            position={[0, 1.5, -15]}
            scale={[3, 4, 3]}

        />
    );
}
