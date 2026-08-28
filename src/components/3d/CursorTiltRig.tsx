import { useFrame } from '@react-three/fiber'
import { useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { cursorState } from '../../lib/cursor-state'

const MAX_TILT = THREE.MathUtils.degToRad(4)
const DAMPING = 0.08

/** Subtle parallax tilt of the vitrine toward the cursor — damped/lagged,
 * never snaps to pointer. */
export function CursorTiltRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    const g = group.current
    if (!g) return
    const targetX = cursorState.active ? -cursorState.y * MAX_TILT : 0
    const targetY = cursorState.active ? cursorState.x * MAX_TILT : 0
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, DAMPING)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, DAMPING)
  })

  return <group ref={group}>{children}</group>
}
