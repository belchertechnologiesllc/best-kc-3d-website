import { useState } from 'react'
import { makeId, type ReviewEntry } from '../types'

const QUESTIONS: { key: keyof ReviewEntry; text: string }[] = [
  { key: 'whatEnteredThisMonth', text: 'What entered my life this month?' },
  { key: 'whatBecameMoreExpensive', text: 'What became more expensive than expected?' },
  {
    key: 'whatSomeoneElseCouldOwn',
    text: 'What am I still doing that someone else could own?',
  },
  {
    key: 'whatAmIMaintainingPurely',
    text: 'What am I maintaining purely because I already invested in it?',
  },
  { key: 'whatShouldMoveToPauseOrKill', text: 'What should move to PAUSE or KILL?' },
  { key: 'didAnythingEarnGrow', text: 'Did anything new earn the right to become GROW?' },
]

function emptyDraft(month: string): ReviewEntry {
  return {
    id: makeId(),
    month,
    whatEnteredThisMonth: '',
    whatBecameMoreExpensive: '',
    whatSomeoneElseCouldOwn: '',
    whatAmIMaintainingPurely: '',
    whatShouldMoveToPauseOrKill: '',
    didAnythingEarnGrow: '',
    createdAt: new Date().toISOString(),
  }
}

export function Review({
  reviews,
  setReviews,
}: {
  reviews: ReviewEntry[]
  setReviews: (reviews: ReviewEntry[]) => void
}) {
  const currentMonth = new Date().toISOString().slice(0, 7)
  const [draft, setDraft] = useState<ReviewEntry>(() => emptyDraft(currentMonth))

  function saveDraft() {
    setReviews([draft, ...reviews.filter((r) => r.id !== draft.id)])
    setDraft(emptyDraft(currentMonth))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <p className="eyebrow eyebrow-on-light">Monthly</p>
        <h1 className="font-display text-3xl text-ink-900">Review</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          One 30-minute review, monthly. Only ask these six questions.
        </p>
      </header>

      <div className="specimen-card space-y-4 rounded-sm p-6">
        <label className="block">
          <span className="font-label text-xs uppercase tracking-wide text-ink-500">Month</span>
          <input
            className="field"
            value={draft.month}
            onChange={(e) => setDraft({ ...draft, month: e.target.value })}
          />
        </label>
        {QUESTIONS.map((q) => (
          <label key={q.key} className="block">
            <span className="text-sm text-ink-900">{q.text}</span>
            <textarea
              className="field min-h-[2.5rem]"
              value={draft[q.key] as string}
              onChange={(e) => setDraft({ ...draft, [q.key]: e.target.value })}
            />
          </label>
        ))}
        <div className="rounded-sm border border-brass-400 bg-linen-50 px-3 py-2 text-sm text-ink-700">
          A new recurring commitment must replace an old recurring commitment. No net expansion
          without an explicit decision.
        </div>
        <button onClick={saveDraft} className="btn btn-primary">
          Save this month's review
        </button>
      </div>

      {reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-label text-xs uppercase tracking-wide text-ink-500">
            History
          </h2>
          <div className="space-y-3">
            {reviews.map((r) => (
              <details key={r.id} className="specimen-card rounded-sm p-4">
                <summary className="cursor-pointer font-label text-sm uppercase tracking-wide text-ink-900">
                  {r.month}
                </summary>
                <dl className="mt-3 space-y-2 text-sm">
                  {QUESTIONS.map((q) => (
                    <div key={q.key}>
                      <dt className="text-xs text-ink-500">{q.text}</dt>
                      <dd className="text-ink-900">{(r[q.key] as string) || '—'}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
