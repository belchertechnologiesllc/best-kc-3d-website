import type { CommitmentItem } from '../types'
import { newCommitmentItem } from '../types'

const FIVE = [1, 2, 3, 4, 5] as const
const FAMILY_IMPACT = [-2, -1, 0, 1, 2] as const

export function Inventory({
  items,
  setItems,
  openScorecard,
}: {
  items: CommitmentItem[]
  setItems: (items: CommitmentItem[]) => void
  openScorecard: (id: string) => void
}) {
  function update(id: string, patch: Partial<CommitmentItem>) {
    setItems(
      items.map((i) => (i.id === id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i)),
    )
  }

  function addRow() {
    const item = newCommitmentItem()
    setItems([...items, item])
  }

  function removeRow(id: string) {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <p className="eyebrow eyebrow-on-light">Page 1</p>
        <h1 className="font-display text-3xl text-ink-900">Master Commitment Inventory</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          One line per commitment, business, responsibility, system, project, or recurring
          obligation. No paragraphs. Nothing gets analyzed until it is on this list.
        </p>
        <p className="no-print mt-1 max-w-2xl text-xs text-brass-700">
          Session 1 (60 min): capture everything. No decisions yet — that happens on the
          Scorecard and Portfolio pages.
        </p>
      </header>

      <div className="specimen-card overflow-x-auto rounded-sm">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-linen-300 text-left font-label text-xs uppercase tracking-wide text-ink-500">
              <th className="px-3 py-3">Item</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3 text-right">Hrs/Mo</th>
              <th className="px-3 py-3 text-right">$ Impact</th>
              <th className="px-3 py-3">Mental Load</th>
              <th className="px-3 py-3">Family Impact</th>
              <th className="px-3 py-3">Strategic Value</th>
              <th className="px-3 py-3">Must Be Me?</th>
              <th className="no-print px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-linen-200 align-middle">
                <td className="px-3 py-2">
                  <input
                    className="field w-40"
                    value={item.item}
                    placeholder="Item name"
                    onChange={(e) => update(item.id, { item: e.target.value })}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="field w-32"
                    value={item.category}
                    placeholder="Category"
                    onChange={(e) => update(item.id, { category: e.target.value })}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    className="field w-20 text-right"
                    value={item.hrsPerMonth}
                    onChange={(e) => update(item.id, { hrsPerMonth: Number(e.target.value) })}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    className="field w-24 text-right"
                    value={item.dollarImpact}
                    onChange={(e) => update(item.id, { dollarImpact: Number(e.target.value) })}
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    className="field w-16"
                    value={item.mentalLoad}
                    onChange={(e) =>
                      update(item.id, { mentalLoad: Number(e.target.value) as CommitmentItem['mentalLoad'] })
                    }
                  >
                    {FIVE.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    className="field w-16"
                    value={item.familyImpact}
                    onChange={(e) =>
                      update(item.id, {
                        familyImpact: Number(e.target.value) as CommitmentItem['familyImpact'],
                      })
                    }
                  >
                    {FAMILY_IMPACT.map((n) => (
                      <option key={n} value={n}>
                        {n > 0 ? `+${n}` : n}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    className="field w-16"
                    value={item.strategicValue}
                    onChange={(e) =>
                      update(item.id, {
                        strategicValue: Number(e.target.value) as CommitmentItem['strategicValue'],
                      })
                    }
                  >
                    {FIVE.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.mustBeMe}
                    onChange={(e) => update(item.id, { mustBeMe: e.target.checked })}
                  />
                </td>
                <td className="no-print px-3 py-2 text-right">
                  <button
                    onClick={() => openScorecard(item.id)}
                    className="link-brass mr-3 font-label text-xs uppercase tracking-wide"
                  >
                    Score
                  </button>
                  <button
                    onClick={() => removeRow(item.id)}
                    className="font-label text-xs uppercase tracking-wide text-ink-500 hover:text-ink-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-sm text-ink-500">
                  Nothing captured yet. Add every commitment, business, responsibility, system,
                  project, and recurring obligation — one line each.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button onClick={addRow} className="btn btn-ghost no-print mt-4 text-ink-900">
        + Add commitment
      </button>
    </div>
  )
}
