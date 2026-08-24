// Lightweight, dependency-free sound effects synthesized with the Web Audio API.
// Nothing is fetched over the network — every sound is a couple of short oscillator tones.

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  if (!sharedCtx) sharedCtx = new AudioCtor();
  if (sharedCtx.state === 'suspended') void sharedCtx.resume();
  return sharedCtx;
}

function tone(freq: number, duration: number, delay = 0, peak = 0.05, type: OscillatorType = 'sine') {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const startAt = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(peak, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

export function playOpenSound(enabled: boolean) {
  if (!enabled) return;
  tone(520, 0.09, 0, 0.05);
  tone(780, 0.12, 0.05, 0.04);
}

export function playCloseSound(enabled: boolean) {
  if (!enabled) return;
  tone(600, 0.08, 0, 0.04);
  tone(360, 0.1, 0.04, 0.035);
}

export function playUnlockSound(enabled: boolean) {
  if (!enabled) return;
  tone(440, 0.1, 0, 0.05);
  tone(660, 0.12, 0.08, 0.05);
  tone(880, 0.16, 0.16, 0.05);
}
