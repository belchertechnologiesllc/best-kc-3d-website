import { createElement, isValidElement, useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children)
  return ''
}

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
 *
 * The mask-reveal transform clips the text out of its visible box until
 * the ScrollTrigger fires, which some accessibility tooling (and a
 * screen reader's virtual cursor, before the section is scrolled to)
 * reads as no visible text. An aria-label carrying the plain-text
 * content gives it a stable accessible name regardless of animation
 * state; the animated content itself is aria-hidden to avoid double
 * announcement.
 */
export function MaskReveal({ children, as = 'div', lineClassName, className }: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const label = children.map(extractText).join(' ')

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
    { ref: containerRef, className, 'aria-label': label },
    createElement(
      'span',
      { 'aria-hidden': 'true' },
      children.map((child, i) =>
        createElement(
          'span',
          { key: i, className: `mask-line ${lineClassName ?? ''}` },
          createElement('span', null, child),
        ),
      ),
    ),
  )
}
