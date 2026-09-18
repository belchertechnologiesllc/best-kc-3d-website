import { DECISIONS, GROW_CAP, type CommitmentItem, type Decision, type ScoreValue } from '../types'
import { adjustedScore, growCount, penaltyTotal, rawScore } from '../lib/scoring'

const QUESTIONS: { key: keyof CommitmentItem; text: string }[] = [
  { key: 'qFamilyFuture', text: 'Does this materially improve our family or future?' },
  { key: 'qIncomeLeverage', text: 'Does this create meaningful income, equity, or leverage?' },
  { key: 'qUniquelyValuable', text: 'Am I unusually valuable doing this?' },
  { key: 'qEnergizes', text: 'Does this energize rather than drain me?' },
  { key: 'qChooseAgain', text: 'Would I knowingly choose this again today?' },
]

const PENALTIES: { key: keyof CommitmentItem; text: string }[] = [
  { key: 'penaltyInvadesFamilyTime', text: 'Regularly invades family time' },
  { key: 'penaltyMentalLoadOutsideWork', text: 'Creates substantial mental load outside the actual work' },
  { key: 'penaltySomeoneElseCouldOwn', text: 'Someone else could reasonably own it' },
]

export function Scorecard({
  items,
  setItems,
  selectedId,
  setSelectedId,
}: {
  items: CommitmentItem[]
  setItems: (items: CommitmentItem[]) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}) {
  const item = items.find((i) => i.id === selectedId) ?? null

  function update(patch: Partial<CommitmentItem>) {
    if (!item) return
    setItems(
      items.map((i) => (i.id === item.id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i)),
    )
  }

  function setDecision(decision: Decision) {
    if (!item) return
    if (decision === 'GROW' && item.decision !== 'GROW' && growCount(items) >= GROW_CAP) {
      window.alert(
        `GROW is capped at ${GROW_CAP} items. Move another GROW item to KEEP, DELEGATE, SIMPLIFY, PAUSE, or KILL first — that constraint matters more than the scoring math.`,
      )
      return
    }
    update({ decision })
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink-500">
        Capture at least one commitment on the Inventory page first.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <p className="eyebrow eyebrow-on-light">Page 2</p>
        <h1 className="font-display text-3xl text-ink-900">Decision Scorecard</h1>
        <p className="no-print mt-1 max-w-2xl text-xs text-brass-700">
          Session 2 (90 min): score and classify. Force every item into one bucket.
        </p>
      </header>

      <div className="no-print mb-6">
        <label className="mb-1 block font-label text-xs uppercase tracking-wide text-ink-500">
          Item
        </label>
        <select
          className="field"
          value={selectedId ?? ''}
          onChange={(e) => setSelectedId(e.target.value || null)}
        >
          <option value="" disabled>
            Choose a commitment…
          </option>
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.item || '(untitled)'}
            </option>
          ))}
        </select>
      </div>

      {item && (
        <div className="specimen-card space-y-8 rounded-sm p-6">
          <div>
            <h2 className="font-display text-2xl text-ink-900">{item.item || '(untitled)'}</h2>
            <div className="field-wrap mt-3">
              <textarea
                className="field min-h-[3rem]"
                placeholder="Purpose — why does this exist?"
                value={item.purpose}
                onChange={(e) => update({ purpose: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <label className="block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Hrs/month
              </span>
              <input
                type="number"
                className="field"
                value={item.hrsPerMonth}
                onChange={(e) => update({ hrsPerMonth: Number(e.target.value) })}
              />
            </label>
            <label className="block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Money produced/saved
              </span>
              <input
                type="number"
                className="field"
                value={item.dollarImpact}
                onChange={(e) => update({ dollarImpact: Number(e.target.value) })}
              />
            </label>
            <label className="block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Mental load
              </span>
              <select
                className="field"
                value={item.mentalLoad}
                onChange={(e) =>
                  update({ mentalLoad: Number(e.target.value) as CommitmentItem['mentalLoad'] })
                }
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Family impact
              </span>
              <select
                className="field"
                value={item.familyImpact}
                onChange={(e) =>
                  update({
                    familyImpact: Number(e.target.value) as CommitmentItem['familyImpact'],
                  })
                }
              >
                {[-2, -1, 0, 1, 2].map((n) => (
                  <option key={n} value={n}>
                    {n > 0 ? `+${n}` : n}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Strategic importance
              </span>
              <select
                className="field"
                value={item.strategicValue}
                onChange={(e) =>
                  update({
                    strategicValue: Number(e.target.value) as CommitmentItem['strategicValue'],
                  })
                }
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Could someone else do this?
              </span>
              <div className="mt-1 flex gap-2">
                {(['Yes', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update({ mustBeMe: opt === 'No' })}
                    className={`btn font-label text-xs ${
                      (opt === 'No') === item.mustBeMe
                        ? 'bg-hollow-800 text-linen-50'
                        : 'btn-ghost text-ink-900'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </label>
            <label className="col-span-2 block">
              <span className="font-label text-xs uppercase tracking-wide text-ink-500">
                Would I choose this again today?
              </span>
              <p className="mt-1 text-sm text-ink-700">
                {item.qChooseAgain >= 1 ? 'Yes' : 'No'}
                <span className="ml-2 text-xs text-ink-500">
                  (set via the scored question below)
                </span>
              </p>
            </label>
          </div>

          <div>
            <h3 className="mb-3 font-label text-xs uppercase tracking-wide text-ink-500">
              Step 2 — Score (0–2 each, total /10)
            </h3>
            <div className="space-y-3">
              {QUESTIONS.map((q) => (
                <div key={q.key} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-ink-900">{q.text}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((n) => (
                      <button
                        key={n}
                        onClick={() => update({ [q.key]: n as ScoreValue })}
                        className={`h-8 w-8 rounded-sm font-label text-xs ${
                          item[q.key] === n
                            ? 'bg-brass-500 text-ink-900'
                            : 'border border-linen-300 text-ink-500 hover:border-brass-400'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-label text-xs uppercase tracking-wide text-ink-500">
              Penalties (−2 each)
            </h3>
            <div className="space-y-2">
              {PENALTIES.map((p) => (
                <label key={p.key} className="flex items-center gap-2 text-sm text-ink-900">
                  <input
                    type="checkbox"
                    checked={Boolean(item[p.key])}
                    onChange={(e) => update({ [p.key]: e.target.checked })}
                  />
                  {p.text}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-sm border border-linen-300 bg-linen-50 px-4 py-3">
            <span className="font-label text-xs uppercase tracking-wide text-ink-500">
              Raw {rawScore(item)}/10 · Penalties {penaltyTotal(item)}
            </span>
            <span className="font-display text-2xl text-ink-900">
              Adjusted score: {adjustedScore(item)}
            </span>
          </div>

          <div>
            <h3 className="mb-3 font-label text-xs uppercase tracking-wide text-ink-500">
              Step 3 — Decide
            </h3>
            <div className="flex flex-wrap gap-2">
              {DECISIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDecision(d)}
                  className={`btn font-label text-xs ${
                    item.decision === d ? 'bg-hollow-800 text-linen-50' : 'btn-ghost text-ink-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-ink-500">
              GROW: {growCount(items)}/{GROW_CAP} used.
            </p>
          </div>

          <label className="block">
            <span className="font-label text-xs uppercase tracking-wide text-ink-500">
              Next action
            </span>
            <input
              className="field"
              value={item.nextAction}
              placeholder="What happens next, concretely"
              onChange={(e) => update({ nextAction: e.target.value })}
            />
          </label>
        </div>
      )}
    </div>
  )
}
