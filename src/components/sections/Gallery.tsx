import { galleryItems } from '../../lib/content'

const swatches = ['#2c4f38', '#8c6f42', '#3a5240', '#b3603f', '#24462f', '#7c8d6b']

export function Gallery() {
  return (
    <section id="gallery" className="bg-linen-100 px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Proof</p>
        <h2 className="mt-4 font-display text-3xl text-ink-900 md:text-4xl">
          Real weddings, real rooms
        </h2>

        <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-6">
          {galleryItems.map((item, i) => (
            <figure
              key={item.couple}
              className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-sm border border-linen-300 bg-linen-50 shadow-[0_20px_40px_-28px_rgba(12,26,19,0.5)]"
            >
              <div
                className="aspect-3/4 w-full"
                style={{
                  background: `linear-gradient(160deg, ${swatches[i % swatches.length]}22 0%, ${swatches[i % swatches.length]}55 100%)`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 border border-white/10" />
              <figcaption className="p-4">
                <p className="font-display text-base text-ink-900">{item.couple}</p>
                <p className="eyebrow mt-1">{item.venue}</p>
                {item.quote && (
                  <p className="mt-3 text-sm text-ink-700 italic">“{item.quote}”</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
