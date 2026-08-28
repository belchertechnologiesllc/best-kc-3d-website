import { faqItems } from '../../lib/content'

export function Faq() {
  return (
    <section id="faq" className="bg-hollow-900 px-6 py-32 text-linen-50 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Before you inquire</h2>

        <div className="glass-panel mt-10 divide-y divide-linen-100/10 rounded-sm px-6">
          {faqItems.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-base">{item.question}</span>
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-brass-400">
                  <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90" />
                </span>
              </summary>
              <p className="mt-3 pb-1 text-sm leading-relaxed text-linen-100/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
