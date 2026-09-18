// Deliberately imports nothing from the `firebase` package: this file must
// stay cheap so it can be evaluated in the main bundle to decide whether
// cloud sync is configured, without pulling the SDK in for users who
// haven't set it up. The actual SDK lives behind loadFirebaseSync()'s
// dynamic import, in ./firebaseSync.

export const isCloudSyncConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID,
)

export const EMAIL_FOR_SIGN_IN_KEY = 'cds.emailForSignIn'

let modulePromise: Promise<typeof import('./firebaseSync')> | null = null

export function loadFirebaseSync() {
  if (!modulePromise) modulePromise = import('./firebaseSync')
  return modulePromise
}

export type FirebaseSync = Awaited<ReturnType<typeof loadFirebaseSync>>
