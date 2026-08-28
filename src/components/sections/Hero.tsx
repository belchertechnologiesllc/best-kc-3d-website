import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { hero } from '../../lib/content'
import { MobileHeroFallback } from '../3d/MobileHeroFallback'
import { useHeroScrollTimeline } from '../../hooks/useHeroScrollTimeline'
import { useCanRender3D } from '../../hooks/useCanRender3D'
import { gsap } from '../../lib/gsap'
import { cursorState } from '../../lib/cursor-state'

// Code-split the whole three.js/R3F bundle out of the main chunk so
// mobile and low-power visitors (who get MobileHeroFallback instead)
// never pay for downloading it.
const HeroScene = lazy(() => import('../3d/HeroScene').then((m) => ({ default: m.HeroScene })))

export function Hero() {
  const canRender3D = useCanRender3D()
  const wrapperRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const sceneWrapRef = useRef<HTMLDivElement>(null)
  const headlineInnerRef = useRef<HTMLSpanElement>(null)
  const subCtaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useHeroScrollTimeline({ wrapper: wrapperRef, pin: pinRef })

  // Entrance choreography: black -> ambient (0-0.4s), vitrine fades/scales
  // in (0.4-1.0s), headline mask-wipes up (1.0-1.6s), subhead+CTAs fade up
  // (1.6-2.2s). Runs once on mount, independent of the scroll timeline.
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        // Settle instantly at the final state — no fade/scale/mask-wipe.
        gsap.set(overlayRef.current, { autoAlpha: 0 })
        gsap.set(sceneWrapRef.current, { autoAlpha: 1, scale: 1 })
        gsap.set(headlineInnerRef.current, { y: 0, autoAlpha: 1 })
        gsap.set(subCtaRef.current, { y: 0, opacity: 1 })
        return
      }

      gsap.set(sceneWrapRef.current, { autoAlpha: 0, scale: 0.96 })
      const headlineHeight = headlineInnerRef.current?.offsetHeight ?? 0
      gsap.set(headlineInnerRef.current, { y: headlineHeight, autoAlpha: 0 })
      gsap.set(subCtaRef.current, { y: 12, opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'settle' } })
      tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.4 }, 0)
        .to(sceneWrapRef.current, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.4)
        .to(headlineInnerRef.current, { y: 0, autoAlpha: 1, duration: 0.6 }, 1.0)
        .to(subCtaRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.6)
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  // Cursor glow (canvas-only) + feeds the R3F CursorTiltRig via cursorState.
  useLayoutEffect(() => {
    const el = pinRef.current
    const glow = glowRef.current
    if (!el || !glow) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const moveX = gsap.quickTo(glow, 'x', { duration: 0.5, ease: 'power3' })
    const moveY = gsap.quickTo(glow, 'y', { duration: 0.5, ease: 'power3' })

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      moveX(px)
      moveY(py)
      cursorState.x = (px / rect.width) * 2 - 1
      cursorState.y = (py / rect.height) * 2 - 1
    }
    const handleEnter = () => {
      cursorState.active = true
      gsap.to(glow, { autoAlpha: 1, duration: 0.3 })
    }
    const handleLeave = () => {
      cursorState.active = false
      gsap.to(glow, { autoAlpha: 0, duration: 0.3 })
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerenter', handleEnter)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerenter', handleEnter)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <section id="hero" ref={wrapperRef} className="relative h-[210vh]">
      <div
        ref={pinRef}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-hollow-950 px-6 text-center text-linen-50"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute top-0 left-0 z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(201,166,107,0.16) 0%, rgba(201,166,107,0.05) 45%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div ref={sceneWrapRef} className="absolute inset-0 z-0">
          {canRender3D ? (
            <Suspense fallback={<MobileHeroFallback />}>
              <HeroScene />
            </Suspense>
          ) : (
            <MobileHeroFallback />
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(120% 70% at 50% 12%, rgba(12,26,19,0.55) 0%, rgba(12,26,19,0.15) 30%, transparent 55%), radial-gradient(90% 65% at 50% 100%, rgba(12,26,19,0.95) 0%, rgba(12,26,19,0.55) 45%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-20">
          <p className="eyebrow">Kansas City · Est. Atelier</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] font-medium drop-shadow-[0_2px_16px_rgba(12,26,19,0.6)] md:text-6xl">
            <span className="mask-line">
              <span ref={headlineInnerRef}>
                Every arrangement begins with{' '}
                <em className="font-normal text-brass-300 italic">structure</em>.
              </span>
            </span>
          </h1>
          <div ref={subCtaRef}>
            <p className="mx-auto mt-6 max-w-xl text-base text-linen-100/85 md:text-lg">
              {hero.subheadline}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-ghost">
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-20 h-10 w-px -translate-x-1/2 bg-linen-100/30"
          aria-hidden="true"
        />

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-40 bg-hollow-950"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
