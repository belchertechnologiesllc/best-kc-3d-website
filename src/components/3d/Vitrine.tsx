import { useMemo } from 'react'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { buildFrameEdges } from './frame-edges'
import { createBrassMaterial } from './materials'

const FRAME_WIDTH = 1.3
const FRAME_DEPTH = 0.9
const FRAME_HEIGHT = 1.5
const FRAME_Y_BASE = 0.9
const FRAME_THICKNESS = 0.035

export function Vitrine() {
  const frameMaterial = useMemo(() => createBrassMaterial(0.35), [])
  const pedestalMaterial = useMemo(() => createBrassMaterial(0.5), [])
  const edges = useMemo(
    () => buildFrameEdges(FRAME_WIDTH, FRAME_DEPTH, FRAME_HEIGHT, FRAME_Y_BASE, FRAME_THICKNESS),
    [],
  )

  return (
    <group>
      {/* Foot */}
      <mesh position={[0, 0.03, 0]} material={pedestalMaterial}>
        <cylinderGeometry args={[0.26, 0.26, 0.06, 32]} />
      </mesh>

      {/* Slender tapered shaft */}
      <mesh position={[0, 0.45, 0]} material={pedestalMaterial}>
        <cylinderGeometry args={[0.11, 0.16, 0.78, 32]} />
      </mesh>

      {/* Plinth beneath the case */}
      <mesh position={[0, FRAME_Y_BASE - 0.03, 0]} material={pedestalMaterial}>
        <boxGeometry args={[FRAME_WIDTH - 0.14, 0.06, FRAME_DEPTH - 0.14]} />
      </mesh>

      {/* Brass frame edges */}
      {edges.map((bar, i) => (
        <mesh key={i} position={bar.position} material={frameMaterial}>
          <boxGeometry args={bar.size} />
        </mesh>
      ))}

      {/* Glass panel */}
      <mesh position={[0, FRAME_Y_BASE + FRAME_HEIGHT / 2, 0]}>
        <boxGeometry args={[FRAME_WIDTH - 0.05, FRAME_HEIGHT - 0.05, FRAME_DEPTH - 0.05]} />
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.04}
          thickness={0.35}
          ior={1.52}
          chromaticAberration={0.025}
          anisotropy={0.15}
          distortion={0.05}
          distortionScale={0.2}
          temporalDistortion={0}
          color="#eef4ee"
          background={undefined}
        />
      </mesh>

      {/* Cornice cap */}
      <mesh position={[0, FRAME_Y_BASE + FRAME_HEIGHT + 0.025, 0]} material={frameMaterial}>
        <boxGeometry args={[FRAME_WIDTH + 0.1, 0.05, FRAME_DEPTH + 0.1]} />
      </mesh>
    </group>
  )
}
