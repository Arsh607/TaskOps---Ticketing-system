type SharedViewCounterListener = () => void

let viewCount = 0
const listeners = new Set<SharedViewCounterListener>()

export function getViewCount(): number {
  return viewCount
}

export function setViewCount(nextViewCount: number): void {
  viewCount = nextViewCount
  listeners.forEach((listener) => listener())
}

export function subscribeToViewCount(
  listener: SharedViewCounterListener,
): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}