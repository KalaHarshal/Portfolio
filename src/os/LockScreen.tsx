import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Enter or Space also unlocks, not just a click — nicer for keyboard users.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onUnlock();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onUnlock]);

  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      onClick={onUnlock}
      className="fixed inset-0 z-[1900] flex flex-col items-center justify-center gap-6 cursor-pointer bg-gradient-to-br from-background via-background to-primary/10"
    >
      <div className="text-center">
        <p className="text-7xl md:text-8xl font-light tracking-tight">{time}</p>
        <p className="text-lg text-muted-foreground mt-2">{date}</p>
      </div>
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
          HK
        </div>
        <p className="font-medium">Harshal Kala</p>
        <p className="text-xs text-muted-foreground">Full-Stack Developer</p>
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Available for opportunities
        </p>
        <p className="text-xs text-muted-foreground animate-pulse mt-4">
          Click anywhere or press Enter ↵
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-3 tracking-wide">Harshal OS</p>
      </div>
    </motion.div>
  );
};
