import { faqItems } from '../../lib/content'

export function Faq() {
  return (
    <section id="faq" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl">Questions before you inquire</h2>
        <div className="mt-10 divide-y">
          {faqItems.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-base">{item.question}</span>
                <span aria-hidden="true" className="shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
