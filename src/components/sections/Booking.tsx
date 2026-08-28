import { useEffect, useState } from 'react'
import { bloomColors, budgetRanges, greeneryOptions } from '../../lib/content'
import { useConfigurator } from '../../lib/configurator-context'

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
    <section id="booking" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl">Reserve Your Date</h2>
        <p className="mt-4 text-sm">
          We take a limited number of wedding dates each season — inquire early.
        </p>

        {submitted ? (
          <p role="status" className="mt-10 text-base">
            Thank you — we’ll be in touch within two business days.
          </p>
        ) : (
          <form
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <label className="flex flex-col gap-1 text-sm">
              Name
              <input name="name" type="text" required autoComplete="name" className="px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Wedding date
              <input name="date" type="date" required className="px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Venue / city
              <input name="venue" type="text" required className="px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Guest count
              <input name="guestCount" type="number" min={1} className="px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Budget range
              <select name="budget" defaultValue="" className="px-3 py-2">
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
            <label className="flex flex-col gap-1 text-sm">
              Bloom preferences
              <input
                name="bloomPreferences"
                type="text"
                value={bloomPreferences}
                onChange={(e) => setBloomPreferences(e.target.value)}
                placeholder="e.g. Ivory, Eucalyptus"
                className="px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              Message
              <textarea name="message" rows={4} className="px-3 py-2" />
            </label>
            <button type="submit" className="mt-2 px-6 py-3 text-sm md:col-span-2 md:justify-self-start">
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
