import { Canvas } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { Vitrine } from './Vitrine'
import { DustMotes } from './DustMotes'
import { SceneEnvironment } from './SceneEnvironment'
import { CameraRig } from './CameraRig'
import { VolumetricBeam } from './VolumetricBeam'
import { HERO_CAMERA_START, HERO_LOOK_TARGET } from './scene-config'

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <PerspectiveCamera makeDefault position={HERO_CAMERA_START} fov={32} near={0.1} far={30} />
      <CameraRig target={HERO_LOOK_TARGET} />

      <Suspense fallback={null}>
        <SceneEnvironment />
      </Suspense>

      <hemisphereLight args={['#3a5240', '#0c1a13', 0.5]} />
      <directionalLight position={[4, 3.2, 1.6]} intensity={2.4} color="#ffb877" />
      <directionalLight position={[-3, 1.8, -2]} intensity={0.7} color="#c9a66b" />

      <Vitrine />
      <DustMotes />
      <VolumetricBeam />

      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.45}
        scale={4.5}
        blur={2.4}
        far={1.2}
        color="#0c1a13"
      />
    </Canvas>
  )
}
