import { GROW_CAP, type CommitmentItem } from '../types'

export function rawScore(item: CommitmentItem): number {
  return (
    item.qFamilyFuture +
    item.qIncomeLeverage +
    item.qUniquelyValuable +
    item.qEnergizes +
    item.qChooseAgain
  )
}

export function penaltyCount(item: CommitmentItem): number {
  return (
    (item.penaltyInvadesFamilyTime ? 1 : 0) +
    (item.penaltyMentalLoadOutsideWork ? 1 : 0) +
    (item.penaltySomeoneElseCouldOwn ? 1 : 0)
  )
}

export function penaltyTotal(item: CommitmentItem): number {
  return -2 * penaltyCount(item)
}

export function adjustedScore(item: CommitmentItem): number {
  return rawScore(item) + penaltyTotal(item)
}

export function growCount(items: CommitmentItem[]): number {
  return items.filter((i) => i.decision === 'GROW').length
}

export function growCapExceeded(items: CommitmentItem[]): boolean {
  return growCount(items) > GROW_CAP
}
