import { Canvas } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { Vitrine } from './Vitrine'
import { BloomBuild } from './BloomBuild'
import { DustMotes } from './DustMotes'
import { SceneEnvironment } from './SceneEnvironment'
import { ScrollCameraRig } from './ScrollCameraRig'
import { VolumetricBeam } from './VolumetricBeam'
import { CursorTiltRig } from './CursorTiltRig'
import { HERO_CAMERA_START } from './scene-config'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function HeroScene() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <PerspectiveCamera makeDefault position={HERO_CAMERA_START} fov={32} near={0.1} far={30} />
      <ScrollCameraRig />

      <Suspense fallback={null}>
        <SceneEnvironment />
      </Suspense>

      <hemisphereLight args={['#3a5240', '#0c1a13', 0.5]} />
      <directionalLight position={[4, 3.2, 1.6]} intensity={2.4} color="#ffb877" />
      <directionalLight position={[-3, 1.8, -2]} intensity={0.7} color="#c9a66b" />

      <CursorTiltRig disabled={reducedMotion}>
        <Vitrine />
        <BloomBuild />
      </CursorTiltRig>
      {!reducedMotion && (
        <>
          <DustMotes revealAt={2} />
          <VolumetricBeam />
        </>
      )}

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
