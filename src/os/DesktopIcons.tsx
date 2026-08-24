import type { AppDef } from './types';

interface DesktopIconsProps {
  apps: AppDef[];
  onOpen: (app: AppDef) => void;
}

export const DesktopIcons = ({ apps, onOpen }: DesktopIconsProps) => {
  return (
    <div className="absolute top-12 left-4 flex flex-col gap-5 z-10">
      {apps.map((app) => {
        const Icon = app.icon;
        return (
          <button
            key={app.id}
            onDoubleClick={() => onOpen(app)}
            className="flex flex-col items-center gap-1.5 w-20 group"
          >
            <span className="w-12 h-12 rounded-xl bg-card/60 backdrop-blur border border-border/40 flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-colors">
              <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
            </span>
            <span className="text-[11px] text-center text-foreground/90 px-1 rounded group-hover:bg-primary/20 leading-tight">
              {app.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};
