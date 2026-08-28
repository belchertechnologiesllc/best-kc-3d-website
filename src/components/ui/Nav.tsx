import { useEffect, useId, useRef, useState } from 'react'
import { nav } from '../../lib/content'
import { useScrolled } from '../../hooks/useScrolled'
import { gsap } from '../../lib/gsap'

export function Nav() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    gsap.killTweensOf(el)
    if (open) {
      gsap.set(el, { height: 0, autoAlpha: 0 })
      gsap.to(el, { height: 'auto', autoAlpha: 1, duration: 0.3, ease: 'settle' })
    } else {
      gsap.to(el, { height: 0, autoAlpha: 0, duration: 0.25, ease: 'settle' })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-hollow-950/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-linen-50 md:px-10"
      >
        <a href="#hero" className="font-display text-lg tracking-wide">
          {nav.logo}
        </a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-brass">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={nav.cta.href} className="btn btn-primary">
            {nav.cta.label}
          </a>
          <button
            type="button"
            className="relative h-8 w-8 shrink-0 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute top-1/2 left-1/2 h-px w-5 -translate-x-1/2 bg-current transition-transform duration-300 ${
                open ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute top-1/2 left-1/2 h-px w-5 -translate-x-1/2 bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute top-1/2 left-1/2 h-px w-5 -translate-x-1/2 bg-current transition-transform duration-300 ${
                open ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </nav>

      <div id={menuId} ref={panelRef} className="overflow-hidden md:hidden" style={{ height: 0 }}>
        <ul className="flex flex-col gap-1 px-6 pb-6 text-base">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 text-linen-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
