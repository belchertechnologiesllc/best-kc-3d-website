import { useEffect, useRef, useState } from 'react'
import { buildProgress } from '../../lib/build-progress'

const FRAME_COUNT = 6

function currentFrameIndex() {
  const total =
    buildProgress.stem +
    buildProgress.greenery +
    buildProgress.focal +
    buildProgress.accent +
    buildProgress.tie
  return Math.min(FRAME_COUNT - 1, Math.round(total))
}

/**
 * Mobile / low-power / no-WebGL fallback for the hero: a sequence of
 * pre-rendered frames swapped by scroll progress, standing in for the
 * live scroll-scrubbed canvas at near-zero GPU cost. Reads the same
 * buildProgress object the GSAP timeline drives, so it stays in sync
 * with the scroll position without any WebGL work.
 */
export function MobileHeroFallback() {
  const [frame, setFrame] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const tick = () => {
      setFrame((prev) => {
        const next = currentFrameIndex()
        return next === prev ? prev : next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  return (
    <div className="absolute inset-0 bg-hollow-950">
      {Array.from({ length: FRAME_COUNT }, (_, i) => (
        <img
          key={i}
          src={`/hero-frames/frame-${i}.jpg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out"
          style={{ opacity: frame === i ? 1 : 0 }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  )
}
