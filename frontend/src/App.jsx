import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketsList from "./pages/TicketsList";
import TicketDetail from "./pages/TicketDetail";
import CreateTicket from "./pages/CreateTicket";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketsList />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
