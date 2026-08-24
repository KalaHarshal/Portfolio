export const TrashWindow = () => (
  <div className="h-full flex flex-col items-center justify-center gap-2 text-center p-6">
    <span className="text-4xl">🗑️</span>
    <p className="text-sm font-medium">The Trash is empty</p>
    <p className="text-xs text-muted-foreground max-w-xs">
      No bugs, no regrets, no deprecated code here — just clean commits and closed PRs.
    </p>
  </div>
);
