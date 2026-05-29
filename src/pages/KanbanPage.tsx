import KanbanBoard from '../components/kanban-board/KanbanBoard'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'
import type { SharedCounterProps } from '../types/SharedCounterProps'

function KanbanPage({ viewCount, incrementViewCount }: SharedCounterProps) {
  return (
    <section>
      <h2>Kanban Board</h2>
      <KanbanBoard />

      <SharedViewCounter
        viewCount={viewCount}
        incrementViewCount={incrementViewCount}
      />
    </section>
  )
}

export default KanbanPage