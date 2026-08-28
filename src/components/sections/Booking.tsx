import { useEffect, useState } from 'react'
import { bloomColors, budgetRanges, greeneryOptions } from '../../lib/content'
import { useConfigurator } from '../../lib/configurator-context'
import { VitrineMark } from '../ui/VitrineMark'
import { MaskReveal } from '../ui/MaskReveal'

export function Booking() {
  const { selection } = useConfigurator()
  const [submitted, setSubmitted] = useState(false)
  const [bloomPreferences, setBloomPreferences] = useState('')

  useEffect(() => {
    const bloomLabel = bloomColors.find((b) => b.id === selection.bloomId)?.label
    const greeneryLabel = greeneryOptions.find((g) => g.id === selection.greeneryId)?.label
    setBloomPreferences([bloomLabel, greeneryLabel].filter(Boolean).join(', '))
  }, [selection])

  return (
    <section id="booking" className="relative bg-hollow-950 px-6 py-32 text-linen-50 md:px-10">
      <VitrineMark filled className="absolute top-10 right-8 h-20 w-auto text-brass-400/70 md:right-16" />

      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Reserve</p>
        <MaskReveal as="h2" className="mt-4 font-display text-3xl md:text-4xl">
          {['Reserve Your Date']}
        </MaskReveal>
        <p className="mt-4 text-sm text-linen-100/70">
          We take a limited number of wedding dates each season — inquire early.
        </p>

        <div className="specimen-card mt-10 rounded-sm p-6 md:p-10">
          {submitted ? (
            <p role="status" className="py-6 text-base text-ink-900">
              Thank you — we’ll be in touch within two business days.
            </p>
          ) : (
            <form
              className="grid grid-cols-1 gap-6 text-ink-900 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <label className="field-wrap flex flex-col gap-1 text-sm">
                Name
                <input name="name" type="text" required autoComplete="name" className="field" />
              </label>
              <label className="field-wrap flex flex-col gap-1 text-sm">
                Wedding date
                <input name="date" type="date" required className="field" />
              </label>
              <label className="field-wrap flex flex-col gap-1 text-sm">
                Venue / city
                <input name="venue" type="text" required className="field" />
              </label>
              <label className="field-wrap flex flex-col gap-1 text-sm">
                Guest count
                <input name="guestCount" type="number" min={1} className="field" />
              </label>
              <label className="field-wrap flex flex-col gap-1 text-sm">
                Budget range
                <select name="budget" defaultValue="" className="field">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-wrap flex flex-col gap-1 text-sm">
                Bloom preferences
                <input
                  name="bloomPreferences"
                  type="text"
                  value={bloomPreferences}
                  onChange={(e) => setBloomPreferences(e.target.value)}
                  placeholder="e.g. Ivory, Eucalyptus"
                  className="field"
                />
              </label>
              <label className="field-wrap flex flex-col gap-1 text-sm md:col-span-2">
                Message
                <textarea name="message" rows={4} className="field" />
              </label>
              <button type="submit" className="btn btn-primary mt-2 w-fit md:col-span-2">
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
