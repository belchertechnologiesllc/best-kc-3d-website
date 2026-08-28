import { useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/** Procedural studio environment for brass/glass reflections — generated
 * client-side (no HDR download) to keep the hero's network cost near zero. */
export function SceneEnvironment() {
  const { gl, scene } = useThree()
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl])

  useEffect(() => {
    const envScene = new RoomEnvironment()
    const renderTarget = pmrem.fromScene(envScene, 0.035)
    scene.environment = renderTarget.texture
    return () => {
      renderTarget.dispose()
      envScene.dispose?.()
    }
  }, [gl, scene, pmrem])

  useEffect(() => () => pmrem.dispose(), [pmrem])

  return null
}
