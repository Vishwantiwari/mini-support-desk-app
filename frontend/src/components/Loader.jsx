export default function Loader({ label = "Loading…" }) {
    return (
      <div
        className="card"
        style={{
          padding: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span className="spinner" aria-hidden="true" />
        <span style={{ color: "var(--muted)" }}>{label}</span>
      </div>
    );
  }
  