import { useId, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import type { FaqItem as FaqItemData } from '../../lib/content'

export function FaqItem({ item }: { item: FaqItemData }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const toggle = () => {
    const next = !open
    setOpen(next)
    const el = bodyRef.current
    if (!el) return
    gsap.killTweensOf(el)
    if (next) {
      gsap.set(el, { height: 0, autoAlpha: 0 })
      gsap.to(el, { height: 'auto', autoAlpha: 1, duration: 0.3, ease: 'settle' })
    } else {
      gsap.to(el, { height: 0, autoAlpha: 0, duration: 0.3, ease: 'settle' })
    }
  }

  return (
    <div className="py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left"
      >
        <span className="text-base">{item.question}</span>
        <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-brass-400">
          <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
          <span
            className={`absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
              open ? 'rotate-90' : ''
            }`}
          />
        </span>
      </button>
      <div id={id} ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="pt-3 pb-1 text-sm leading-relaxed text-linen-100/70">{item.answer}</p>
      </div>
    </div>
  )
}
