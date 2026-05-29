import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import KanbanPage from './pages/KanbanPage'
import TicketsPage from './pages/TicketsPage'
import DetailsPage from './pages/DetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="kanban" element={<KanbanPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="details" element={<DetailsPage />} />
      </Route>
    </Routes>
  )
}

export default App