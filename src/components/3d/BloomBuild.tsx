import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instance, Instances } from '@react-three/drei'
import * as THREE from 'three'
import { geometries } from './bloom-geometry'
import {
  accentPlacements,
  focalPlacements,
  frondPlacements,
  leafPlacements,
  stemPlacements,
  tiePlacement,
} from './bloom-layout'
import { createBrassMaterial } from './materials'
import { buildProgress } from '../../lib/build-progress'
import { VASE_MOUTH } from './scene-config'

function useSoftMaterial(color: string, emissive: string, emissiveIntensity = 0.12) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.65,
        metalness: 0,
        emissive,
        emissiveIntensity,
      }),
    [color, emissive, emissiveIntensity],
  )
}

export function BloomBuild() {
  const stemGroup = useRef<THREE.Group>(null)
  const greeneryGroup = useRef<THREE.Group>(null)
  const focalGroup = useRef<THREE.Group>(null)
  const accentGroup = useRef<THREE.Group>(null)
  const tieGroup = useRef<THREE.Group>(null)

  const stemMaterial = useSoftMaterial('#3f5a3f', '#4d7a4d')
  const greeneryMaterial = useSoftMaterial('#516b46', '#5c8a52')
  const focalMaterial = useSoftMaterial('#e7d3b8', '#e7bfa0', 0.18)
  const focalCenterMaterial = useSoftMaterial('#c9a66b', '#c9a66b', 0.2)
  const accentMaterial = useSoftMaterial('#b3603f', '#c97a52', 0.16)
  const tieMaterial = useMemo(() => createBrassMaterial(0.3), [])

  useFrame(() => {
    if (stemGroup.current) stemGroup.current.scale.set(1, buildProgress.stem, 1)
    if (greeneryGroup.current) greeneryGroup.current.scale.setScalar(buildProgress.greenery)
    if (focalGroup.current) focalGroup.current.scale.setScalar(buildProgress.focal)
    if (accentGroup.current) accentGroup.current.scale.setScalar(buildProgress.accent)
    if (tieGroup.current) tieGroup.current.scale.setScalar(buildProgress.tie)
  })

  return (
    <group position={VASE_MOUTH}>
      <group ref={stemGroup}>
        <Instances geometry={geometries.stem} material={stemMaterial} frustumCulled={false}>
          {stemPlacements.map((p, i) => (
            <Instance
              key={i}
              position={p.position}
              rotation={p.rotation}
              scale={[1, p.scale * (p.position[1] / 0.78), 1]}
            />
          ))}
        </Instances>
      </group>

      <group ref={greeneryGroup}>
        <Instances geometry={geometries.frond} material={greeneryMaterial} frustumCulled={false}>
          {frondPlacements.map((p, i) => (
            <Instance key={i} position={p.position} rotation={p.rotation} scale={p.scale} />
          ))}
        </Instances>
        <Instances geometry={geometries.leaf} material={greeneryMaterial} frustumCulled={false}>
          {leafPlacements.map((p, i) => (
            <Instance key={i} position={p.position} rotation={p.rotation} scale={p.scale} />
          ))}
        </Instances>
      </group>

      <group ref={focalGroup}>
        <Instances geometry={geometries.focalBloom} material={focalMaterial} frustumCulled={false}>
          {focalPlacements.map((p, i) => (
            <Instance key={i} position={p.position} rotation={p.rotation} scale={p.scale} />
          ))}
        </Instances>
        <Instances
          geometry={geometries.focalCenter}
          material={focalCenterMaterial}
          frustumCulled={false}
        >
          {focalPlacements.map((p, i) => (
            <Instance key={i} position={p.position} rotation={p.rotation} scale={p.scale} />
          ))}
        </Instances>
      </group>

      <group ref={accentGroup}>
        <Instances
          geometry={geometries.accentBerry}
          material={accentMaterial}
          frustumCulled={false}
        >
          {accentPlacements.map((p, i) => (
            <Instance key={i} position={p.position} rotation={p.rotation} scale={p.scale} />
          ))}
        </Instances>
      </group>

      <group ref={tieGroup}>
        <mesh
          geometry={geometries.tieRibbon}
          material={tieMaterial}
          position={tiePlacement.position}
          rotation={tiePlacement.rotation}
        />
      </group>
    </group>
  )
}
