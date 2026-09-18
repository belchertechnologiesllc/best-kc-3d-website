import { useEffect, useRef, useState } from 'react'
import type { User } from 'firebase/auth'
import { Nav, type Tab } from './components/Nav'
import { AuthPanel, type SyncStatus } from './components/AuthPanel'
import { Inventory } from './pages/Inventory'
import { Scorecard } from './pages/Scorecard'
import { Portfolio } from './pages/Portfolio'
import { Constraints } from './pages/Constraints'
import { Review } from './pages/Review'
import { useLocalState } from './lib/storage'
import { EMAIL_FOR_SIGN_IN_KEY, isCloudSyncConfigured, loadFirebaseSync, type FirebaseSync } from './lib/firebase'
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

  const [sync, setSync] = useState<FirebaseSync | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(
    isCloudSyncConfigured ? 'signed-out' : 'offline',
  )
  const hasLoadedRemote = useRef(false)

  // Load the Firebase SDK on demand — only when cloud sync is configured —
  // so unconfigured users never pay for it.
  useEffect(() => {
    if (!isCloudSyncConfigured) return
    loadFirebaseSync().then(setSync)
  }, [])

  // Complete a passwordless email-link sign-in if this load is the redirect
  // back from that link.
  useEffect(() => {
    if (!sync) return
    if (!sync.isEmailLinkUrl()) return
    let email = localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY)
    if (!email) email = window.prompt('Confirm your email to finish signing in')
    if (!email) return
    sync
      .completeEmailLinkSignIn(email)
      .then(() => {
        localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY)
        window.history.replaceState({}, '', window.location.pathname)
      })
      .catch(() => setSyncStatus('error'))
  }, [sync])

  useEffect(() => {
    if (!sync) return
    return sync.onAuth((next) => {
      hasLoadedRemote.current = false
      setUser(next)
      if (!next) setSyncStatus('signed-out')
    })
  }, [sync])

  // On sign-in: pull the remote snapshot (if any) down before any local
  // edit is allowed to push back up and clobber it.
  useEffect(() => {
    if (!sync || !user) return
    let cancelled = false
    setSyncStatus('loading')
    sync
      .loadSnapshot(user.uid)
      .then((remote) => {
        if (cancelled) return
        if (remote) {
          if (remote.items) setItems(remote.items)
          if (remote.constraints) setConstraints(remote.constraints)
          if (remote.reviews) setReviews(remote.reviews)
        }
        hasLoadedRemote.current = true
        setSyncStatus('synced')
      })
      .catch(() => setSyncStatus('error'))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sync, user])

  // Push local edits up, debounced, once the initial remote pull has
  // completed (so we never overwrite a remote snapshot with a stale local
  // one before it's had a chance to load).
  useEffect(() => {
    if (!sync || !user || !hasLoadedRemote.current) return
    setSyncStatus('syncing')
    const timeout = setTimeout(() => {
      sync
        .pushSnapshot(user.uid, { items, constraints, reviews })
        .then(() => setSyncStatus('synced'))
        .catch(() => setSyncStatus('error'))
    }, SYNC_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [items, constraints, reviews, sync, user])

  function openScorecard(id: string) {
    setSelectedId(id)
    setTab('scorecard')
  }

  return (
    <>
      <Nav
        active={tab}
        onChange={setTab}
        rightSlot={
          <AuthPanel user={user} status={syncStatus} configured={isCloudSyncConfigured} sync={sync} />
        }
      />
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
