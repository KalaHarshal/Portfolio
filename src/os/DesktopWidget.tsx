export const DesktopWidget = () => (
  <div className="hidden sm:block fixed top-12 right-4 z-10 w-48 rounded-xl bg-card/50 backdrop-blur border border-border/40 p-3.5 shadow-lg select-none">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">System</p>
    <p className="text-sm font-semibold">Harshal OS</p>
    <p className="text-[11px] text-muted-foreground mb-2">v2.0</p>
    <div className="flex items-center gap-1.5 text-[11px]">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
      <span className="text-muted-foreground">Available for opportunities</span>
    </div>
  </div>
);
