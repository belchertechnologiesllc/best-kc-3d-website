import { useEffect, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Nav, type Tab } from './components/Nav'
import { AuthPanel, type SyncStatus } from './components/AuthPanel'
import { Inventory } from './pages/Inventory'
import { Scorecard } from './pages/Scorecard'
import { Portfolio } from './pages/Portfolio'
import { Constraints } from './pages/Constraints'
import { Review } from './pages/Review'
import { useLocalState } from './lib/storage'
import { supabase } from './lib/supabase'
import {
  defaultOperatingConstraints,
  type CommitmentItem,
  type OperatingConstraints,
  type ReviewEntry,
} from './types'

const SYNC_DEBOUNCE_MS = 800

function App() {
  const [tab, setTab] = useState<Tab>('inventory')
  const [items, setItems] = useLocalState<CommitmentItem[]>('cds.items', () => [])
  const [constraints, setConstraints] = useLocalState<OperatingConstraints>(
    'cds.constraints',
    defaultOperatingConstraints,
  )
  const [reviews, setReviews] = useLocalState<ReviewEntry[]>('cds.reviews', () => [])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [session, setSession] = useState<Session | null>(null)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(supabase ? 'signed-out' : 'offline')
  const hasLoadedRemote = useRef(false)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, next) => {
      hasLoadedRemote.current = false
      setSession(next)
      if (!next) setSyncStatus('signed-out')
    })
    return () => subscription.subscription.unsubscribe()
  }, [])

  // On sign-in: pull the remote snapshot (if any) down before any local
  // edit is allowed to push back up and clobber it.
  useEffect(() => {
    if (!supabase || !session) return
    let cancelled = false
    setSyncStatus('loading')
    supabase
      .from('app_state')
      .select('data')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setSyncStatus('error')
          return
        }
        const remote = data?.data as
          | { items?: CommitmentItem[]; constraints?: OperatingConstraints; reviews?: ReviewEntry[] }
          | undefined
        if (remote) {
          if (remote.items) setItems(remote.items)
          if (remote.constraints) setConstraints(remote.constraints)
          if (remote.reviews) setReviews(remote.reviews)
        }
        hasLoadedRemote.current = true
        setSyncStatus('synced')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  // Push local edits up, debounced, once the initial remote pull has
  // completed (so we never overwrite a remote snapshot with a stale local
  // one before it's had a chance to load).
  useEffect(() => {
    if (!supabase || !session || !hasLoadedRemote.current) return
    setSyncStatus('syncing')
    const timeout = setTimeout(() => {
      supabase!
        .from('app_state')
        .upsert({
          user_id: session.user.id,
          data: { items, constraints, reviews },
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => setSyncStatus(error ? 'error' : 'synced'))
    }, SYNC_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [items, constraints, reviews, session])

  function openScorecard(id: string) {
    setSelectedId(id)
    setTab('scorecard')
  }

  return (
    <>
      <Nav active={tab} onChange={setTab} rightSlot={<AuthPanel session={session} status={syncStatus} />} />
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
