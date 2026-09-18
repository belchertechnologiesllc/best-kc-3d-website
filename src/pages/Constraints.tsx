import { GROW_CAP, type OperatingConstraints } from '../types'

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number | null
  onChange: (v: number | null) => void
}) {
  return (
    <label className="block">
      <span className="font-label text-xs uppercase tracking-wide text-ink-500">{label}</span>
      <input
        type="number"
        className="field"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
      />
    </label>
  )
}

export function Constraints({
  constraints,
  setConstraints,
}: {
  constraints: OperatingConstraints
  setConstraints: (c: OperatingConstraints) => void
}) {
  function update(patch: Partial<OperatingConstraints>) {
    setConstraints({ ...constraints, ...patch })
  }

  function updateNotPursuing(index: number, value: string) {
    const next = [...constraints.notPursuing] as OperatingConstraints['notPursuing']
    next[index] = value
    update({ notPursuing: next })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <p className="eyebrow eyebrow-on-light">Page 4</p>
        <h1 className="font-display text-3xl text-ink-900">2027 Operating Constraints</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          The rules that stop you from recreating the mess.
        </p>
      </header>

      <div className="specimen-card space-y-6 rounded-sm p-6">
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            label="Maximum active business bets"
            value={constraints.maxActiveBusinessBets}
            onChange={(v) => update({ maxActiveBusinessBets: v })}
          />
          <NumberField
            label="Maximum volunteer leadership roles"
            value={constraints.maxVolunteerLeadershipRoles}
            onChange={(v) => update({ maxVolunteerLeadershipRoles: v })}
          />
          <NumberField
            label="Maximum hours/month donated professionally"
            value={constraints.maxHoursDonatedPerMonth}
            onChange={(v) => update({ maxHoursDonatedPerMonth: v })}
          />
          <NumberField
            label="Minimum protected family time/week (hrs)"
            value={constraints.minFamilyTimeHoursPerWeek}
            onChange={(v) => update({ minFamilyTimeHoursPerWeek: v })}
          />
          <NumberField
            label="Minimum exercise sessions/week"
            value={constraints.minExerciseSessionsPerWeek}
            onChange={(v) => update({ minExerciseSessionsPerWeek: v })}
          />
          <div className="block">
            <span className="font-label text-xs uppercase tracking-wide text-ink-500">
              Maximum GROW priorities
            </span>
            <p className="field text-ink-700">{GROW_CAP} (fixed)</p>
          </div>
        </div>

        <div className="rounded-sm border border-brass-400 bg-linen-50 px-3 py-2 text-sm text-ink-700">
          New recurring commitment requires removing one: <strong>YES</strong>
        </div>

        <label className="block">
          <span className="font-label text-xs uppercase tracking-wide text-ink-500">
            The primary economic engine I am building
          </span>
          <textarea
            className="field min-h-[3rem]"
            value={constraints.primaryEconomicEngine}
            onChange={(e) => update({ primaryEconomicEngine: e.target.value })}
          />
        </label>

        <div>
          <span className="font-label text-xs uppercase tracking-wide text-ink-500">
            The three things I am explicitly not pursuing
          </span>
          <div className="mt-2 space-y-2">
            {constraints.notPursuing.map((value, i) => (
              <input
                key={i}
                className="field"
                value={value}
                placeholder={`Not pursuing #${i + 1}`}
                onChange={(e) => updateNotPursuing(i, e.target.value)}
              />
            ))}
          </div>
        </div>

        <label className="block">
          <span className="font-label text-xs uppercase tracking-wide text-ink-500">
            What "enough" looks like for this season
          </span>
          <textarea
            className="field min-h-[3rem]"
            value={constraints.whatEnoughLooksLike}
            onChange={(e) => update({ whatEnoughLooksLike: e.target.value })}
          />
        </label>
      </div>
    </div>
  )
}
