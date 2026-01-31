import { useParams, Link, useNavigate } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import { useComments } from "../hooks/useComments";
import { useUpdateTicket } from "../hooks/useUpdateTicket";
import { useDeleteTicket } from "../hooks/useDeleteTicket";
import CommentForm from "../components/CommentForm";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import { formatDate } from "../utils/date";
import Loader from "../components/Loader";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: ticket,
    isLoading: ticketLoading,
    isError: ticketError,
  } = useTickets(id);

  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useComments(id);

  const updateMutation = useUpdateTicket(id);
  const deleteMutation = useDeleteTicket(id);

  const handleDelete = async () => {
    const ok = window.confirm("Delete this ticket? This cannot be undone.");
    if (!ok) return;

    try {
      await deleteMutation.mutateAsync();
      navigate("/");
    } catch (e) {
    }
  };

  if (ticketLoading) {
    return (
      <div className="container">
        <Loader label="Loading ticket…" />
      </div>
    );
  }

  if (ticketError || !ticket) {
    return (
      <div className="container">
        <div className="card" style={{ padding: 16, color: "var(--danger)" }}>
          Ticket not found or failed to load.
        </div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/">← Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <Link className="btn" to="/">← Back to tickets</Link>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ minWidth: 0, flex: "1 1 520px" }}>
            <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: -0.6 }}>
              {ticket.title}
            </div>

            <div style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>
              {ticket.description}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginTop: 16,
                color: "var(--muted2)",
                fontSize: 12,
              }}
            >
              <div>
                Created: <span style={{ color: "var(--text)" }}>{formatDate(ticket.created_at)}</span>
              </div>
              <div>
                Updated: <span style={{ color: "var(--text)" }}>{formatDate(ticket.updated_at)}</span>
              </div>
              <div>
                ID: <span style={{ color: "var(--text)" }}>{ticket.id}</span>
              </div>
            </div>
          </div>

          <div className="card2" style={{ padding: 14, minWidth: 300, flex: "0 0 300px" }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Manage</div>

            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}>Status</div>
                <select
                  className="select"
                  value={ticket.status}
                  disabled={updateMutation.isPending}
                  onChange={(e) => updateMutation.mutate({ status: e.target.value })}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}>Priority</div>
                <select
                  className="select"
                  value={ticket.priority}
                  disabled={updateMutation.isPending}
                  onChange={(e) => updateMutation.mutate({ priority: e.target.value })}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              {updateMutation.isPending && (
                <div style={{ fontSize: 12, color: "var(--muted2)" }}>Updating…</div>
              )}

              {updateMutation.isError && (
                <div style={{ fontSize: 12, color: "var(--danger)" }}>
                  Update failed. Please try again.
                </div>
              )}

              <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="btn"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  style={{
                    borderColor: "rgba(255,77,109,0.35)",
                    color: "rgba(255,77,109,0.95)",
                    background: "rgba(255,77,109,0.06)",
                  }}
                >
                  {deleteMutation.isPending ? "Deleting…" : "Delete Ticket"}
                </button>
              </div>

              {deleteMutation.isError && (
                <div style={{ fontSize: 12, color: "var(--danger)" }}>
                  Delete failed. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Comments</div>
          <div className="kbd">{comments?.length || 0} total</div>
        </div>

        {commentsLoading && (
          <div style={{ marginTop: 12, color: "var(--muted)" }}>Loading comments…</div>
        )}

        {commentsError && (
          <div style={{ marginTop: 12, color: "var(--danger)" }}>Failed to load comments.</div>
        )}

        {!commentsLoading && !commentsError && comments?.length === 0 && (
          <div style={{ marginTop: 12, color: "var(--muted)" }}>No comments yet.</div>
        )}

        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {comments?.map((c) => (
            <div key={c.id} className="card2" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontWeight: 900 }}>{c.author_name || "Anonymous"}</div>
                <div style={{ fontSize: 12, color: "var(--muted2)" }}>
                  {formatDate(c.created_at)}
                </div>
              </div>

              <div style={{ marginTop: 8, color: "var(--text)", lineHeight: 1.5 }}>
                {c.message}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <CommentForm ticketId={id} />
        </div>
      </div>
    </div>
  );
}
