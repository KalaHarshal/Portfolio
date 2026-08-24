import { useState } from 'react';
import { ExternalLink, Github, Folder, LayoutGrid, List, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects, projectCategories } from '../data';

type Project = (typeof projects)[number];

export const ProjectsWindow = () => {
  const [active, setActive] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="flex h-full text-sm">
      {/* Sidebar */}
      <div className="w-36 shrink-0 border-r border-border/40 bg-muted/20 p-3 space-y-0.5 hidden sm:block overflow-y-auto">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-2">Favorites</p>
        {projectCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-xs transition-colors',
              active === c.id ? 'bg-primary/15 text-primary' : 'hover:bg-muted/60 text-foreground/80'
            )}
          >
            <Folder className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 shrink-0">
          <p className="text-xs text-muted-foreground">{filtered.length} items</p>
          <div className="flex gap-1">
            <button
              onClick={() => setView('grid')}
              className={cn('p-1 rounded', view === 'grid' && 'bg-muted')}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('p-1 rounded', view === 'list' && 'bg-muted')}
              aria-label="List view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {view === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-lg text-center transition-colors',
                    selected?.id === p.id ? 'bg-primary/15' : 'hover:bg-muted/50'
                  )}
                >
                  <span className="text-3xl">💻</span>
                  <span className="text-xs font-medium line-clamp-2">{p.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={cn(
                    'w-full flex items-center gap-3 px-2 py-2 rounded-md text-left transition-colors',
                    selected?.id === p.id ? 'bg-primary/15' : 'hover:bg-muted/50'
                  )}
                >
                  <span className="text-lg">💻</span>
                  <span className="text-xs font-medium flex-1 truncate">{p.title}</span>
                  <span className="text-[10px] text-muted-foreground hidden sm:inline">{p.tags[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick look panel */}
      {selected && (
        <div className="w-56 shrink-0 border-l border-border/40 p-4 space-y-3 hidden md:flex md:flex-col overflow-y-auto">
          <button
            onClick={() => setSelected(null)}
            className="self-end text-muted-foreground hover:text-foreground"
            aria-label="Close preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <h3 className="text-sm font-semibold">{selected.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{selected.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {selected.tags.map((t) => (
              <span key={t} className="px-1.5 py-0.5 bg-muted rounded text-[10px]">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 pt-1">
            <a
              href={selected.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> Live
            </a>
            <a
              href={selected.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              <Github className="w-3 h-3" /> Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
