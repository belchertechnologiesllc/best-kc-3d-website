export type Tab = 'inventory' | 'scorecard' | 'portfolio' | 'constraints' | 'review'

const TABS: { id: Tab; label: string; page: string }[] = [
  { id: 'inventory', label: 'Inventory', page: 'Page 1' },
  { id: 'scorecard', label: 'Scorecard', page: 'Page 2' },
  { id: 'portfolio', label: 'Portfolio', page: 'Page 3' },
  { id: 'constraints', label: 'Constraints', page: 'Page 4' },
  { id: 'review', label: 'Review', page: 'Monthly' },
]

export function Nav({
  active,
  onChange,
  rightSlot,
}: {
  active: Tab
  onChange: (tab: Tab) => void
  rightSlot?: React.ReactNode
}) {
  return (
    <nav className="no-print sticky top-0 z-10 border-b border-linen-300 bg-linen-100/95 backdrop-blur">
      <div className="flex items-center gap-1 overflow-x-auto px-4 py-3">
        <span className="eyebrow-on-light eyebrow mr-3 whitespace-nowrap">Commitment System</span>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`whitespace-nowrap rounded-sm px-3 py-1.5 font-label text-xs tracking-wide uppercase transition-colors ${
              active === tab.id
                ? 'bg-hollow-800 text-linen-50'
                : 'text-ink-700 hover:bg-linen-200'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 opacity-60">{tab.page}</span>
          </button>
        ))}
        {rightSlot && <div className="ml-auto pl-3">{rightSlot}</div>}
      </div>
    </nav>
  )
}
