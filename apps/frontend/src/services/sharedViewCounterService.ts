import {
  getViewCount,
  setViewCount,
  subscribeToViewCount,
} from '../repositories/sharedViewCounterRepository'

export function getSharedViewCount(): number {
  return getViewCount()
}

export function incrementSharedViewCount(): void {
  const currentViewCount = getViewCount()
  setViewCount(currentViewCount + 1)
}

export function subscribeToSharedViewCount(listener: () => void): () => void {
  return subscribeToViewCount(listener)
}