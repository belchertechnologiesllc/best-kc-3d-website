import { useEffect, useRef } from 'react'
import { bloomColors, greeneryOptions } from '../../lib/content'
import { useConfigurator } from '../../lib/configurator-context'
import { MaskReveal } from '../ui/MaskReveal'
import { gsap } from '../../lib/gsap'

function ShimmerSweep({ triggerKey }: { triggerKey: string | null }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!triggerKey || !barRef.current) return
    gsap.fromTo(
      barRef.current,
      { xPercent: -110, autoAlpha: 0.9 },
      { xPercent: 110, autoAlpha: 0, duration: 0.5, ease: 'settle' },
    )
  }, [triggerKey])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={barRef}
        className="h-full w-1/3 opacity-0"
        style={{
          background:
            'linear-gradient(100deg, transparent 0%, rgba(201,166,107,0.35) 50%, transparent 100%)',
        }}
      />
    </div>
  )
}

export function Configurator() {
  const { selection, setBloom, setGreenery } = useConfigurator()
  const bloom = bloomColors.find((b) => b.id === selection.bloomId)
  const greenery = greeneryOptions.find((g) => g.id === selection.greeneryId)
  const bloomGroupRef = useRef<SVGGElement>(null)
  const greeneryGroupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!bloom || !bloomGroupRef.current) return
    gsap.fromTo(
      bloomGroupRef.current,
      { y: -24, autoAlpha: 0, scale: 0.7, transformOrigin: '50% 100%' },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: 'spring' },
    )
  }, [bloom])

  useEffect(() => {
    if (!greenery || !greeneryGroupRef.current) return
    gsap.fromTo(
      greeneryGroupRef.current,
      { scaleY: 0.6, autoAlpha: 0, transformOrigin: '50% 100%' },
      { scaleY: 1, autoAlpha: 1, duration: 0.6, ease: 'spring' },
    )
  }, [greenery])

  return (
    <section id="configurator" className="bg-hollow-800 px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl text-center text-linen-50">
        <p className="eyebrow">Interactive</p>
        <MaskReveal as="h2" className="mt-4 font-display text-3xl md:text-4xl">
          {['Begin Your Arrangement']}
        </MaskReveal>
        <p className="mx-auto mt-4 max-w-md text-sm text-linen-100/70">
          Choose a bloom and a greenery — we’ll carry your picks into the form below.
        </p>

        <div className="mx-auto mt-12 flex h-56 w-40 items-end justify-center" aria-hidden="true">
          <svg viewBox="0 0 100 140" className="h-full w-full overflow-visible">
            <g ref={greeneryGroupRef} style={{ opacity: greenery ? 1 : 0 }}>
              {greenery && (
                <path
                  d="M50 82 C 30 60, 20 40, 30 20 M50 82 C 70 60, 80 40, 70 20 M50 82 C 50 55, 50 35, 50 15"
                  fill="none"
                  stroke={greenery.swatch}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}
            </g>
            <g ref={bloomGroupRef} style={{ opacity: bloom ? 1 : 0 }}>
              {bloom && (
                <>
                  <circle cx="50" cy="48" r="12" fill={bloom.swatch} />
                  <circle cx="34" cy="58" r="9" fill={bloom.swatch} opacity="0.85" />
                  <circle cx="66" cy="58" r="9" fill={bloom.swatch} opacity="0.85" />
                </>
              )}
            </g>
            <path
              d="M28 82 L26 130 Q50 138 74 130 L72 82 Z"
              fill="none"
              stroke="currentColor"
              className="text-brass-400"
              strokeWidth="2"
            />
          </svg>
        </div>

        <fieldset className="relative mt-10">
          <legend className="eyebrow mx-auto w-fit">Bloom color</legend>
          <ShimmerSweep triggerKey={selection.bloomId} />
          <div className="mt-4 flex justify-center gap-5">
            {bloomColors.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={selection.bloomId === c.id}
                onClick={() => setBloom(c.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`block h-10 w-10 rounded-full border-2 transition-transform duration-300 ${
                    selection.bloomId === c.id
                      ? 'scale-110 border-brass-400'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.swatch }}
                />
                <span className="text-xs text-linen-100/80">{c.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="relative mt-8">
          <legend className="eyebrow mx-auto w-fit">Greenery</legend>
          <ShimmerSweep triggerKey={selection.greeneryId} />
          <div className="mt-4 flex justify-center gap-5">
            {greeneryOptions.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={selection.greeneryId === g.id}
                onClick={() => setGreenery(g.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`block h-10 w-10 rounded-full border-2 transition-transform duration-300 ${
                    selection.greeneryId === g.id
                      ? 'scale-110 border-brass-400'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: g.swatch }}
                />
                <span className="text-xs text-linen-100/80">{g.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <a href="#booking" className="btn btn-primary mt-12">
          Send This to Your Florist
        </a>
      </div>
    </section>
  )
}
