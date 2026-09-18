import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cloud sync is optional: with no env vars set, the app stays fully
// functional on localStorage alone (see AuthPanel / App's sync effect).
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null

export interface AppStateRow {
  items: unknown
  constraints: unknown
  reviews: unknown
}
