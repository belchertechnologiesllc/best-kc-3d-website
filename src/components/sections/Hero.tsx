import { useRef } from 'react'
import { hero } from '../../lib/content'
import { HeroScene } from '../3d/HeroScene'
import { useHeroScrollTimeline } from '../../hooks/useHeroScrollTimeline'

export function Hero() {
  const wrapperRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useHeroScrollTimeline({ wrapper: wrapperRef, pin: pinRef })

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className="relative motion-safe:h-[210vh] motion-reduce:h-screen"
    >
      <div
        ref={pinRef}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-hollow-950 px-6 text-center text-linen-50"
      >
        <div className="absolute inset-0 z-0">
          <HeroScene />
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
            Every arrangement begins with{' '}
            <em className="font-normal text-brass-300 italic">structure</em>.
          </h1>
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

        <div
          className="absolute bottom-8 left-1/2 z-20 h-10 w-px -translate-x-1/2 bg-linen-100/30"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
