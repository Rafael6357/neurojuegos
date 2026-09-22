// Web Audio API Sound Synthesizer & Dynamic Background Music Engine
// 100% Offline, lightweight, with zero external file dependencies

export type MusicTheme = 'menu' | 'lenguaje' | 'memoria' | 'atencion' | 'juego';

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let musicEnabled = true;
let sfxVolume = 0.5;
let musicVolume = 0.25;

// Master gain nodes
let sfxGainNode: GainNode | null = null;
let musicGainNode: GainNode | null = null;

// Background music state
let currentTheme: MusicTheme | null = null;
let musicIntervalId: number | null = null;
let isMusicPlaying = false;
let stepIndex = 0;

// Initialize settings from localStorage
if (typeof window !== 'undefined') {
  try {
    const storedSound = localStorage.getItem('neurojuegos_sound_enabled');
    if (storedSound !== null) soundEnabled = storedSound === 'true';

    const storedMusic = localStorage.getItem('neurojuegos_music_enabled');
    if (storedMusic !== null) musicEnabled = storedMusic === 'true';

    const storedSfxVol = localStorage.getItem('neurojuegos_sfx_volume');
    if (storedSfxVol !== null) sfxVolume = Math.max(0, Math.min(1, parseFloat(storedSfxVol)));

    const storedMusicVol = localStorage.getItem('neurojuegos_music_volume');
    if (storedMusicVol !== null) musicVolume = Math.max(0, Math.min(1, parseFloat(storedMusicVol)));
  } catch {
    // LocalStorage fallback
  }
}

export const getSoundEnabled = (): boolean => soundEnabled;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('neurojuegos_sound_enabled', enabled ? 'true' : 'false');
  }
  if (sfxGainNode && audioCtx) {
    sfxGainNode.gain.setValueAtTime(enabled ? sfxVolume : 0, audioCtx.currentTime);
  }
};

export const getMusicEnabled = (): boolean => musicEnabled;

export const setMusicEnabled = (enabled: boolean) => {
  musicEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('neurojuegos_music_enabled', enabled ? 'true' : 'false');
  }
  if (musicGainNode && audioCtx) {
    musicGainNode.gain.setValueAtTime(enabled ? musicVolume : 0, audioCtx.currentTime);
  }
  if (enabled) {
    if (currentTheme) {
      startMusic(currentTheme);
    } else {
      startMusic('menu');
    }
  } else {
    stopMusic();
  }
};

export const getSoundVolume = (): number => sfxVolume;

export const setSoundVolume = (vol: number) => {
  sfxVolume = Math.max(0, Math.min(1, vol));
  if (typeof window !== 'undefined') {
    localStorage.setItem('neurojuegos_sfx_volume', sfxVolume.toString());
  }
  if (sfxGainNode && audioCtx) {
    sfxGainNode.gain.setValueAtTime(soundEnabled ? sfxVolume : 0, audioCtx.currentTime);
  }
};

export const getMusicVolume = (): number => musicVolume;

export const setMusicVolume = (vol: number) => {
  musicVolume = Math.max(0, Math.min(1, vol));
  if (typeof window !== 'undefined') {
    localStorage.setItem('neurojuegos_music_volume', musicVolume.toString());
  }
  if (musicGainNode && audioCtx) {
    musicGainNode.gain.setValueAtTime(musicEnabled ? musicVolume : 0, audioCtx.currentTime);
  }
};

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      
      // Master SFX gain
      sfxGainNode = audioCtx.createGain();
      sfxGainNode.gain.setValueAtTime(soundEnabled ? sfxVolume : 0, audioCtx.currentTime);
      sfxGainNode.connect(audioCtx.destination);

      // Master Music gain
      musicGainNode = audioCtx.createGain();
      musicGainNode.gain.setValueAtTime(musicEnabled ? musicVolume : 0, audioCtx.currentTime);
      musicGainNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// ==========================================
// SOUND EFFECTS (SFX)
// ==========================================

export const playClick = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
};

export const playCorrect = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;
  const now = ctx.currentTime;

  // High cheerful major chord arpeggio (C5, E5, G5, C6)
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    gain.gain.setValueAtTime(0.25, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

    osc.connect(gain);
    gain.connect(sfxGainNode!);
    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.3);
  });
};

export const playVictory = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;
  const now = ctx.currentTime;

  // Triumphant Fanfare: C4, E4, G4, C5 (held)
  const notes = [
    { freq: 523.25, time: 0, dur: 0.15 },
    { freq: 659.25, time: 0.15, dur: 0.15 },
    { freq: 783.99, time: 0.3, dur: 0.15 },
    { freq: 1046.5, time: 0.45, dur: 0.65 },
  ];
  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);
    gain.gain.setValueAtTime(0.3, now + time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    osc.connect(gain);
    gain.connect(sfxGainNode!);
    osc.start(now + time);
    osc.stop(now + time + dur);
  });
};

export const playError = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start(now);
  osc.stop(now + 0.25);
};

export const playFlip = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
  gain.gain.setValueAtTime(0.16, now);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start(now);
  osc.stop(now + 0.12);
};

export const playCountdownTick = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};

export const playCardSelect = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || !sfxGainNode) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.09);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.09);

  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start();
  osc.stop(ctx.currentTime + 0.09);
};

// ==========================================
// BACKGROUND MUSIC SYNTHESIZER
// ==========================================

// Musical note frequencies (Hz)
const NOTES = {
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
  REST: 0,
};

// Melodic patterns for each cognitive theme (looping musical sequences)
const THEME_PATTERNS: Record<MusicTheme, { melody: number[]; bass: number[]; tempoMs: number }> = {
  // Menu / Welcome: Warm, playful acoustic lullaby / music-box style
  menu: {
    tempoMs: 320,
    melody: [
      NOTES.C4, NOTES.E4, NOTES.G4, NOTES.E4,
      NOTES.A4, NOTES.G4, NOTES.E4, NOTES.C4,
      NOTES.D4, NOTES.F4, NOTES.A4, NOTES.F4,
      NOTES.G4, NOTES.F4, NOTES.D4, NOTES.B3,
    ],
    bass: [
      NOTES.C3, NOTES.REST, NOTES.G3, NOTES.REST,
      NOTES.A3, NOTES.REST, NOTES.E3, NOTES.REST,
      NOTES.F3, NOTES.REST, NOTES.C3, NOTES.REST,
      NOTES.G3, NOTES.REST, NOTES.G3, NOTES.REST,
    ],
  },

  // Lenguaje: Cheerful nursery melody, encouraging speech and reading
  lenguaje: {
    tempoMs: 290,
    melody: [
      NOTES.G4, NOTES.E4, NOTES.G4, NOTES.E4,
      NOTES.G4, NOTES.A4, NOTES.G4, NOTES.E4,
      NOTES.F4, NOTES.D4, NOTES.F4, NOTES.D4,
      NOTES.E4, NOTES.F4, NOTES.G4, NOTES.REST,
    ],
    bass: [
      NOTES.C3, NOTES.REST, NOTES.E3, NOTES.REST,
      NOTES.G3, NOTES.REST, NOTES.C3, NOTES.REST,
      NOTES.D3, NOTES.REST, NOTES.F3, NOTES.REST,
      NOTES.G3, NOTES.REST, NOTES.C3, NOTES.REST,
    ],
  },

  // Memoria: Calm, focused, crystal-like chime notes for concentration
  memoria: {
    tempoMs: 350,
    melody: [
      NOTES.E4, NOTES.G4, NOTES.B4, NOTES.G4,
      NOTES.D4, NOTES.F4, NOTES.A4, NOTES.F4,
      NOTES.C4, NOTES.E4, NOTES.G4, NOTES.E4,
      NOTES.D4, NOTES.E4, NOTES.F4, NOTES.G4,
    ],
    bass: [
      NOTES.E3, NOTES.REST, NOTES.B3, NOTES.REST,
      NOTES.D3, NOTES.REST, NOTES.A3, NOTES.REST,
      NOTES.C3, NOTES.REST, NOTES.G3, NOTES.REST,
      NOTES.D3, NOTES.REST, NOTES.G3, NOTES.REST,
    ],
  },

  // Atención: Playful, upbeat, staccato bells to maintain focus and alertness
  atencion: {
    tempoMs: 260,
    melody: [
      NOTES.A4, NOTES.C5, NOTES.E5, NOTES.C5,
      NOTES.G4, NOTES.B4, NOTES.D5, NOTES.B4,
      NOTES.F4, NOTES.A4, NOTES.C5, NOTES.A4,
      NOTES.E4, NOTES.G4, NOTES.B4, NOTES.D5,
    ],
    bass: [
      NOTES.A3, NOTES.REST, NOTES.E3, NOTES.REST,
      NOTES.G3, NOTES.REST, NOTES.D3, NOTES.REST,
      NOTES.F3, NOTES.REST, NOTES.C3, NOTES.REST,
      NOTES.E3, NOTES.REST, NOTES.E3, NOTES.REST,
    ],
  },

  // Juego genérico fallback
  juego: {
    tempoMs: 300,
    melody: [
      NOTES.C4, NOTES.G4, NOTES.E4, NOTES.A4,
      NOTES.G4, NOTES.C5, NOTES.E4, NOTES.G4,
    ],
    bass: [
      NOTES.C3, NOTES.REST, NOTES.G3, NOTES.REST,
      NOTES.C3, NOTES.REST, NOTES.G3, NOTES.REST,
    ],
  },
};

const playMusicalNote = (
  freq: number,
  time: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.08
) => {
  if (freq === 0) return;
  const ctx = getAudioContext();
  if (!ctx || !musicGainNode) return;

  const osc = ctx.createOscillator();
  const noteGain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);

  // Soft attack and natural decay like a chime / vibraphone
  noteGain.gain.setValueAtTime(0.001, time);
  noteGain.gain.linearRampToValueAtTime(volume, time + 0.03);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(noteGain);
  noteGain.connect(musicGainNode);

  osc.start(time);
  osc.stop(time + duration);
};

export const startMusic = (theme: MusicTheme = 'menu') => {
  currentTheme = theme;
  if (!musicEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  // If already playing this theme, keep running
  if (isMusicPlaying && currentTheme === theme && musicIntervalId !== null) {
    return;
  }

  stopMusic();

  const pattern = THEME_PATTERNS[theme] || THEME_PATTERNS.menu;
  stepIndex = 0;
  isMusicPlaying = true;

  const step = () => {
    if (!isMusicPlaying || !musicEnabled) return;
    const now = ctx.currentTime;
    const melNote = pattern.melody[stepIndex % pattern.melody.length];
    const bassNote = pattern.bass[stepIndex % pattern.bass.length];

    // Melody: gentle triangle wave (bell/marimba sound)
    playMusicalNote(melNote, now, (pattern.tempoMs / 1000) * 1.2, 'triangle', 0.12);

    // Bass: soft sine wave for gentle harmonic foundation
    playMusicalNote(bassNote, now, (pattern.tempoMs / 1000) * 1.5, 'sine', 0.1);

    stepIndex++;
  };

  step();
  musicIntervalId = window.setInterval(step, pattern.tempoMs);
};

export const stopMusic = () => {
  isMusicPlaying = false;
  if (musicIntervalId !== null) {
    clearInterval(musicIntervalId);
    musicIntervalId = null;
  }
};

export const getCurrentMusicTheme = (): MusicTheme | null => currentTheme;
