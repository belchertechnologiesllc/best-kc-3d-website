import { services } from '../../lib/content'

export function Services() {
  return (
    <section id="services" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="sr-only">Our Services</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.name}
              data-center={i === 1}
              className="flex flex-col gap-3 p-8 md:data-[center=true]:-translate-y-4"
            >
              <p className="text-xs tracking-[0.2em] uppercase">{service.eyebrow}</p>
              <h3 className="text-2xl">{service.name}</h3>
              <p className="text-sm leading-relaxed">{service.description}</p>
              <a href={service.href} className="mt-2 text-sm">
                Explore →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
