import { Sparkles } from '@react-three/drei'

/** Sparse dust motes drifting through the hero's key-light beam. Kept to a
 * low count and low opacity per the restraint guardrail. */
export function DustMotes() {
  return (
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
  )
}
