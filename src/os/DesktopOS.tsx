import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Volume2, VolumeX, Wind, Lock, RotateCcw, Download } from 'lucide-react';
import { BootScreen } from './BootScreen';
import { LockScreen } from './LockScreen';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcons } from './DesktopIcons';
import { DesktopWidget } from './DesktopWidget';
import { Wallpaper } from './Wallpaper';
import { Window } from './Window';
import { CommandPalette, type Command } from './CommandPalette';
import { useWindowManager } from './hooks/useWindowManager';
import { apps, dockApps, desktopApps, externalLinks } from './appsConfig';
import { ParticleBackground } from '@/components/ParticleBackground';
import { playOpenSound, playCloseSound, playUnlockSound } from './sound';
import { SystemProvider, useSystem } from './SystemContext';
import { toast } from '@/components/ui/sonner';
import type { AppDef } from './types';

type Stage = 'boot' | 'lock' | 'desktop';

const DesktopOSInner = () => {
  const [stage, setStage] = useState<Stage>('boot');
  const [everUnlocked, setEverUnlocked] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { soundOn, setSoundOn, reduceMotion, setReduceMotion } = useSystem();
  const { theme, setTheme } = useTheme();
  const wm = useWindowManager();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  const handleUnlock = useCallback(() => {
    setStage('desktop');
    playUnlockSound(soundOn);
    if (!everUnlocked) {
      const about = apps.find((a) => a.id === 'about');
      if (about) wm.openApp(about);
      setEverUnlocked(true);
      setTimeout(() => {
        toast('Welcome back, Harshal 👋', { description: 'Your portfolio is ready.' });
      }, 500);
    }
  }, [wm, soundOn, everUnlocked]);

  const handleRestart = useCallback(() => {
    wm.resetAll();
    setEverUnlocked(false);
    setStage('boot');
  }, [wm]);

  const handleLock = useCallback(() => {
    setStage('lock');
  }, []);

  const openAppWithSound = useCallback(
    (app: AppDef) => {
      playOpenSound(soundOn);
      wm.openApp(app);
    },
    [wm, soundOn]
  );

  const launchFromDockWithSound = useCallback(
    (app: AppDef) => {
      const alreadyOpen = wm.windows.some((w) => w.appId === app.id);
      if (!alreadyOpen) playOpenSound(soundOn);
      wm.toggleFromDock(app);
    },
    [wm, soundOn]
  );

  const closeWithSound = useCallback(
    (id: string) => {
      playCloseSound(soundOn);
      wm.closeWindow(id);
    },
    [wm, soundOn]
  );

  const minimizeWithSound = useCallback(
    (id: string) => {
      playCloseSound(soundOn);
      wm.minimizeWindow(id);
    },
    [wm, soundOn]
  );

  // Cmd/Ctrl+K toggles the command palette. Cmd/Ctrl+W closes the focused
  // window (best-effort: some browsers reserve these combos, e.g. Chrome uses
  // Ctrl+W to close the tab — File > Close Window always works regardless).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (meta && e.key.toLowerCase() === 'w' && wm.focusedId) {
        e.preventDefault();
        closeWithSound(wm.focusedId);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [wm.focusedId, closeWithSound]);

  const findApp = (id: string) => dockApps.find((a) => a.id === id);

  const focusedWindow = wm.windows.find((w) => w.id === wm.focusedId);
  const activeTitle = focusedWindow ? focusedWindow.title : 'Finder';
  const openAppIds = wm.windows.map((w) => w.appId);

  const commands: Command[] = useMemo(() => {
    const appCommands: Command[] = dockApps.map((app) => ({
      id: `open-${app.id}`,
      label: `Open ${app.title}`,
      icon: app.icon,
      action: () => openAppWithSound(app),
    }));

    const externalCommands: Command[] = externalLinks.map((app) => ({
      id: `link-${app.id}`,
      label: `Open ${app.title}`,
      hint: 'opens in new tab',
      icon: app.icon,
      action: () => window.open(app.href, '_blank', 'noopener,noreferrer'),
    }));

    return [
      ...appCommands,
      ...externalCommands,
      {
        id: 'download-resume',
        label: 'Download Resume',
        icon: Download,
        action: () => {
          toast.success('Resume.pdf downloading…');
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'resume.pdf';
          link.click();
        },
      },
      {
        id: 'toggle-theme',
        label: theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
        icon: theme === 'light' ? Moon : Sun,
        action: () => setTheme(theme === 'light' ? 'dark' : 'light'),
      },
      {
        id: 'toggle-sound',
        label: soundOn ? 'Turn Sound Off' : 'Turn Sound On',
        icon: soundOn ? VolumeX : Volume2,
        action: () => setSoundOn(!soundOn),
      },
      {
        id: 'toggle-motion',
        label: reduceMotion ? 'Turn Motion On' : 'Reduce Motion',
        icon: Wind,
        action: () => setReduceMotion(!reduceMotion),
      },
      {
        id: 'lock',
        label: 'Lock Screen',
        icon: Lock,
        action: handleLock,
      },
      {
        id: 'restart',
        label: 'Restart',
        icon: RotateCcw,
        action: handleRestart,
      },
    ];
  }, [theme, setTheme, soundOn, setSoundOn, reduceMotion, setReduceMotion, handleLock, handleRestart, openAppWithSound]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <Wallpaper />
      {!reduceMotion && <ParticleBackground />}

      <AnimatePresence>
        {stage === 'boot' && <BootScreen key="boot" onDone={() => setStage('lock')} />}
      </AnimatePresence>
      <AnimatePresence>
        {stage === 'lock' && <LockScreen key="lock" onUnlock={handleUnlock} />}
      </AnimatePresence>

      {stage === 'desktop' && (
        <>
          <MenuBar
            activeTitle={activeTitle}
            windows={wm.windows}
            focusedId={wm.focusedId}
            onOpenApp={openAppWithSound}
            onFocusWindow={wm.restoreWindow}
            onCloseFocused={() => wm.focusedId && closeWithSound(wm.focusedId)}
            onRestart={handleRestart}
            onLock={handleLock}
            onOpenPalette={() => setPaletteOpen(true)}
          />
          <DesktopIcons apps={desktopApps} onOpen={openAppWithSound} />
          <DesktopWidget />

          <AnimatePresence>
            {wm.windows.map((w) => {
              const app = findApp(w.appId);
              if (!app) return null;
              const Content = app.component;
              return (
                <Window
                  key={w.id}
                  win={w}
                  focused={wm.focusedId === w.id}
                  onClose={() => closeWithSound(w.id)}
                  onMinimize={() => minimizeWithSound(w.id)}
                  onMaximize={() => wm.toggleMaximize(w.id)}
                  onFocus={() => wm.bringToFront(w.id)}
                  onDragEnd={(x, y) => wm.updateRect(w.id, { x, y })}
                  onResizeEnd={(rect) => wm.updateRect(w.id, rect)}
                >
                  <Content />
                </Window>
              );
            })}
          </AnimatePresence>

          <Dock
            apps={dockApps}
            externalApps={externalLinks}
            openAppIds={openAppIds}
            onLaunch={launchFromDockWithSound}
          />

          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
        </>
      )}
    </div>
  );
};

export const DesktopOS = () => (
  <SystemProvider>
    <DesktopOSInner />
  </SystemProvider>
);
