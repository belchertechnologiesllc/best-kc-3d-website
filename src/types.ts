export type Decision = 'GROW' | 'KEEP' | 'DELEGATE' | 'SIMPLIFY' | 'PAUSE' | 'KILL'

export const DECISIONS: Decision[] = ['GROW', 'KEEP', 'DELEGATE', 'SIMPLIFY', 'PAUSE', 'KILL']

export const GROW_CAP = 5

export type ScoreValue = 0 | 1 | 2
export type FiveScale = 1 | 2 | 3 | 4 | 5
export type FamilyImpactScale = -2 | -1 | 0 | 1 | 2

export interface CommitmentItem {
  id: string
  item: string
  category: string
  purpose: string
  hrsPerMonth: number
  dollarImpact: number
  mentalLoad: FiveScale
  familyImpact: FamilyImpactScale
  strategicValue: FiveScale
  mustBeMe: boolean

  // Step 2 — Score: five questions, 0-2 each
  qFamilyFuture: ScoreValue
  qIncomeLeverage: ScoreValue
  qUniquelyValuable: ScoreValue
  qEnergizes: ScoreValue
  qChooseAgain: ScoreValue

  // Step 2 — penalties, -2 each
  penaltyInvadesFamilyTime: boolean
  penaltyMentalLoadOutsideWork: boolean
  penaltySomeoneElseCouldOwn: boolean

  // Step 3 — Decide
  decision: Decision | null
  nextAction: string

  createdAt: string
  updatedAt: string
}

export interface OperatingConstraints {
  maxActiveBusinessBets: number | null
  maxVolunteerLeadershipRoles: number | null
  maxHoursDonatedPerMonth: number | null
  minFamilyTimeHoursPerWeek: number | null
  minExerciseSessionsPerWeek: number | null
  primaryEconomicEngine: string
  notPursuing: [string, string, string]
  whatEnoughLooksLike: string
}

export interface ReviewEntry {
  id: string
  month: string // "YYYY-MM"
  whatEnteredThisMonth: string
  whatBecameMoreExpensive: string
  whatSomeoneElseCouldOwn: string
  whatAmIMaintainingPurely: string
  whatShouldMoveToPauseOrKill: string
  didAnythingEarnGrow: string
  createdAt: string
}

export function makeId(): string {
  return crypto.randomUUID()
}

export function newCommitmentItem(): CommitmentItem {
  const now = new Date().toISOString()
  return {
    id: makeId(),
    item: '',
    category: '',
    purpose: '',
    hrsPerMonth: 0,
    dollarImpact: 0,
    mentalLoad: 3,
    familyImpact: 0,
    strategicValue: 3,
    mustBeMe: false,
    qFamilyFuture: 0,
    qIncomeLeverage: 0,
    qUniquelyValuable: 0,
    qEnergizes: 0,
    qChooseAgain: 0,
    penaltyInvadesFamilyTime: false,
    penaltyMentalLoadOutsideWork: false,
    penaltySomeoneElseCouldOwn: false,
    decision: null,
    nextAction: '',
    createdAt: now,
    updatedAt: now,
  }
}

export function defaultOperatingConstraints(): OperatingConstraints {
  return {
    maxActiveBusinessBets: null,
    maxVolunteerLeadershipRoles: null,
    maxHoursDonatedPerMonth: null,
    minFamilyTimeHoursPerWeek: null,
    minExerciseSessionsPerWeek: null,
    primaryEconomicEngine: '',
    notPursuing: ['', '', ''],
    whatEnoughLooksLike: '',
  }
}
