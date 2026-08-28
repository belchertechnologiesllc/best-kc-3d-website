import { nav } from '../../lib/content'

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10"
      >
        <a href="#hero" className="text-lg tracking-wide">
          {nav.logo}
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href={nav.cta.href} className="inline-block px-5 py-2.5 text-sm">
          {nav.cta.label}
        </a>
      </nav>
    </header>
  )
}
