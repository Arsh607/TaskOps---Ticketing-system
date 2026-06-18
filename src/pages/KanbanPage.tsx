import KanbanBoard from '../components/kanban-board/KanbanBoard'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'

function KanbanPage() {
  return (
    <section>
      <h2>Kanban Board</h2>
      <KanbanBoard />

      <SharedViewCounter />
    </section>
  )
}

export default KanbanPage