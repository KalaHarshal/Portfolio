import { useEffect, useRef } from 'react';
import { useSystem } from './SystemContext';

export const Wallpaper = () => {
  const { reduceMotion } = useSystem();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsl(var(--primary) / 0.07), transparent 60%)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ambient corner glows */}
      <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -top-40 -left-32 w-[460px] h-[460px] rounded-full bg-accent/20 blur-[120px]" />

      {/* Faint starfield, only shows in dark mode */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-60"
        style={{
          backgroundImage: [
            'radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.55), transparent)',
            'radial-gradient(1px 1px at 90px 110px, rgba(255,255,255,0.4), transparent)',
            'radial-gradient(1.5px 1.5px at 150px 40px, rgba(255,255,255,0.35), transparent)',
            'radial-gradient(1px 1px at 60px 165px, rgba(255,255,255,0.3), transparent)',
            'radial-gradient(1px 1px at 195px 95px, rgba(255,255,255,0.45), transparent)',
            'radial-gradient(1px 1px at 10px 190px, rgba(255,255,255,0.3), transparent)',
          ].join(', '),
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
        }}
      />

      {/* Subtle glow that follows the cursor */}
      {!reduceMotion && (
        <div ref={glowRef} className="absolute inset-0 transition-[background] duration-300 ease-out" />
      )}
    </div>
  );
};
