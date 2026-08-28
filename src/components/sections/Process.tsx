import { useEffect, useRef } from 'react'
import { processStages } from '../../lib/content'
import { MaskReveal } from '../ui/MaskReveal'
import { gsap } from '../../lib/gsap'

export function Process() {
  const lineRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      gsap.set(line, { transformOrigin: isDesktop ? 'left center' : 'top center' })
      gsap.fromTo(
        line,
        { scaleX: isDesktop ? 0 : 1, scaleY: isDesktop ? 1 : 0 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line.closest('ol'),
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
        },
      )

      nodeRefs.current.forEach((node) => {
        if (!node) return
        gsap.to(node, {
          backgroundColor: 'var(--color-brass-400)',
          borderColor: 'var(--color-brass-400)',
          duration: 0.4,
          ease: 'settle',
          scrollTrigger: {
            trigger: node,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="bg-hollow-900 px-6 py-32 text-linen-50 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">The Process</p>
        <MaskReveal as="h2" className="mt-4 max-w-lg font-display text-3xl md:text-4xl">
          {['How a season comes together']}
        </MaskReveal>

        <ol className="relative mt-20 flex flex-col gap-12 md:flex-row md:gap-4">
          <div
            ref={lineRef}
            className="absolute top-2 bottom-2 left-2 w-px bg-brass-500/40 md:top-2 md:right-2 md:bottom-auto md:left-2 md:h-px md:w-auto"
            aria-hidden="true"
          />

          {processStages.map((stage, i) => (
            <li key={stage.code} className="relative flex flex-1 flex-col gap-3 pl-8 md:pl-0">
              <span
                ref={(el) => {
                  nodeRefs.current[i] = el
                }}
                className="absolute top-0 left-0 h-4 w-4 rounded-full border-2 border-brass-400/30 bg-hollow-900 md:relative md:mb-3"
                aria-hidden="true"
              />
              <span className="font-label text-xs tracking-[0.2em] text-brass-300">
                0{i + 1} · {stage.code}
              </span>
              <h3 className="font-display text-lg">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-linen-100/70">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
