import { useState } from 'react'
import type { User } from 'firebase/auth'
import { EMAIL_FOR_SIGN_IN_KEY, type FirebaseSync } from '../lib/firebase'

export type SyncStatus = 'offline' | 'signed-out' | 'loading' | 'syncing' | 'synced' | 'error'

export function AuthPanel({
  user,
  status,
  configured,
  sync,
}: {
  user: User | null
  status: SyncStatus
  configured: boolean
  sync: FirebaseSync | null
}) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (!configured) {
    return <span className="no-print whitespace-nowrap text-xs text-ink-500">Not synced</span>
  }

  if (!sync) {
    return <span className="no-print whitespace-nowrap text-xs text-ink-500">Loading sync…</span>
  }

  if (user) {
    return (
      <div className="no-print flex items-center gap-3 whitespace-nowrap text-xs text-ink-500">
        <span>{user.email}</span>
        <span className="capitalize">{status}</span>
        <button
          onClick={() => sync.signOutUser()}
          className="font-label uppercase tracking-wide text-ink-700 hover:text-ink-900"
        >
          Sign out
        </button>
      </div>
    )
  }

  if (sent) {
    return (
      <span className="no-print whitespace-nowrap text-xs text-ink-500">
        Check {email} for a sign-in link
      </span>
    )
  }

  return (
    <form
      className="no-print flex items-center gap-2"
      onSubmit={async (e) => {
        e.preventDefault()
        await sync.sendSignInLink(email)
        localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email)
        setSent(true)
      }}
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="field w-40 text-xs"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-ghost text-xs text-ink-900">
        Sync across devices
      </button>
    </form>
  )
}
