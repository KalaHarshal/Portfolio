import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OpenWindow } from './types';
import { MENU_BAR_HEIGHT } from './hooks/useWindowManager';
import { useSystem } from './SystemContext';

interface WindowProps {
  win: OpenWindow;
  focused: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragEnd: (x: number, y: number) => void;
  onResizeEnd: (rect: { x: number; y: number; width: number; height: number }) => void;
}

export const Window = ({
  win,
  focused,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragEnd,
  onResizeEnd,
}: WindowProps) => {
  const { reduceMotion } = useSystem();
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const resizeState = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
  const posRef = useRef({ x: win.x, y: win.y });
  const sizeRef = useRef({ width: win.width, height: win.height });
  const elRef = useRef<HTMLDivElement>(null);

  posRef.current = { x: win.x, y: win.y };
  sizeRef.current = { width: win.width, height: win.height };

  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized) return;
      onFocus();
      dragState.current = { startX: e.clientX, startY: e.clientY, originX: win.x, originY: win.y };

      const handleMove = (ev: PointerEvent) => {
        if (!dragState.current || !elRef.current) return;
        const dx = ev.clientX - dragState.current.startX;
        const dy = ev.clientY - dragState.current.startY;
        const nx = Math.max(
          -sizeRef.current.width + 100,
          Math.min(window.innerWidth - 100, dragState.current.originX + dx)
        );
        const ny = Math.max(MENU_BAR_HEIGHT, Math.min(window.innerHeight - 44, dragState.current.originY + dy));
        elRef.current.style.left = `${nx}px`;
        elRef.current.style.top = `${ny}px`;
        posRef.current = { x: nx, y: ny };
      };
      const handleUp = () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        onDragEnd(posRef.current.x, posRef.current.y);
        dragState.current = null;
      };
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    },
    [win.x, win.y, win.maximized, onFocus, onDragEnd]
  );

  const handleResizeStart = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      if (win.maximized) return;
      onFocus();
      resizeState.current = { startX: e.clientX, startY: e.clientY, startW: win.width, startH: win.height };

      const handleMove = (ev: PointerEvent) => {
        if (!resizeState.current || !elRef.current) return;
        const dx = ev.clientX - resizeState.current.startX;
        const dy = ev.clientY - resizeState.current.startY;
        const nw = Math.max(320, resizeState.current.startW + dx);
        const nh = Math.max(220, resizeState.current.startH + dy);
        elRef.current.style.width = `${nw}px`;
        elRef.current.style.height = `${nh}px`;
        sizeRef.current = { width: nw, height: nh };
      };
      const handleUp = () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        onResizeEnd({ x: posRef.current.x, y: posRef.current.y, width: sizeRef.current.width, height: sizeRef.current.height });
        resizeState.current = null;
      };
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    },
    [win.width, win.height, win.maximized, onFocus, onResizeEnd]
  );

  if (win.minimized) return null;

  return (
    <motion.div
      ref={elRef}
      role="dialog"
      aria-label={win.title}
      onPointerDownCapture={onFocus}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 60 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }}
      className={cn(
        'flex flex-col rounded-xl overflow-hidden border shadow-2xl bg-card/90 backdrop-blur-2xl',
        focused ? 'border-border/70' : 'border-border/30 opacity-95'
      )}
    >
      {/* Title bar */}
      <div
        onPointerDown={handleDragStart}
        onDoubleClick={onMaximize}
        className="flex items-center gap-2 h-10 px-3 shrink-0 bg-secondary/60 border-b border-border/40 cursor-default select-none"
      >
        <div className="flex items-center gap-2 group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-70" strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize"
            className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-70" strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label="Maximize"
            className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center"
          >
            <Maximize2 className="w-1.5 h-1.5 opacity-0 group-hover:opacity-70" strokeWidth={3} />
          </button>
        </div>
        <p className="flex-1 text-center text-xs font-medium text-muted-foreground truncate pr-12">
          {win.title}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-auto">{children}</div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          onPointerDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        />
      )}
    </motion.div>
  );
};
