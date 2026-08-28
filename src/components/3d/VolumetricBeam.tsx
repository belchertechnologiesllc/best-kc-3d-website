import { AdditiveBlending } from 'three'

/** Cheap approximation of a volumetric light shaft: a single low-opacity,
 * additive-blended cone. No ray marching, no post-processing pass. */
export function VolumetricBeam() {
  return (
    <mesh position={[2.2, 3.4, 1.2]} rotation={[Math.PI * 0.92, 0, -0.5]}>
      <coneGeometry args={[1.4, 5.5, 24, 1, true]} />
      <meshBasicMaterial
        color="#ffdca8"
        transparent
        opacity={0.05}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  )
}
