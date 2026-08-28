import { galleryItems } from '../../lib/content'
import { GalleryTile } from '../ui/GalleryTile'
import { MaskReveal } from '../ui/MaskReveal'

const swatches = ['#2c4f38', '#8c6f42', '#3a5240', '#b3603f', '#24462f', '#7c8d6b']

export function Gallery() {
  return (
    <section id="gallery" className="bg-linen-100 px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Proof</p>
        <MaskReveal as="h2" className="mt-4 font-display text-3xl text-ink-900 md:text-4xl">
          {['Real weddings, real rooms']}
        </MaskReveal>

        <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-6">
          {galleryItems.map((item, i) => (
            <GalleryTile key={item.couple} item={item} swatch={swatches[i % swatches.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}
