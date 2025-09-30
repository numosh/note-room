import { Note, ProgressionChord } from '../types';

// Frequencies for notes in octave 4 (Middle C)
const NOTE_FREQUENCIES: Record<Note, number> = {
  'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63,
  'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00,
  'A#': 466.16, 'B': 493.88,
};

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    // Standard and webkit fallback for Safari
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Function to play a single note with an improved envelope and waveform
const playNoteWithEnvelope = (note: Note, duration: number, startTime: number, context: AudioContext) => {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  // Use a richer 'triangle' waveform for better clarity and a more pleasant tone.
  oscillator.type = 'triangle';
  oscillator.frequency.value = NOTE_FREQUENCIES[note];

  // A more defined ADSR-like envelope for a clearer, more percussive sound.
  // Reduced gain to prevent clipping with the richer waveform, especially in chords.
  const peakGain = 0.4;
  const attackDuration = 0.02;
  const decayDuration = 0.2;
  const sustainLevel = 0.1;

  gainNode.gain.setValueAtTime(0, startTime);
  // Attack: quick ramp up to peak gain
  gainNode.gain.linearRampToValueAtTime(peakGain, startTime + attackDuration);
  // Decay: fall from peak to a lower sustain level
  gainNode.gain.exponentialRampToValueAtTime(sustainLevel, startTime + attackDuration + decayDuration);
  // Release: from sustain level to zero over the rest of the note's duration
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

export const playChord = (notes: Note[]): Promise<void> => {
  return new Promise(resolve => {
    const context = getAudioContext();
    const startTime = context.currentTime;
    const duration = 0.8;
    notes.forEach(note => {
      playNoteWithEnvelope(note, duration, startTime, context);
    });
    setTimeout(resolve, duration * 1000);
  });
};

export const playProgression = (progression: ProgressionChord[]): Promise<void> => {
  return new Promise(resolve => {
    const context = getAudioContext();
    let startTime = context.currentTime;
    const chordDuration = 0.7;
    const gap = 0.1;

    progression.forEach((item, index) => {
      const scheduledTime = startTime + index * (chordDuration + gap);
      item.chord.notes.forEach(note => {
        playNoteWithEnvelope(note, chordDuration, scheduledTime, context);
      });
    });

    const totalDuration = progression.length * (chordDuration + gap);
    setTimeout(resolve, totalDuration * 1000);
  });
};

export const playPianoNote = (note: Note) => {
    const context = getAudioContext();
    const startTime = context.currentTime;
    const duration = 0.5;
    playNoteWithEnvelope(note, duration, startTime, context);
}
