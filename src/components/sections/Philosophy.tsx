import { philosophy } from '../../lib/content'

export function Philosophy() {
  return (
    <section id="philosophy" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl md:ml-16 md:mr-auto">
        <p className="text-sm tracking-[0.2em] uppercase">{philosophy.eyebrow}</p>
        <div className="mt-6 space-y-2">
          {philosophy.lines.map((line) => (
            <p key={line} className="text-3xl md:text-5xl">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 max-w-xl text-base leading-relaxed">{philosophy.body}</p>
      </div>
    </section>
  )
}
