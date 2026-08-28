import { bloomColors, greeneryOptions } from '../../lib/content'
import { useConfigurator } from '../../lib/configurator-context'

export function Configurator() {
  const { selection, setBloom, setGreenery } = useConfigurator()
  const bloom = bloomColors.find((b) => b.id === selection.bloomId)
  const greenery = greeneryOptions.find((g) => g.id === selection.greeneryId)

  return (
    <section id="configurator" className="bg-hollow-800 px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl text-center text-linen-50">
        <p className="eyebrow">Interactive</p>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Begin Your Arrangement</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-linen-100/70">
          Choose a bloom and a greenery — we’ll carry your picks into the form below.
        </p>

        <div className="mx-auto mt-12 flex h-56 w-40 items-end justify-center" aria-hidden="true">
          <svg viewBox="0 0 100 140" className="h-full w-full">
            {greenery && (
              <path
                d="M50 82 C 30 60, 20 40, 30 20 M50 82 C 70 60, 80 40, 70 20 M50 82 C 50 55, 50 35, 50 15"
                fill="none"
                stroke={greenery.swatch}
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
            {bloom && (
              <>
                <circle cx="50" cy="48" r="12" fill={bloom.swatch} />
                <circle cx="34" cy="58" r="9" fill={bloom.swatch} opacity="0.85" />
                <circle cx="66" cy="58" r="9" fill={bloom.swatch} opacity="0.85" />
              </>
            )}
            <path
              d="M28 82 L26 130 Q50 138 74 130 L72 82 Z"
              fill="none"
              stroke="currentColor"
              className="text-brass-400"
              strokeWidth="2"
            />
          </svg>
        </div>

        <fieldset className="mt-10">
          <legend className="eyebrow mx-auto w-fit">Bloom color</legend>
          <div className="mt-4 flex justify-center gap-5">
            {bloomColors.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={selection.bloomId === c.id}
                onClick={() => setBloom(c.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`block h-10 w-10 rounded-full border-2 transition-transform duration-300 ${
                    selection.bloomId === c.id
                      ? 'scale-110 border-brass-400'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.swatch }}
                />
                <span className="text-xs text-linen-100/80">{c.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="eyebrow mx-auto w-fit">Greenery</legend>
          <div className="mt-4 flex justify-center gap-5">
            {greeneryOptions.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={selection.greeneryId === g.id}
                onClick={() => setGreenery(g.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`block h-10 w-10 rounded-full border-2 transition-transform duration-300 ${
                    selection.greeneryId === g.id
                      ? 'scale-110 border-brass-400'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: g.swatch }}
                />
                <span className="text-xs text-linen-100/80">{g.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <a href="#booking" className="btn btn-primary mt-12">
          Send This to Your Florist
        </a>
      </div>
    </section>
  )
}
