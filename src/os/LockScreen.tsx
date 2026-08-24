import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

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
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
          HK
        </div>
        <p className="font-medium">Harshal Kala</p>
        <p className="text-xs text-muted-foreground animate-pulse">Click anywhere to enter portfolio</p>
      </div>
    </motion.div>
  );
};
