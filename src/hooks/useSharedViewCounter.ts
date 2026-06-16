import { useSyncExternalStore } from 'react'
import {
  getSharedViewCount,
  incrementSharedViewCount,
  subscribeToSharedViewCount,
} from '../services/sharedViewCounterService'

interface UseSharedViewCounterResult {
  viewCount: number
  incrementViewCount: () => void
}

export function useSharedViewCounter(): UseSharedViewCounterResult {
  const viewCount = useSyncExternalStore(
    subscribeToSharedViewCount,
    getSharedViewCount,
  )

  return {
    viewCount,
    incrementViewCount: incrementSharedViewCount,
  }
}