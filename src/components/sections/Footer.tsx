import { footer, nav } from '../../lib/content'
import { VitrineMark } from '../ui/VitrineMark'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-hollow-950 px-6 py-16 text-linen-100 md:px-10">
      <VitrineMark className="pointer-events-none absolute -right-6 -bottom-10 h-56 w-auto text-brass-500/10" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-linen-50">{nav.logo}</p>
          <p className="mt-2 max-w-xs text-sm text-linen-100/60">
            Kansas City wedding design and boutique florals.
          </p>
        </div>
        <div>
          <p className="eyebrow">{footer.contact.heading}</p>
          <p className="mt-2 text-sm">
            <a href={`mailto:${footer.contact.email}`} className="link-brass">
              {footer.contact.email}
            </a>
          </p>
          <p className="text-sm">{footer.contact.phone}</p>
        </div>
        <div>
          <p className="eyebrow">{footer.serviceArea.heading}</p>
          <p className="mt-2 text-sm text-linen-100/80">{footer.serviceArea.body}</p>
          <p className="eyebrow mt-6">{footer.social.heading}</p>
          <ul className="mt-2 flex gap-4 text-sm">
            {footer.social.links.map((link) => (
              <li key={link}>
                <a href="#" className="link-brass">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-6xl border-t border-linen-100/10 pt-6 text-xs text-linen-100/50">
        <p>
          © {new Date().getFullYear()} {nav.logo}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
