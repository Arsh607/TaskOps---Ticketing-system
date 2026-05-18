import './App.css'
import TicketList from './components/TicketList/TicketList'

function App() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1>TaskOps Ticketing System</h1>
      </header>

      <main className="app-shell__main">
        <TicketList />
      </main>

      <footer className="app-shell__footer">
        <p>Team Members: Krupa Patel, Arshdeep Singh, Muse Muse</p>
      </footer>
    </div>
  )
}

export default App
