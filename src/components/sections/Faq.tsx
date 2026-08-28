import { faqItems } from '../../lib/content'
import { FaqItem } from '../ui/FaqItem'
import { MaskReveal } from '../ui/MaskReveal'

export function Faq() {
  return (
    <section id="faq" className="bg-hollow-900 px-6 py-32 text-linen-50 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Questions</p>
        <MaskReveal as="h2" className="mt-4 font-display text-3xl md:text-4xl">
          {['Before you inquire']}
        </MaskReveal>

        <div className="glass-panel mt-10 divide-y divide-linen-100/10 rounded-sm px-6">
          {faqItems.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
