import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1200;
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

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onDone}
      className="fixed inset-0 z-[2000] bg-background flex flex-col items-center justify-center gap-8 cursor-pointer"
    >
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent"
      />
      <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};
