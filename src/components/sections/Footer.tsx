import { footer, nav } from '../../lib/content'

export function Footer() {
  return (
    <footer className="px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <p className="text-lg">{nav.logo}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase">{footer.contact.heading}</p>
          <p className="mt-2 text-sm">{footer.contact.email}</p>
          <p className="text-sm">{footer.contact.phone}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase">{footer.serviceArea.heading}</p>
          <p className="mt-2 text-sm">{footer.serviceArea.body}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl text-xs">
        <p>
          © {new Date().getFullYear()} {nav.logo}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
