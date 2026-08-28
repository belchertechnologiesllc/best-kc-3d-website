import { hero } from '../../lib/content'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-hollow-950 px-6 text-center text-linen-50"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 18%, rgba(201,166,107,0.16) 0%, rgba(201,166,107,0.04) 35%, transparent 65%), radial-gradient(80% 60% at 50% 100%, rgba(12,26,19,0.9) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <p className="eyebrow">Kansas City · Est. Atelier</p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] font-medium md:text-6xl">
          Every arrangement begins with{' '}
          <em className="font-normal text-brass-300 italic">structure</em>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-linen-100/80 md:text-lg">
          {hero.subheadline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={hero.primaryCta.href} className="btn btn-primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn-ghost">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 bg-linen-100/30"
        aria-hidden="true"
      />
    </section>
  )
}
