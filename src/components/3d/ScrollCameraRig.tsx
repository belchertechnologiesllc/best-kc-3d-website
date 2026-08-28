import { useFrame } from '@react-three/fiber'
import { heroCameraState } from '../../lib/hero-camera-state'

/** Reads the scroll-driven camera state (mutated by the GSAP timeline in
 * useHeroScrollTimeline) every frame and applies it to the R3F camera. */
export function ScrollCameraRig() {
  useFrame(({ camera }) => {
    camera.position.set(heroCameraState.x, heroCameraState.y, heroCameraState.z)
    camera.lookAt(heroCameraState.tx, heroCameraState.ty, heroCameraState.tz)
  })
  return null
}
