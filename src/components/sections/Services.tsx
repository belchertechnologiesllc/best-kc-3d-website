import { services } from '../../lib/content'

export function Services() {
  return (
    <section id="services" className="bg-hollow-800 px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="sr-only">Our Services</h2>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-8">
          {services.map((service, i) => (
            <article
              key={service.name}
              className={`specimen-card flex flex-col gap-3 rounded-sm p-8 ${
                i === 1 ? 'md:-translate-y-6 md:scale-105 md:p-10' : ''
              }`}
            >
              <p className="eyebrow">{service.eyebrow}</p>
              <h3 className="font-display text-2xl text-ink-900">{service.name}</h3>
              <p className="text-sm leading-relaxed text-ink-700">{service.description}</p>
              <a href={service.href} className="link-brass mt-2 w-fit text-sm text-ink-900">
                Explore →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
