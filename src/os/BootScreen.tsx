import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MESSAGES = ['Loading profile...', 'Mounting /projects...', 'Starting Harshal OS...'];

export const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1300;
    let frame: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 150);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const messageIndex = Math.min(MESSAGES.length - 1, Math.floor((progress / 100) * MESSAGES.length));

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onDone}
      className="fixed inset-0 z-[2000] bg-background flex flex-col items-center justify-center gap-6 cursor-pointer"
    >
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent"
      />
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide">HARSHAL OS</p>
        <p className="text-[11px] text-muted-foreground">v2.0.0</p>
      </div>
      <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-[11px] text-muted-foreground h-4">{MESSAGES[messageIndex]}</p>
    </motion.div>
  );
};
