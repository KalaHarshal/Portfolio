import { useCallback, useRef, useState } from 'react';
import type { AppDef, OpenWindow } from '../types';

export const MENU_BAR_HEIGHT = 32;
export const DOCK_CLEARANCE = 100;

export function useWindowManager() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const zCounter = useRef(10);
  const cascade = useRef(0);

  const bringToFront = useCallback((id: string) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w)));
    setFocusedId(id);
  }, []);

  const openApp = useCallback((app: AppDef) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === app.id);
      zCounter.current += 1;
      const z = zCounter.current;

      if (existing) {
        setFocusedId(existing.id);
        return prev.map((w) => (w.id === existing.id ? { ...w, minimized: false, zIndex: z } : w));
      }

      const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
      const offset = (cascade.current % 6) * 26;
      cascade.current += 1;

      const width = Math.min(app.defaultSize.width, vw - 40);
      const height = Math.min(app.defaultSize.height, vh - MENU_BAR_HEIGHT - DOCK_CLEARANCE);
      const x = Math.max(16, (vw - width) / 2 + offset - 70);
      const y = Math.max(MENU_BAR_HEIGHT + 16, (vh - height - DOCK_CLEARANCE) / 2 + offset - 30);

      const win: OpenWindow = {
        id: `${app.id}-${Date.now()}`,
        appId: app.id,
        title: app.title,
        x,
        y,
        width,
        height,
        zIndex: z,
        minimized: false,
        maximized: false,
        prevRect: null,
      };
      setFocusedId(win.id);
      return [...prev, win];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prevRect) {
          return { ...w, maximized: false, ...w.prevRect, prevRect: null };
        }
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
        return {
          ...w,
          maximized: true,
          prevRect: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 10,
          y: MENU_BAR_HEIGHT + 8,
          width: vw - 20,
          height: vh - MENU_BAR_HEIGHT - DOCK_CLEARANCE,
        };
      })
    );
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w)));
    setFocusedId(id);
  }, []);

  const updateRect = useCallback(
    (id: string, rect: Partial<Pick<OpenWindow, 'x' | 'y' | 'width' | 'height'>>) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...rect } : w)));
    },
    []
  );

  const toggleFromDock = useCallback(
    (app: AppDef) => {
      const existing = windows.find((w) => w.appId === app.id);
      if (!existing) {
        openApp(app);
        return;
      }
      if (existing.minimized) {
        setWindows((prev) => prev.map((w) => (w.id === existing.id ? { ...w, minimized: false } : w)));
        bringToFront(existing.id);
      } else if (focusedId === existing.id) {
        minimizeWindow(existing.id);
      } else {
        bringToFront(existing.id);
      }
    },
    [windows, focusedId, openApp, bringToFront, minimizeWindow]
  );

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
      bringToFront(id);
    },
    [bringToFront]
  );

  const resetAll = useCallback(() => {
    setWindows([]);
    setFocusedId(null);
    zCounter.current = 10;
    cascade.current = 0;
  }, []);

  return {
    windows,
    focusedId,
    openApp,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updateRect,
    bringToFront,
    toggleFromDock,
    restoreWindow,
    resetAll,
  };
}
