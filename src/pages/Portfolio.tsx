import { DECISIONS, GROW_CAP, type CommitmentItem } from '../types'
import { adjustedScore, growCount } from '../lib/scoring'

export function Portfolio({
  items,
  openScorecard,
}: {
  items: CommitmentItem[]
  openScorecard: (id: string) => void
}) {
  const unsorted = items.filter((i) => !i.decision)
  const grow = growCount(items)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <p className="eyebrow eyebrow-on-light">Page 3</p>
        <h1 className="font-display text-3xl text-ink-900">Portfolio</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          Everything, sorted into six boxes. This is the real output of the exercise.
        </p>
        <p className="no-print mt-1 max-w-2xl text-xs text-brass-700">
          Session 3 (60 min): prune. Choose at least three things to delegate, pause, simplify,
          or kill.
        </p>
      </header>

      {unsorted.length > 0 && (
        <p className="mb-4 rounded-sm border border-brass-400 bg-linen-50 px-3 py-2 text-sm text-ink-700">
          {unsorted.length} item{unsorted.length === 1 ? '' : 's'} still undecided — open them on
          the Scorecard page.
        </p>
      )}

      {grow > GROW_CAP && (
        <p className="mb-4 rounded-sm border border-red-400 bg-red-50 px-3 py-2 text-sm text-red-800">
          GROW has {grow} items — over the cap of {GROW_CAP}. Move some down before moving on.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DECISIONS.map((decision) => {
          const bucket = items.filter((i) => i.decision === decision)
          return (
            <div key={decision} className="specimen-card rounded-sm p-4">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-label text-sm uppercase tracking-wide text-ink-900">
                  {decision}
                </h2>
                <span className="text-xs text-ink-500">
                  {bucket.length}
                  {decision === 'GROW' ? ` / ${GROW_CAP}` : ''}
                </span>
              </div>
              <ul className="space-y-2">
                {bucket.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => openScorecard(item.id)}
                      className="link-brass w-full text-left text-sm text-ink-900"
                    >
                      {item.item || '(untitled)'}
                      <span className="ml-2 text-xs text-ink-500">
                        score {adjustedScore(item)}
                      </span>
                    </button>
                  </li>
                ))}
                {bucket.length === 0 && (
                  <li className="text-xs text-ink-500">Nothing here.</li>
                )}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
