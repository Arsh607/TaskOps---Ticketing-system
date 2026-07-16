import KanbanBoard from '../components/kanban-board/KanbanBoard'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'
import './KanbanPage.css'

function KanbanPage() {
  return (
    <section className="kanban-page">
      <KanbanBoard />

      <SharedViewCounter />
    </section>
  )
}

export default KanbanPage
