import { useFrame } from '@react-three/fiber'

interface CameraRigProps {
  target: [number, number, number]
}

/** Keeps the camera aimed at the vitrine regardless of where scroll-driven
 * dolly moves its position (see CameraTimeline in Stage 5). */
export function CameraRig({ target }: CameraRigProps) {
  useFrame(({ camera }) => {
    camera.lookAt(target[0], target[1], target[2])
  })
  return null
}
