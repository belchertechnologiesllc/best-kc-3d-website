import { bloomColors, greeneryOptions } from '../../lib/content'
import { useConfigurator } from '../../lib/configurator-context'

export function Configurator() {
  const { selection, setBloom, setGreenery } = useConfigurator()

  return (
    <section id="configurator" className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl">Begin Your Arrangement</h2>
        <p className="mt-4 text-sm">
          Choose a bloom and a greenery — we’ll carry your picks into the form below.
        </p>

        <div className="mx-auto mt-12 h-56 w-40" aria-hidden="true" />

        <fieldset className="mt-10">
          <legend className="text-xs tracking-[0.2em] uppercase">Bloom color</legend>
          <div className="mt-4 flex justify-center gap-4">
            {bloomColors.map((bloom) => (
              <button
                key={bloom.id}
                type="button"
                aria-pressed={selection.bloomId === bloom.id}
                onClick={() => setBloom(bloom.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className="block h-10 w-10 rounded-full"
                  style={{ backgroundColor: bloom.swatch }}
                />
                <span className="text-xs">{bloom.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-xs tracking-[0.2em] uppercase">Greenery</legend>
          <div className="mt-4 flex justify-center gap-4">
            {greeneryOptions.map((greenery) => (
              <button
                key={greenery.id}
                type="button"
                aria-pressed={selection.greeneryId === greenery.id}
                onClick={() => setGreenery(greenery.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className="block h-10 w-10 rounded-full"
                  style={{ backgroundColor: greenery.swatch }}
                />
                <span className="text-xs">{greenery.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <a href="#booking" className="mt-12 inline-block px-6 py-3">
          Send This to Your Florist
        </a>
      </div>
    </section>
  )
}
