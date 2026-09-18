// Only ever reached via the dynamic import() in ./firebase, so the
// (sizeable) Firebase SDK never enters the main bundle for users who
// haven't configured cloud sync.
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import type { CommitmentItem, OperatingConstraints, ReviewEntry } from '../types'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

const auth = getAuth(app)
const db = getFirestore(app)

export type { User }

export function onAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export function isEmailLinkUrl() {
  return isSignInWithEmailLink(auth, window.location.href)
}

export async function completeEmailLinkSignIn(email: string) {
  await signInWithEmailLink(auth, email, window.location.href)
}

export async function sendSignInLink(email: string) {
  await sendSignInLinkToEmail(auth, email, {
    url: window.location.href,
    handleCodeInApp: true,
  })
}

export function signOutUser() {
  return signOut(auth)
}

export interface AppSnapshot {
  items?: CommitmentItem[]
  constraints?: OperatingConstraints
  reviews?: ReviewEntry[]
}

export async function loadSnapshot(uid: string): Promise<AppSnapshot | undefined> {
  const snap = await getDoc(doc(db, 'appState', uid))
  return snap.data() as AppSnapshot | undefined
}

export async function pushSnapshot(uid: string, data: AppSnapshot) {
  await setDoc(doc(db, 'appState', uid), { ...data, updatedAt: new Date().toISOString() })
}
