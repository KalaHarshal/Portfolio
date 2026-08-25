import { useTheme } from 'next-themes';
import { Check, Moon, Sun, Volume2, VolumeX, Wind } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { ACCENTS, useSystem, type AccentId } from '../SystemContext';

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg bg-muted/30 p-4 space-y-3">
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
    {children}
  </div>
);

export const SystemPreferencesWindow = () => {
  const { theme, setTheme } = useTheme();
  const { soundOn, setSoundOn, accent, setAccent, reduceMotion, setReduceMotion } = useSystem();
  const isLight = theme === 'light';

  return (
    <div className="p-6 space-y-4 text-sm">
      <SectionCard title="Appearance">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {isLight ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>Light Mode</span>
          </div>
          <Switch checked={isLight} onCheckedChange={(v) => setTheme(v ? 'light' : 'dark')} />
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Accent Color</p>
          <div className="flex gap-3">
            {(Object.keys(ACCENTS) as AccentId[]).map((id) => (
              <button
                key={id}
                onClick={() => setAccent(id)}
                aria-label={ACCENTS[id].label}
                title={ACCENTS[id].label}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110',
                  accent === id && 'ring-2 ring-offset-2 ring-offset-background ring-foreground/70'
                )}
                style={{ background: ACCENTS[id].swatch }}
              >
                {accent === id && <Check className="w-4 h-4 text-white drop-shadow" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Sound">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Interface Sound Effects</span>
          </div>
          <Switch checked={soundOn} onCheckedChange={setSoundOn} />
        </div>
      </SectionCard>

      <SectionCard title="Motion">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Wind className="w-3.5 h-3.5" />
            <span>Reduce Motion</span>
          </div>
          <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
        </div>
        <p className="text-[11px] text-muted-foreground">
          Turns off the background particles and shortens window animations.
        </p>
      </SectionCard>

      <div className="pt-2 text-center">
        <p className="text-xs font-medium">Harshal OS</p>
        <p className="text-[11px] text-muted-foreground">Version 2.0 · Built with React, TypeScript & Tailwind</p>
      </div>
    </div>
  );
};
