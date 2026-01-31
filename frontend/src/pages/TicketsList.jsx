import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TicketCard from "../components/TicketCard";
import { useTicketList } from "../hooks/useTicketList";
import Loader from "../components/Loader";
import { TicketSkeleton } from "../components/TicketSkeleton";

function SkeletonRow() {
  return (
    <div className="card2" style={{ padding: 16 }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 14 }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: 14,
              width: "55%",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 10,
            }}
          />
          <div
            style={{
              height: 10,
              width: "90%",
              marginTop: 10,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 10,
            }}
          />
          <div
            style={{
              height: 10,
              width: "80%",
              marginTop: 8,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 10,
            }}
          />
        </div>
        <div
          style={{ width: 180, display: "grid", gap: 8, justifyItems: "end" }}
        >
          <div
            style={{
              height: 22,
              width: 140,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              height: 10,
              width: 160,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function TicketsList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [order, setOrder] = useState("desc");

  const [debouncedQ, setDebouncedQ] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const filters = useMemo(() => {
    const params = { sort: "createdAt", order };
    if (debouncedQ) params.q = debouncedQ;
    if (status) params.status = status;
    if (priority) params.priority = priority;
    return params;
  }, [debouncedQ, status, priority, order]);

  const { data: tickets, isLoading, isError } = useTicketList(filters);

  const hasActiveFilters = !!(q || status || priority || order !== "desc");

  const stats = useMemo(() => {
    const list = tickets || [];
    const open = list.filter((t) => t.status === "OPEN").length;
    const inProgress = list.filter((t) => t.status === "IN_PROGRESS").length;
    const resolved = list.filter((t) => t.status === "RESOLVED").length;
    return { total: list.length, open, inProgress, resolved };
  }, [tickets]);

  const clearAll = () => {
    setQ("");
    setStatus("");
    setPriority("");
    setOrder("desc");
  };

  return (
    <div className="container">
      <div className="card headerCard">
        <div className="headerTop">
          <div>
            <div className="pageTitle">Support Desk System</div>
            <div className="pageSubtitle">
              Search, filter, sort, and manage support tickets.
            </div>

            <div className="statsRow">
              <div className="pill">
                <span className="pillLabel">Total</span>
                <span className="pillValue">
                  {isLoading ? "—" : stats.total}
                </span>
              </div>
              <div className="pill">
                <span className="pillLabel">Open</span>
                <span className="pillValue">
                  {isLoading ? "—" : stats.open}
                </span>
              </div>
              <div className="pill">
                <span className="pillLabel">In Progress</span>
                <span className="pillValue">
                  {isLoading ? "—" : stats.inProgress}
                </span>
              </div>
              <div className="pill">
                <span className="pillLabel">Resolved</span>
                <span className="pillValue">
                  {isLoading ? "—" : stats.resolved}
                </span>
              </div>
            </div>
          </div>

          <div className="headerActions">
            {hasActiveFilters && (
              <button className="btn" onClick={clearAll} type="button">
                Clear filters
              </button>
            )}
            <Link className="btn btnPrimary" to="/create">
              + Create Ticket
            </Link>
          </div>
        </div>

        <div className="controlsWrap">
          <div className="controlsRow">
            <div className="searchWrap">
              <input
                className="input"
                placeholder="Search title or description…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              {q && (
                <button
                  className="btn clearSearchBtn"
                  onClick={() => setQ("")}
                  type="button"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="controlsRow">
            <select
              className="select selectCtl"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>

            <select
              className="select selectCtl"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <select
              className="select selectCtl"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>

            {hasActiveFilters && (
              <button className="btn clearBtn" onClick={clearAll} type="button">
                Clear filters
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="chipsRow">
            {debouncedQ && <span className="kbd">Search: {debouncedQ}</span>}
            {status && <span className="kbd">Status: {status}</span>}
            {priority && <span className="kbd">Priority: {priority}</span>}
            {order !== "desc" && <span className="kbd">Oldest first</span>}
          </div>
        )}
      </div>

      {isError && (
        <div className="card" style={{ padding: 16, color: "var(--danger)" }}>
          Failed to load tickets. Please refresh.
        </div>
      )}

      {isLoading && (
        <div style={{ display: "grid", gap: 12 }}>
          <TicketSkeleton />
          <TicketSkeleton />
          <TicketSkeleton />
        </div>
      )}

      {!isLoading && !isError && tickets?.length === 0 && (
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 900 }}>No tickets found</div>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>
            Try clearing filters or create your first ticket.
          </div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn btnPrimary" to="/create">
              + Create Ticket
            </Link>
          </div>
        </div>
      )}

      {!isLoading && !isError && tickets?.length > 0 && (
        <>
          <div
            style={{ color: "var(--muted2)", fontSize: 12, marginBottom: 10 }}
          >
            Showing{" "}
            <span style={{ color: "var(--text)", fontWeight: 900 }}>
              {tickets.length}
            </span>{" "}
            ticket(s)
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {tickets.map((t) => (
              <TicketCard key={t.id} ticket={t} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
