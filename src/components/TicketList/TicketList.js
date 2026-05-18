import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './TicketList.css';
function TicketList() {
    const [tickets] = useState([
        {
            id: 1,
            title: 'User cannot access dashboard',
            status: 'Open',
            priority: 'High',
            owner: 'Aashish',
        },
        {
            id: 2,
            title: 'Email notification not sending',
            status: 'In Progress',
            priority: 'Medium',
            owner: 'Team Ops',
        },
        {
            id: 3,
            title: 'Add search filter to ticket list',
            status: 'Planned',
            priority: 'Low',
            owner: 'Dev Squad',
        },
    ]);
    return (_jsxs("section", { className: "ticket-list", "aria-labelledby": "ticket-list-heading", children: [_jsxs("div", { className: "ticket-list__intro", children: [_jsx("h2", { id: "ticket-list-heading", children: "TaskOps Ticket Queue" }), _jsx("p", { children: "Review the latest tickets for the support workflow and triage priorities." })] }), _jsx("ul", { className: "ticket-list__items", children: tickets.map((ticket) => (_jsx("li", { className: "ticket-list__item", children: _jsxs("article", { className: "ticket-card", children: [_jsx("h3", { children: ticket.title }), _jsxs("dl", { children: [_jsxs("div", { children: [_jsx("dt", { children: "Status" }), _jsx("dd", { children: ticket.status })] }), _jsxs("div", { children: [_jsx("dt", { children: "Priority" }), _jsx("dd", { children: ticket.priority })] }), _jsxs("div", { children: [_jsx("dt", { children: "Owner" }), _jsx("dd", { children: ticket.owner })] })] })] }) }, ticket.id))) })] }));
}
export default TicketList;
