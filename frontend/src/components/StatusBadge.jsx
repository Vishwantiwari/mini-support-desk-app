export default function StatusBadge({ status }) {
  const s = (status || "").toUpperCase();

  const cls =
    s === "OPEN"
      ? "badge badgeOpen"
      : s === "IN_PROGRESS"
      ? "badge badgeInProgress"
      : s === "RESOLVED"
      ? "badge badgeResolved"
      : "badge";

  const label =
    s === "IN_PROGRESS" ? "IN PROGRESS" : s || "UNKNOWN";

  return (
    <span className={cls} title={`Status: ${label}`}>
      <span className="badgeDot" />
      {label}
    </span>
  );
}
