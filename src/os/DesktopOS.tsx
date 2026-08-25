import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BootScreen } from './BootScreen';
import { LockScreen } from './LockScreen';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcons } from './DesktopIcons';
import { DesktopWidget } from './DesktopWidget';
import { Window } from './Window';
import { useWindowManager } from './hooks/useWindowManager';
import { apps, dockApps, desktopApps, externalLinks } from './appsConfig';
import { ParticleBackground } from '@/components/ParticleBackground';
import { playOpenSound, playCloseSound, playUnlockSound } from './sound';
import { SystemProvider, useSystem } from './SystemContext';
import type { AppDef } from './types';

type Stage = 'boot' | 'lock' | 'desktop';

const DesktopOSInner = () => {
  const [stage, setStage] = useState<Stage>('boot');
  const [everUnlocked, setEverUnlocked] = useState(false);
  const { soundOn, reduceMotion } = useSystem();
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

  // Cmd/Ctrl+W closes the focused window. Best-effort: some browsers (notably
  // Chrome) reserve this combo for closing the browser tab and won't let any
  // page override it — the File > Close Window menu item always works though.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w' && wm.focusedId) {
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

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {!reduceMotion && <ParticleBackground />}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />

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
