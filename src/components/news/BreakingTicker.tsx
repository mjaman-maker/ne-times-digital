const items = [
  "Assam Cabinet approves new education policy for tribal districts",
  "Brahmaputra water level rises in Dibrugarh after upstream rains",
  "Manipur peace talks: Centre forms new committee",
  "Guwahati Metro Phase 1 tender finalized",
  "Bihu festival 2026 dates announced by govt",
  "Mizoram student union begins statewide protest",
];

export function BreakingTicker() {
  const loop = [...items, ...items];
  return (
    <div className="bg-breaking text-breaking-foreground border-b border-breaking">
      <div className="flex items-stretch overflow-hidden text-sm">
        <div className="flex items-center gap-2 bg-navy-deep px-3 py-2 font-bold uppercase tracking-wider text-xs shrink-0">
          <span className="h-2 w-2 rounded-full bg-breaking pulse-dot" />
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track flex gap-10 whitespace-nowrap py-2 pl-6">
            {loop.map((t, i) => (
              <span key={i} className="font-medium">
                <span className="opacity-70 mr-2">●</span>{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
