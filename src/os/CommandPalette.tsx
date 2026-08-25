import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

export const CommandPalette = ({ open, onClose, commands }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) {
          cmd.action();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1800] flex items-start justify-center pt-[18vh] bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-xl overflow-hidden border border-border/50 bg-popover/95 backdrop-blur-2xl shadow-2xl"
      >
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/40">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Harshal OS..."
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <kbd className="text-[10px] text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">Esc</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-1.5">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">No results</p>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
                    i === activeIndex ? 'bg-primary/15 text-foreground' : 'text-foreground/90'
                  )}
                >
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {cmd.hint && <span className="text-[10px] text-muted-foreground">{cmd.hint}</span>}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
