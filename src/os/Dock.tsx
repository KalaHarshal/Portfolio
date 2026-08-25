import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppDef, ExternalApp } from './types';
import { appIconColors } from './appsConfig';
import { cn } from '@/lib/utils';

interface DockProps {
  apps: AppDef[];
  externalApps: ExternalApp[];
  openAppIds: string[];
  onLaunch: (app: AppDef) => void;
}

export const Dock = ({ apps, externalApps, openAppIds, onLaunch }: DockProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[999]">
      <div className="flex items-end gap-1.5 px-3 py-2 rounded-2xl glass shadow-2xl">
        {apps.map((app) => {
          const Icon = app.icon;
          const isHovered = hovered === app.id;
          const isOpen = openAppIds.includes(app.id);
          return (
            <div key={app.id} className="relative flex flex-col items-center">
              <motion.button
                onMouseEnter={() => setHovered(app.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onLaunch(app)}
                animate={{ scale: isHovered ? 1.25 : 1, y: isHovered ? -8 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                aria-label={app.title}
                className={cn(
                  'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md',
                  appIconColors[app.id] ?? 'from-secondary to-muted'
                )}
              >
                <Icon className="w-5 h-5 text-white drop-shadow-sm" strokeWidth={1.75} />
              </motion.button>
              {isOpen && <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-foreground/70" />}
              {isHovered && (
                <span className="absolute -top-9 px-2 py-1 rounded-md bg-popover text-popover-foreground text-[11px] whitespace-nowrap shadow-lg border border-border/50 pointer-events-none">
                  {app.title}
                </span>
              )}
            </div>
          );
        })}

        {externalApps.length > 0 && <div className="w-px h-8 bg-border/50 mx-1 self-center" />}

        {externalApps.map((app) => {
          const Icon = app.icon;
          const isHovered = hovered === app.id;
          return (
            <div key={app.id} className="relative flex flex-col items-center">
              <motion.a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(app.id)}
                onMouseLeave={() => setHovered(null)}
                animate={{ scale: isHovered ? 1.25 : 1, y: isHovered ? -8 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                aria-label={app.title}
                className={cn(
                  'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md',
                  appIconColors[app.id] ?? 'from-secondary to-muted'
                )}
              >
                <Icon className="w-5 h-5 text-white drop-shadow-sm" strokeWidth={1.75} />
              </motion.a>
              {isHovered && (
                <span className="absolute -top-9 px-2 py-1 rounded-md bg-popover text-popover-foreground text-[11px] whitespace-nowrap shadow-lg border border-border/50 pointer-events-none">
                  {app.title}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
