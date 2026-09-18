import { useState } from 'react'
import { Nav, type Tab } from './components/Nav'
import { Inventory } from './pages/Inventory'
import { Scorecard } from './pages/Scorecard'
import { Portfolio } from './pages/Portfolio'
import { Constraints } from './pages/Constraints'
import { Review } from './pages/Review'
import { useLocalState } from './lib/storage'
import { defaultOperatingConstraints, type CommitmentItem, type OperatingConstraints, type ReviewEntry } from './types'

function App() {
  const [tab, setTab] = useState<Tab>('inventory')
  const [items, setItems] = useLocalState<CommitmentItem[]>('cds.items', () => [])
  const [constraints, setConstraints] = useLocalState<OperatingConstraints>(
    'cds.constraints',
    defaultOperatingConstraints,
  )
  const [reviews, setReviews] = useLocalState<ReviewEntry[]>('cds.reviews', () => [])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function openScorecard(id: string) {
    setSelectedId(id)
    setTab('scorecard')
  }

  return (
    <>
      <Nav active={tab} onChange={setTab} />
      <main>
        {tab === 'inventory' && (
          <Inventory items={items} setItems={setItems} openScorecard={openScorecard} />
        )}
        {tab === 'scorecard' && (
          <Scorecard
            items={items}
            setItems={setItems}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
        {tab === 'portfolio' && <Portfolio items={items} openScorecard={openScorecard} />}
        {tab === 'constraints' && (
          <Constraints constraints={constraints} setConstraints={setConstraints} />
        )}
        {tab === 'review' && <Review reviews={reviews} setReviews={setReviews} />}
      </main>
    </>
  )
}

export default App
