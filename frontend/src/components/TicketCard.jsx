import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import { formatDate } from "../utils/date";

export default function TicketCard({ ticket }) {
  if (!ticket?.id) return null;

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <div className="card2" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {ticket.title}
            </div>
            <div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.4 }}>
              {ticket.description}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
            </div>
            <div style={{ fontSize: 12, color: "var(--muted2)" }}>
              Created: {formatDate(ticket.created_at)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
