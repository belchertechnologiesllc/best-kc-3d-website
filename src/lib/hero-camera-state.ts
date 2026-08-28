import { HERO_CAMERA_START, HERO_LOOK_TARGET } from '../components/3d/scene-config'

/** Mirrors build-progress.ts: a plain mutable object GSAP tweens and the
 * R3F camera rig reads every frame, kept outside React state. */
export const heroCameraState = {
  x: HERO_CAMERA_START[0],
  y: HERO_CAMERA_START[1],
  z: HERO_CAMERA_START[2],
  tx: HERO_LOOK_TARGET[0],
  ty: HERO_LOOK_TARGET[1],
  tz: HERO_LOOK_TARGET[2],
}
