import { processStages } from '../../lib/content'

export function Process() {
  return (
    <section id="process" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl">How a season comes together</h2>
        <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-4">
          {processStages.map((stage, i) => (
            <li key={stage.code} className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.2em]">
                0{i + 1} · {stage.code}
              </span>
              <h3 className="text-lg">{stage.title}</h3>
              <p className="text-sm leading-relaxed">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
