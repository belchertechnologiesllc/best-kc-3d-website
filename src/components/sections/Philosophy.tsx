import { philosophy } from '../../lib/content'
import { VitrineMark } from '../ui/VitrineMark'
import { MaskReveal } from '../ui/MaskReveal'

export function Philosophy() {
  return (
    <section id="philosophy" className="relative bg-linen-100 px-6 py-32 md:px-10">
      <VitrineMark className="absolute top-16 right-8 hidden h-24 w-auto text-brass-500/50 md:right-16 md:block" />

      <div className="mx-auto max-w-4xl md:mr-auto md:ml-16">
        <p className="eyebrow">{philosophy.eyebrow}</p>
        <MaskReveal as="div" className="mt-6 space-y-1">
          {philosophy.lines.map((line, i) => (
            <span
              key={line}
              className={`font-display text-3xl leading-tight md:text-5xl ${
                i === 1 ? 'text-ink-900 italic' : 'text-ink-900'
              }`}
            >
              {line}
            </span>
          ))}
        </MaskReveal>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-700">
          {philosophy.body}
        </p>
      </div>
    </section>
  )
}
