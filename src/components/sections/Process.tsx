import { processStages } from '../../lib/content'

export function Process() {
  return (
    <section id="process" className="bg-hollow-900 px-6 py-32 text-linen-50 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">The Process</p>
        <h2 className="mt-4 max-w-lg font-display text-3xl md:text-4xl">
          How a season comes together
        </h2>

        <ol className="relative mt-20 flex flex-col gap-12 md:flex-row md:gap-4">
          <div
            className="absolute top-2 bottom-2 left-2 w-px bg-brass-500/30 md:top-2 md:right-2 md:bottom-auto md:left-2 md:h-px md:w-auto"
            aria-hidden="true"
          />

          {processStages.map((stage, i) => (
            <li key={stage.code} className="relative flex flex-1 flex-col gap-3 pl-8 md:pl-0">
              <span
                className="absolute top-0 left-0 h-4 w-4 rounded-full border-2 border-brass-400 bg-hollow-900 md:relative md:mb-3"
                aria-hidden="true"
              />
              <span className="font-label text-xs tracking-[0.2em] text-brass-300">
                0{i + 1} · {stage.code}
              </span>
              <h3 className="font-display text-lg">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-linen-100/70">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
