import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import TicketList from './components/TicketList/TicketList';
function App() {
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("header", { className: "app-shell__header", children: [_jsx("h1", { children: "TaskOps Ticketing System" }), _jsx("p", { className: "app-shell__tagline", children: "A simple support ticket dashboard for managing issue workflows." })] }), _jsx("main", { className: "app-shell__main", children: _jsx(TicketList, {}) }), _jsx("footer", { className: "app-shell__footer", children: _jsx("p", { children: "Team Members: Krupa Patel, Arshdeep Singh, Muse Muse" }) })] }));
}
export default App;
