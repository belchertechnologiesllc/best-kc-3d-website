import { Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface DustMotesProps {
  revealAt?: number
}

/** Sparse dust motes drifting through the hero's key-light beam. Kept to a
 * low count and low opacity per the restraint guardrail. Scales in after
 * `revealAt` seconds so it's the last element to appear in the hero's
 * entrance choreography. */
export function DustMotes({ revealAt = 0 }: DustMotesProps) {
  const group = useRef<THREE.Group>(null)
  const start = useRef<number | null>(null)

  useFrame(({ clock }) => {
    if (start.current === null) start.current = clock.elapsedTime
    const elapsed = clock.elapsedTime - start.current
    const target = elapsed >= revealAt ? 1 : 0
    if (group.current) {
      const s = THREE.MathUtils.lerp(group.current.scale.x, target, 0.06)
      group.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={group} scale={0}>
      <Sparkles
        count={45}
        scale={[2.2, 3.2, 1.8]}
        position={[0, 1.6, 0.4]}
        size={1.4}
        speed={0.15}
        opacity={0.35}
        color="#e7d3a4"
        noise={0.6}
      />
    </group>
  )
}
