import type { Service } from '../../lib/content'
import { useTilt } from '../../hooks/useTilt'

export function ServiceCard({ service, forward }: { service: Service; forward?: boolean }) {
  const tiltRef = useTilt<HTMLElement>({ maxDeg: 6 })

  return (
    <div className={forward ? 'md:-translate-y-6 md:scale-105' : undefined}>
      <article
        ref={tiltRef}
        className={`specimen-card flex flex-col gap-3 rounded-sm p-8 [transform-style:preserve-3d] ${
          forward ? 'md:p-10' : ''
        }`}
      >
        <p className="eyebrow">{service.eyebrow}</p>
        <h3 className="font-display text-2xl text-ink-900">{service.name}</h3>
        <p className="text-sm leading-relaxed text-ink-700">{service.description}</p>
        <a href={service.href} className="link-brass mt-2 w-fit text-sm text-ink-900">
          Explore →
        </a>
      </article>
    </div>
  )
}
