import { useEffect, useRef } from 'react'
import { services } from '../../lib/content'
import { ServiceCard } from '../ui/ServiceCard'
import { gsap } from '../../lib/gsap'

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const ctx = gsap.context(() => {
      // Plain opacity, not autoAlpha: autoAlpha also sets visibility:hidden,
      // which pulls the "Explore" links out of tab order until scrolled
      // into view. Keyboard users must be able to reach them regardless.
      gsap.from(grid.children, {
        y: 32,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'settle',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, grid)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="bg-hollow-800 px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="sr-only">Our Services</h2>
        <div ref={gridRef} className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} forward={i === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
