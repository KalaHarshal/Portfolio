import { useTheme } from 'next-themes';
import { Sun, Moon, Volume2, VolumeX, SlidersHorizontal, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useSystem } from './SystemContext';
import { systemPrefsApp } from './appsConfig';
import type { AppDef } from './types';

interface ControlCenterProps {
  onOpenApp: (app: AppDef) => void;
}

export const ControlCenter = ({ onOpenApp }: ControlCenterProps) => {
  const { theme, setTheme } = useTheme();
  const { soundOn, setSoundOn } = useSystem();
  const isLight = theme === 'light';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="Control Center" className="p-1 rounded hover:bg-muted/60 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-56 p-3 space-y-3 bg-popover/95 backdrop-blur-xl border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {isLight ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>Light Mode</span>
          </div>
          <Switch checked={isLight} onCheckedChange={(v) => setTheme(v ? 'light' : 'dark')} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Sound Effects</span>
          </div>
          <Switch checked={soundOn} onCheckedChange={setSoundOn} />
        </div>
        <button
          onClick={() => onOpenApp(systemPrefsApp)}
          className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground pt-1 border-t border-border/40 mt-1"
        >
          <Settings className="w-3.5 h-3.5" />
          Open System Preferences…
        </button>
      </PopoverContent>
    </Popover>
  );
};
