import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { buildProgress, STAGE_KEYS } from '../lib/build-progress'
import { heroCameraState } from '../lib/hero-camera-state'
import { HERO_CAMERA_CLOSE, HERO_LOOK_CLOSE } from '../components/3d/scene-config'

interface Refs {
  wrapper: RefObject<HTMLElement | null>
  pin: RefObject<HTMLElement | null>
}

/**
 * Drives the five-stage build (STEM → GREENERY → FOCAL → ACCENT → TIE)
 * and the camera dolly off a single scrubbed GSAP timeline pinned to the
 * hero. Because progress is tied directly to scroll position (no
 * `once`), the sequence reverses cleanly when the visitor scrolls back
 * up — true in both branches below.
 */
export function useHeroScrollTimeline({ wrapper, pin }: Refs) {
  useEffect(() => {
    if (!wrapper.current || !pin.current) return
    const wrapperEl = wrapper.current
    const pinEl = pin.current

    const mm = gsap.matchMedia()

    // scrub:0.5 adds a little lag for weight — the normal-motion take.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            pin: pinEl,
            anticipatePin: 1,
          },
          defaults: { ease: 'none' },
        })
        buildStageTimeline(tl, 'none')
      }, wrapperEl)

      return () => ctx.revert()
    })

    // Reduced motion: the build still advances with scroll (it's core
    // content) but with no scrub lag and each stage snapping instantly
    // rather than easing/growing in.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: pinEl,
            anticipatePin: 1,
          },
          defaults: { ease: 'none' },
        })
        buildStageTimeline(tl, 'steps(1)')
      }, wrapperEl)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [wrapper, pin])
}

function buildStageTimeline(tl: gsap.core.Timeline, stageEase: string) {
  tl.to(
    heroCameraState,
    { x: HERO_CAMERA_CLOSE[0], y: HERO_CAMERA_CLOSE[1], z: HERO_CAMERA_CLOSE[2], duration: 5 },
    0,
  ).to(
    heroCameraState,
    { tx: HERO_LOOK_CLOSE[0], ty: HERO_LOOK_CLOSE[1], tz: HERO_LOOK_CLOSE[2], duration: 5 },
    0,
  )

  STAGE_KEYS.forEach((key, i) => {
    tl.to(buildProgress, { [key]: 1, duration: 1, ease: stageEase }, i)
  })

  // Trailing dead zone: camera and bouquet hold in place while the pin
  // is still active, before the section releases.
  tl.to({}, { duration: 0.8 }, STAGE_KEYS.length)
}
