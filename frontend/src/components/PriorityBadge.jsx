export default function PriorityBadge({ priority }) {
  const p = (priority || "").toUpperCase();

  const cls =
    p === "LOW"
      ? "badge badgeLow"
      : p === "MEDIUM"
      ? "badge badgeMedium"
      : p === "HIGH"
      ? "badge badgeHigh"
      : "badge";

  return (
    <span className={cls} title={`Priority: ${p || "UNKNOWN"}`}>
      <span className="badgeDot" />
      {p || "UNKNOWN"}
    </span>
  );
}
