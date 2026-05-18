import TicketDetails from './components/ticket-details/TicketDetails'
import './App.css'

function App() {
  return (
    <>
      <header className="app-header">
        <h1>TaskOps Ticketing System</h1>
      </header>

      <main>
        <TicketDetails />
      </main>

      <footer className="app-footer">
        <p>
          Team Members: Krupa Patel, Arshdeep Singh, Muse Muse
        </p>
      </footer>
    </>
  )
}

export default App