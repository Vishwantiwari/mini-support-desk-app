export default function Badge({ children, tone = "neutral" }) {
    const tones = {
      neutral: "bg-zinc-800 text-zinc-200 border-zinc-700",
      green: "bg-green-900/30 text-green-200 border-green-700/40",
      yellow: "bg-yellow-900/30 text-yellow-200 border-yellow-700/40",
      red: "bg-red-900/30 text-red-200 border-red-700/40",
      blue: "bg-blue-900/30 text-blue-200 border-blue-700/40",
    };
  
    return (
      <span
        className={[
          "inline-flex items-center px-2 py-1 rounded border text-xs font-medium",
          tones[tone] || tones.neutral,
        ].join(" ")}
      >
        {children}
      </span>
    );
  }
  