import { galleryItems } from '../../lib/content'

export function Gallery() {
  return (
    <section id="gallery" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl">Real weddings, real rooms</h2>
        <div className="mt-12 flex gap-6 overflow-x-auto pb-6">
          {galleryItems.map((item) => (
            <figure key={item.couple} className="w-72 shrink-0">
              <div className="aspect-3/4 w-full" />
              <figcaption className="mt-3">
                <p className="text-sm">{item.couple}</p>
                <p className="text-xs">{item.venue}</p>
                {item.quote && <p className="mt-2 text-sm italic">“{item.quote}”</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
