import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTheme } from 'next-themes';

export type AccentId = 'cyan' | 'emerald' | 'rose' | 'indigo';

interface AccentPalette {
  label: string;
  swatch: string;
  dark: { primary: string; accent: string };
  light: { primary: string; accent: string };
}

export const ACCENTS: Record<AccentId, AccentPalette> = {
  cyan: {
    label: 'Cyan & Violet',
    swatch: 'linear-gradient(135deg, hsl(190 95% 55%), hsl(270 75% 60%))',
    dark: { primary: '190 95% 55%', accent: '270 75% 60%' },
    light: { primary: '190 85% 38%', accent: '270 70% 48%' },
  },
  emerald: {
    label: 'Emerald & Lime',
    swatch: 'linear-gradient(135deg, hsl(160 84% 45%), hsl(84 70% 50%))',
    dark: { primary: '160 84% 50%', accent: '84 70% 55%' },
    light: { primary: '160 75% 34%', accent: '84 60% 38%' },
  },
  rose: {
    label: 'Rose & Amber',
    swatch: 'linear-gradient(135deg, hsl(340 82% 58%), hsl(38 92% 55%))',
    dark: { primary: '340 82% 62%', accent: '38 92% 58%' },
    light: { primary: '340 75% 46%', accent: '38 85% 42%' },
  },
  indigo: {
    label: 'Indigo & Fuchsia',
    swatch: 'linear-gradient(135deg, hsl(243 75% 62%), hsl(300 75% 62%))',
    dark: { primary: '243 75% 66%', accent: '300 75% 66%' },
    light: { primary: '243 65% 50%', accent: '300 60% 46%' },
  },
};

interface SystemContextValue {
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
  accent: AccentId;
  setAccent: (v: AccentId) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
}

const SystemContext = createContext<SystemContextValue | null>(null);

export const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [soundOn, setSoundOn] = useState(false);
  const [accent, setAccent] = useState<AccentId>('cyan');
  const [reduceMotion, setReduceMotion] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const palette = ACCENTS[accent];
    const mode = resolvedTheme === 'light' ? palette.light : palette.dark;
    const root = document.documentElement.style;
    root.setProperty('--primary', mode.primary);
    root.setProperty('--accent', mode.accent);
    root.setProperty('--glow-primary', mode.primary);
    root.setProperty('--glow-accent', mode.accent);
    root.setProperty('--gradient-start', mode.primary);
    root.setProperty('--gradient-end', mode.accent);
    root.setProperty('--ring', mode.primary);
  }, [accent, resolvedTheme]);

  const value = useMemo(
    () => ({ soundOn, setSoundOn, accent, setAccent, reduceMotion, setReduceMotion }),
    [soundOn, accent, reduceMotion]
  );

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
};

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error('useSystem must be used within a SystemProvider');
  return ctx;
}
