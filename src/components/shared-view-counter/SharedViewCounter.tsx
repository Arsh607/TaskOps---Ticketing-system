import './SharedViewCounter.css'
import type { SharedCounterProps } from '../../types/SharedCounterProps'

function SharedViewCounter({ viewCount, incrementViewCount }: SharedCounterProps) {
  return (
    <button
      className="shared-view-counter"
      type="button"
      onClick={incrementViewCount}
      aria-label={`Shared view counter. Current count is ${viewCount}. Click to add one view.`}
    >
      <span className="shared-view-counter__label">Shared views</span>

      <span className="shared-view-counter__value" aria-live="polite">
        {viewCount}
      </span>

      <span className="shared-view-counter__hint">Click to add view</span>
    </button>
  )
}

export default SharedViewCounter