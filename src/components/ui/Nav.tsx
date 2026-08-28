import { nav } from '../../lib/content'
import { useScrolled } from '../../hooks/useScrolled'

export function Nav() {
  const scrolled = useScrolled()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-hollow-950/90 backdrop-blur-md' : 'bg-transparent'
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
        <a href={nav.cta.href} className="btn btn-primary">
          {nav.cta.label}
        </a>
      </nav>
    </header>
  )
}
