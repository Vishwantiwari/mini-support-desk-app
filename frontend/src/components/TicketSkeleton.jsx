export function TicketSkeleton() {
    return (
      <div className="card2" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 14, width: "55%", background: "rgba(255,255,255,0.06)", borderRadius: 10 }} />
            <div style={{ height: 10, width: "92%", marginTop: 10, background: "rgba(255,255,255,0.05)", borderRadius: 10 }} />
            <div style={{ height: 10, width: "80%", marginTop: 8, background: "rgba(255,255,255,0.04)", borderRadius: 10 }} />
          </div>
          <div style={{ width: 240, display: "grid", gap: 8, justifyItems: "end" }}>
            <div style={{ height: 22, width: 170, background: "rgba(255,255,255,0.05)", borderRadius: 999 }} />
            <div style={{ height: 10, width: 190, background: "rgba(255,255,255,0.04)", borderRadius: 10 }} />
          </div>
        </div>
      </div>
    );
  }
  