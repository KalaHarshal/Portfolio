import { useEffect, useState } from 'react';
import { Wifi, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ControlCenter } from './ControlCenter';
import { apps, systemPrefsApp } from './appsConfig';
import type { AppDef, OpenWindow } from './types';

interface MenuBarProps {
  activeTitle: string;
  windows: OpenWindow[];
  focusedId: string | null;
  onOpenApp: (app: AppDef) => void;
  onFocusWindow: (id: string) => void;
  onCloseFocused: () => void;
  onRestart: () => void;
  onLock: () => void;
}

export const MenuBar = ({
  activeTitle,
  windows,
  focusedId,
  onOpenApp,
  onFocusWindow,
  onCloseFocused,
  onRestart,
  onLock,
}: MenuBarProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const dateStr = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  const aboutApp = apps.find((a) => a.id === 'about');
  const contactApp = apps.find((a) => a.id === 'contact');
  const resumeApp = apps.find((a) => a.id === 'resume');

  return (
    <div className="fixed top-0 left-0 right-0 h-8 z-[1000] flex items-center justify-between px-4 glass border-b border-border/30 text-[13px] select-none">
      <div className="flex items-center gap-4 font-medium">
        {/* Apple-style menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none" aria-label="System menu">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-primary to-accent inline-block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10} className="w-56">
            <DropdownMenuItem onClick={() => aboutApp && onOpenApp(aboutApp)}>
              About This Portfolio
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpenApp(systemPrefsApp)}>
              System Preferences…
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLock}>Lock Screen</DropdownMenuItem>
            <DropdownMenuItem onClick={onRestart}>Restart</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="font-semibold">{activeTitle}</span>

        {/* File menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden md:inline text-muted-foreground outline-none hover:text-foreground transition-colors">
            File
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10} className="w-48">
            <DropdownMenuItem onClick={() => contactApp && onOpenApp(contactApp)}>
              New Message
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => resumeApp && onOpenApp(resumeApp)}>
              Open Resume
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={!focusedId} onClick={onCloseFocused}>
              Close Window
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="hidden md:inline text-muted-foreground">Edit</span>
        <span className="hidden md:inline text-muted-foreground">View</span>

        {/* Window menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden md:inline text-muted-foreground outline-none hover:text-foreground transition-colors">
            Window
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10} className="w-56">
            {windows.length === 0 ? (
              <DropdownMenuItem disabled>No Open Windows</DropdownMenuItem>
            ) : (
              windows.map((w) => (
                <DropdownMenuItem key={w.id} onClick={() => onFocusWindow(w.id)}>
                  {w.id === focusedId ? '● ' : ''}
                  {w.title}
                  {w.minimized ? ' (minimized)' : ''}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3 text-muted-foreground">
        <Wifi className="w-3.5 h-3.5" />
        <Search className="w-3.5 h-3.5" />
        <ControlCenter onOpenApp={onOpenApp} />
        <span className="text-foreground whitespace-nowrap">
          {dateStr} {timeStr}
        </span>
      </div>
    </div>
  );
};
