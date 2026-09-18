import { useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type SyncStatus = 'offline' | 'signed-out' | 'loading' | 'syncing' | 'synced' | 'error'

export function AuthPanel({ session, status }: { session: Session | null; status: SyncStatus }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (!supabase) {
    return <span className="no-print whitespace-nowrap text-xs text-ink-500">Not synced</span>
  }

  if (session) {
    return (
      <div className="no-print flex items-center gap-3 whitespace-nowrap text-xs text-ink-500">
        <span>{session.user.email}</span>
        <span className="capitalize">{status}</span>
        <button
          onClick={() => supabase!.auth.signOut()}
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
        const { error } = await supabase!.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        })
        if (!error) setSent(true)
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
