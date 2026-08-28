import { hero } from '../../lib/content'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="max-w-3xl text-4xl md:text-6xl">{hero.headline}</h1>
      <p className="mt-6 max-w-xl text-lg">{hero.subheadline}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href={hero.primaryCta.href} className="px-6 py-3">
          {hero.primaryCta.label}
        </a>
        <a href={hero.secondaryCta.href} className="px-6 py-3">
          {hero.secondaryCta.label}
        </a>
      </div>
    </section>
  )
}
