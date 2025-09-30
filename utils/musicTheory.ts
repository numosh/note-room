import { Note, ChordTypeName, ChordData, GuitarVoicing, BassVoicing, ScaleTypeName, ScaleData, ProgressionChord } from '../types';

export const NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CHORD_TYPES: ChordTypeName[] = [
  'Major', 'Minor', 'Diminished', 'Augmented', 'Major 7th', 'Minor 7th', 'Dominant 7th',
  'Major 6th', 'Minor 6th', 'Suspended 2nd', 'Suspended 4th', 'Diminished 7th', 'Half-diminished 7th'
];

const INTERVAL_NAMES = [
  'Root', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th',
  'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th'
];

const CHORD_FORMULAS: Record<ChordTypeName, number[]> = {
  'Major': [0, 4, 7],
  'Minor': [0, 3, 7],
  'Diminished': [0, 3, 6],
  'Augmented': [0, 4, 8],
  'Major 7th': [0, 4, 7, 11],
  'Minor 7th': [0, 3, 7, 10],
  'Dominant 7th': [0, 4, 7, 10],
  'Major 6th': [0, 4, 7, 9],
  'Minor 6th': [0, 3, 7, 9],
  'Suspended 2nd': [0, 2, 7],
  'Suspended 4th': [0, 5, 7],
  'Diminished 7th': [0, 3, 6, 9],
  'Half-diminished 7th': [0, 3, 6, 10], // Also known as m7b5
};

export const getChordData = (rootNote: Note, chordType: ChordTypeName): ChordData => {
  const rootIndex = NOTES.indexOf(rootNote);
  const intervals = CHORD_FORMULAS[chordType];

  const notes = intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
  const intervalNames = intervals.map(interval => INTERVAL_NAMES[interval]);

  return {
    name: `${rootNote} ${chordType}`,
    root: rootNote,
    notes: notes,
    intervals: intervalNames,
  };
};

export const SCALE_TYPES: ScaleTypeName[] = ['Major (Ionian)', 'Dorian'];

const SCALE_FORMULAS: Record<ScaleTypeName, number[]> = {
  'Major (Ionian)': [0, 2, 4, 5, 7, 9, 11],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
};

export const getScaleData = (rootNote: Note, scaleType: ScaleTypeName): ScaleData => {
  const rootIndex = NOTES.indexOf(rootNote);
  const intervals = SCALE_FORMULAS[scaleType];

  const notes = intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
  const intervalNames = intervals.map(interval => INTERVAL_NAMES[interval]);

  return {
    name: `${rootNote} ${scaleType}`,
    root: rootNote,
    notes: notes,
    intervals: intervalNames,
  };
};

export const GUITAR_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'].reverse() as Note[];

export const GUITAR_VOICINGS: Record<string, GuitarVoicing> = {
  // Major Chords
  'C Major': { frets: [null, 3, 2, 0, 1, 0] },
  'C# Major': { frets: [null, 4, 3, 1, 2, 1] },
  'D Major': { frets: [null, null, 0, 2, 3, 2] },
  'D# Major': { frets: [null, null, 1, 3, 4, 3] },
  'E Major': { frets: [0, 2, 2, 1, 0, 0] },
  'F Major': { frets: [1, 3, 3, 2, 1, 1] },
  'F# Major': { frets: [2, 4, 4, 3, 2, 2] },
  'G Major': { frets: [3, 2, 0, 0, 0, 3] },
  'G# Major': { frets: [4, 3, 1, 1, 1, 4] },
  'A Major': { frets: [null, 0, 2, 2, 2, 0] },
  'A# Major': { frets: [null, 1, 3, 3, 3, 1] },
  'B Major': { frets: [null, 2, 4, 4, 4, 2] },

  // Minor Chords
  'C Minor': { frets: [null, 3, 5, 5, 4, 3] },
  'C# Minor': { frets: [null, 4, 6, 6, 5, 4] },
  'D Minor': { frets: [null, null, 0, 2, 3, 1] },
  'D# Minor': { frets: [null, null, 1, 3, 4, 2] },
  'E Minor': { frets: [0, 2, 2, 0, 0, 0] },
  'F Minor': { frets: [1, 3, 3, 1, 1, 1] },
  'F# Minor': { frets: [2, 4, 4, 2, 2, 2] },
  'G Minor': { frets: [3, 5, 5, 3, 3, 3] },
  'G# Minor': { frets: [4, 6, 6, 4, 4, 4] },
  'A Minor': { frets: [null, 0, 2, 2, 1, 0] },
  'A# Minor': { frets: [null, 1, 3, 3, 2, 1] },
  'B Minor': { frets: [null, 2, 4, 4, 3, 2] },
  
  // Dominant 7th
  'C Dominant 7th': { frets: [null, 3, 2, 3, 1, 0] },
  'D Dominant 7th': { frets: [null, null, 0, 2, 1, 2] },
  'E Dominant 7th': { frets: [0, 2, 0, 1, 0, 0] },
  'F Dominant 7th': { frets: [1, 3, 1, 2, 1, 1] },
  'G Dominant 7th': { frets: [3, 2, 0, 0, 0, 1] },
  'A Dominant 7th': { frets: [null, 0, 2, 0, 2, 0] },
  'B Dominant 7th': { frets: [null, 2, 1, 2, 0, 2] },

  // New Voicings
  'C Major 6th': { frets: [null, 3, 2, 2, 1, 0] },
  'G Major 6th': { frets: [3, 2, 0, 0, 0, 0] },
  'A Minor 6th': { frets: [null, 0, 2, 2, 1, 2] },
  'E Minor 6th': { frets: [0, 2, 2, 0, 2, 0] },
  'D Suspended 2nd': { frets: [null, null, 0, 2, 3, 0] },
  'A Suspended 2nd': { frets: [null, 0, 2, 2, 0, 0] },
  'D Suspended 4th': { frets: [null, null, 0, 2, 3, 3] },
  'A Suspended 4th': { frets: [null, 0, 2, 2, 3, 0] },
  'C Diminished 7th': { frets: [null, 3, 4, 2, 4, 2] },
  'G Diminished 7th': { frets: [3, 4, 5, 3, 5, 3] },
  'B Half-diminished 7th': { frets: [null, 2, 3, 2, 3, null] },
  'F# Half-diminished 7th': { frets: [2, 0, 2, 2, 1, 0] },
};

export const getGuitarVoicing = (chordName: string): GuitarVoicing | null => {
  return GUITAR_VOICINGS[chordName] || null;
};

// High G to Low B
export const BASS_TUNING: Note[] = ['G', 'D', 'A', 'E', 'B'] as Note[];

export const BASS_VOICINGS: Record<string, BassVoicing> = {
  // 5-string arpeggios/voicings
  'C Major': { frets: [5, 3, 2, 3, 1] }, // C G C E C
  'D Major': { frets: [7, 5, 4, 5, 3] }, // D A D F# D
  'E Major': { frets: [null, 2, 2, 1, 0] }, // - E B E E
  'F Major': { frets: [null, 3, 3, 2, 1] },
  'G Major': { frets: [0, null, 0, 0, 3] }, // G - A D G
  'A Major': { frets: [2, null, 0, 0, 5] },
  'B Major': { frets: [4, 2, 1, 2, 7] },

  'C Minor': { frets: [5, 3, 1, 3, 1] },
  'D Minor': { frets: [7, 5, 3, 5, 3] },
  'E Minor': { frets: [0, null, 2, 2, 0, 0] },
  'F Minor': { frets: [null, 3, 3, 1, 1] },
  'G Minor': { frets: [0, null, 0, 3, 3] },
  'A Minor': { frets: [2, 0, null, 0, 5] },
  'B Minor': { frets: [4, 2, 0, 2, 7] },

  'C Dominant 7th': { frets: [3, 3, 2, 3, 1] },
  'G Dominant 7th': { frets: [0, 3, 0, 0, 3] },
  'A Major 7th': { frets: [1, null, 0, 0, 5] },
  'D Minor 7th': { frets: [7, 5, 3, 5, 3] },
  'E Half-diminished 7th': { frets: [null, 1, 2, 0, 0] },
};

export const getBassVoicing = (chordName: string): BassVoicing | null => {
  return BASS_VOICINGS[chordName] || null;
};

export const getNoteOnFretboard = (openStringNote: Note, fret: number): Note => {
    const openStringIndex = NOTES.indexOf(openStringNote);
    return NOTES[(openStringIndex + fret) % 12];
};

export const getRomanNumeral = (chordData: ChordData, scaleData: ScaleData): string => {
  const scaleNoteIndex = scaleData.notes.indexOf(chordData.root);

  if (scaleNoteIndex === -1) {
    return '?';
  }

  const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  let numeral = ROMAN_NUMERALS[scaleNoteIndex];
  let quality = '';
  let seventh = '';

  const intervals = chordData.intervals;
  const hasMajorThird = intervals.includes('Major 3rd');
  const hasMinorThird = intervals.includes('Minor 3rd');
  const hasDiminishedFifth = intervals.includes('Tritone');
  const hasAugmentedFifth = chordData.name.includes('Augmented');

  if (hasMinorThird) {
    numeral = numeral.toLowerCase();
    quality = hasDiminishedFifth ? '°' : '';
  } else if (hasMajorThird) {
    quality = hasAugmentedFifth ? '+' : '';
  }

  if (chordData.name.includes('Sus')) {
    quality = 'sus';
  }

  if (intervals.includes('Major 7th')) {
    seventh = 'maj7';
  } else if (intervals.includes('Minor 7th')) {
    seventh = '7';
  }

  return `${numeral}${quality}${seventh}`;
};

// New function to get all diatonic chords for a scale
const getDiatonicChords = (scaleData: ScaleData): ChordData[] => {
  const diatonicChords: ChordData[] = [];
  const scaleNotes = scaleData.notes;

  for (let i = 0; i < scaleNotes.length; i++) {
    const root = scaleNotes[i];
    // Build a triad by stacking thirds from within the scale
    const third = scaleNotes[(i + 2) % scaleNotes.length];
    const fifth = scaleNotes[(i + 4) % scaleNotes.length];

    const chordNotes: Note[] = [root, third, fifth];
    
    // Determine chord quality
    const rootIndex = NOTES.indexOf(root);
    const thirdInterval = (NOTES.indexOf(third) - rootIndex + 12) % 12;
    const fifthInterval = (NOTES.indexOf(fifth) - rootIndex + 12) % 12;

    let chordType: ChordTypeName = 'Major';
    if (thirdInterval === 3 && fifthInterval === 7) {
      chordType = 'Minor';
    } else if (thirdInterval === 3 && fifthInterval === 6) {
      chordType = 'Diminished';
    } else if (thirdInterval === 4 && fifthInterval === 8) {
      chordType = 'Augmented';
    }

    diatonicChords.push(getChordData(root, chordType));
  }
  return diatonicChords;
};

// New function to generate common progressions
export const generateProgressions = (scaleData: ScaleData): ProgressionChord[][] => {
  const diatonicChords = getDiatonicChords(scaleData);
  const progressions: ProgressionChord[][] = [];

  const createProgression = (pattern: number[]): ProgressionChord[] => {
    return pattern.map(index => {
      const chord = diatonicChords[index];
      return {
        chord: chord,
        romanNumeral: getRomanNumeral(chord, scaleData),
      };
    });
  };

  // Common progression patterns (0-indexed: I=0, ii=1, etc.)
  if (scaleData.name.includes('Major')) {
    progressions.push(createProgression([0, 4, 5, 3])); // I–V–vi–IV
    progressions.push(createProgression([0, 3, 4, 0])); // I–IV–V-I
    progressions.push(createProgression([1, 4, 0])); // ii–V–I
    progressions.push(createProgression([0, 5, 3, 4])); // I–vi–IV–V
    progressions.push(createProgression([5, 3, 0, 4])); // vi–IV–I–V
  } else if (scaleData.name.includes('Dorian')) {
    // Dorian progressions often focus on the minor i and the major IV
    progressions.push(createProgression([0, 3, 6, 0])); // i-IV-VII-i
    progressions.push(createProgression([0, 1, 3, 0])); // i-ii-IV-i
    progressions.push(createProgression([0, 6, 2, 5])); // i-VII-III-vi°
  }

  return progressions;
};
