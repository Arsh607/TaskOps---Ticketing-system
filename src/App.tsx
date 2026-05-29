import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import KanbanPage from './pages/KanbanPage'
import TicketsPage from './pages/TicketsPage'
import DetailsPage from './pages/DetailsPage'

function App() {
  const [viewCount, setViewCount] = useState(0)

  function incrementViewCount() {
    setViewCount((currentViewCount) => currentViewCount + 1)
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <HomePage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />

        <Route
          path="kanban"
          element={
            <KanbanPage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />

        <Route
          path="tickets"
          element={
            <TicketsPage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />

        <Route
          path="details"
          element={
            <DetailsPage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App