import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { buildProgress } from '../lib/build-progress'
import { heroCameraState } from '../lib/hero-camera-state'
import { HERO_CAMERA_CLOSE, HERO_LOOK_CLOSE } from '../components/3d/scene-config'

interface Refs {
  wrapper: RefObject<HTMLElement | null>
  pin: RefObject<HTMLElement | null>
}

/**
 * Drives the five-stage build (STEM → GREENERY → FOCAL → ACCENT → TIE)
 * and the camera dolly off a single scrubbed GSAP timeline pinned to the
 * hero. scrub:0.5 adds a little lag for weight; because progress is tied
 * directly to scroll position (no `once`), the sequence reverses cleanly
 * when the visitor scrolls back up.
 */
export function useHeroScrollTimeline({ wrapper, pin }: Refs) {
  useEffect(() => {
    if (!wrapper.current || !pin.current) return
    const wrapperEl = wrapper.current
    const pinEl = pin.current

    const mm = gsap.matchMedia()

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

        tl.to(
          heroCameraState,
          { x: HERO_CAMERA_CLOSE[0], y: HERO_CAMERA_CLOSE[1], z: HERO_CAMERA_CLOSE[2], duration: 5 },
          0,
        )
          .to(
            heroCameraState,
            { tx: HERO_LOOK_CLOSE[0], ty: HERO_LOOK_CLOSE[1], tz: HERO_LOOK_CLOSE[2], duration: 5 },
            0,
          )
          .to(buildProgress, { stem: 1, duration: 1 }, 0)
          .to(buildProgress, { greenery: 1, duration: 1 }, 1)
          .to(buildProgress, { focal: 1, duration: 1 }, 2)
          .to(buildProgress, { accent: 1, duration: 1 }, 3)
          .to(buildProgress, { tie: 1, duration: 1 }, 4)
          // Trailing dead zone: camera and bouquet hold in place while the
          // pin is still active, before the section releases.
          .to({}, { duration: 0.8 }, 5)
      }, wrapperEl)

      return () => ctx.revert()
    })

    // Respect prefers-reduced-motion: settle instantly at the final stage,
    // no scroll-linked camera dolly or staged reveal.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      Object.assign(buildProgress, { stem: 1, greenery: 1, focal: 1, accent: 1, tie: 1 })
      Object.assign(heroCameraState, {
        x: HERO_CAMERA_CLOSE[0],
        y: HERO_CAMERA_CLOSE[1],
        z: HERO_CAMERA_CLOSE[2],
        tx: HERO_LOOK_CLOSE[0],
        ty: HERO_LOOK_CLOSE[1],
        tz: HERO_LOOK_CLOSE[2],
      })
    })

    return () => mm.revert()
  }, [wrapper, pin])
}
