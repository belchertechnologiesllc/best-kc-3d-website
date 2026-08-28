import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

interface UseTiltOptions {
  maxDeg?: number
  scale?: number
}

/** Cursor-relative tilt on hover, capped at maxDeg, with a spring-out
 * release on pointer leave — the one place an overshoot ease is used. */
export function useTilt<T extends HTMLElement>({ maxDeg = 6, scale = 1 }: UseTiltOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotateX: -py * maxDeg * 2,
        rotateY: px * maxDeg * 2,
        scale,
        duration: 0.4,
        ease: 'settle',
        transformPerspective: 800,
      })
    }

    const handleLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.3,
        ease: 'spring',
      })
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [maxDeg, scale])

  return ref
}
