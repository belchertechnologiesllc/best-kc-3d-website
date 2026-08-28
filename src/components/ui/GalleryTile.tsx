import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import type { GalleryItem } from '../../lib/content'

const MAX_TILT = 5
const MAX_PANE_OFFSET = 8

export function GalleryTile({ item, swatch }: { item: GalleryItem; swatch: string }) {
  const tileRef = useRef<HTMLElement>(null)
  const paneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tile = tileRef.current
    const pane = paneRef.current
    if (!tile || !pane) return
    if (window.matchMedia('(hover: none)').matches) return

    const handleMove = (e: PointerEvent) => {
      const rect = tile.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(tile, {
        rotateX: -py * MAX_TILT * 2,
        rotateY: px * MAX_TILT * 2,
        duration: 0.4,
        ease: 'settle',
        transformPerspective: 800,
      })
      gsap.to(pane, {
        x: px * MAX_PANE_OFFSET * 2,
        y: py * MAX_PANE_OFFSET * 2,
        duration: 0.4,
        ease: 'settle',
      })
    }

    const handleLeave = () => {
      gsap.to(tile, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'spring' })
      gsap.to(pane, { x: 0, y: 0, duration: 0.3, ease: 'spring' })
    }

    tile.addEventListener('pointermove', handleMove)
    tile.addEventListener('pointerleave', handleLeave)
    return () => {
      tile.removeEventListener('pointermove', handleMove)
      tile.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <figure
      ref={tileRef}
      className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-sm border border-linen-300 bg-linen-50 shadow-[0_20px_40px_-28px_rgba(12,26,19,0.5)] [transform-style:preserve-3d]"
    >
      <div
        className="aspect-3/4 w-full"
        style={{ background: `linear-gradient(160deg, ${swatch}22 0%, ${swatch}55 100%)` }}
      />
      <div
        ref={paneRef}
        className="pointer-events-none absolute inset-0 border border-white/20 bg-white/5"
      />
      <figcaption className="p-4">
        <p className="font-display text-base text-ink-900">{item.couple}</p>
        <p className="eyebrow mt-1">{item.venue}</p>
        {item.quote && <p className="mt-3 text-sm text-ink-700 italic">“{item.quote}”</p>}
      </figcaption>
    </figure>
  )
}
