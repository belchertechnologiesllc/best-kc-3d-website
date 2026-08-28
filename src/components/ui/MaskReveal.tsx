import { createElement, useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'

interface MaskRevealProps {
  children: ReactNode[]
  as?: ElementType
  lineClassName?: string
  className?: string
}

/**
 * Wraps each child in an overflow-hidden band and mask-wipes it upward
 * into view once the group is ~20% visible. One-shot (not scrubbed) —
 * scroll-scrubbed motion is reserved for the hero and process timeline.
 */
export function MaskReveal({ children, as = 'div', lineClassName, className }: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const lines = el.querySelectorAll('.mask-line > *')

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        gsap.set(line, { y: (line as HTMLElement).offsetHeight, autoAlpha: 0 })
      })
      gsap.to(lines, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'settle',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return createElement(
    as,
    { ref: containerRef, className },
    children.map((child, i) =>
      createElement(
        'span',
        { key: i, className: `mask-line ${lineClassName ?? ''}` },
        createElement('span', null, child),
      ),
    ),
  )
}
