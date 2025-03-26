import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Environment, Center } from '@react-three/drei'
import { useRef } from 'react'
// import { useControls } from 'leva'
import Sword from './Sword'
import { EffectComposer, Bloom } from "@react-three/postprocessing";


const { DEG2RAD } = THREE.MathUtils



function Scene() {
    const cameraControlsRef = useRef()
    const swordRef = useRef()


    // useControls({
    //     rotate: {
    //         label: 'Rotate Around Sword',
    //         options: {
    //             '+45°': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
    //             '-45°': () => cameraControlsRef.current?.rotate(-45 * DEG2RAD, 0, true),
    //             '+90°': () => cameraControlsRef.current?.rotate(90 * DEG2RAD, 0, true),
    //         },
    //     },
    //     reset: () => cameraControlsRef.current?.reset(true),
    // })

    return (
        <>
            <group>
                <Center>
                    <Sword ref={swordRef} onClick={false} scale={[0.09, 0.09, 0.09]}/>
                </Center>
            </group>
            <CameraControls
                ref={cameraControlsRef}
                minDistance={2}
                maxDistance={10}
                azimuthRotateSpeed={0.5}
                polarRotateSpeed={0.5}
                dollySpeed={0.5}
            />
            <Environment preset="city" />
        </>
    )
}


export default function Legendary() {
    return (
        <div className="h-dvh bg-black" >
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
                <ambientLight intensity={0.01} />
                <Scene />
                <EffectComposer>
                    <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.15} intensity={1.5} />
                </EffectComposer>


            </Canvas>
        </div>
    )
}