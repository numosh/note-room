import { Note, ChordTypeName, ChordData, GuitarVoicing, BassVoicing, ScaleTypeName, ScaleData, ProgressionChord, Inversion, QuizQuestion } from '../types';

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

export const getChordData = (rootNote: Note, chordType: ChordTypeName, inversion: Inversion): ChordData => {
  const rootIndex = NOTES.indexOf(rootNote);
  const formula = CHORD_FORMULAS[chordType];

  const baseNotes = formula.map(interval => NOTES[(rootIndex + interval) % 12]);
  const baseIntervals = formula.map(interval => INTERVAL_NAMES[interval]);
  
  // Apply inversion
  const invertedNotes = [...baseNotes.slice(inversion), ...baseNotes.slice(0, inversion)];
  const invertedIntervals = [...baseIntervals.slice(inversion), ...baseIntervals.slice(0, inversion)];

  const bassNote = invertedNotes[0];
  let inversionName = `${rootNote} ${chordType}`;
  if (inversion > 0) {
    const bassNoteLetter = bassNote.replace('#', '♯');
    inversionName += ` / ${bassNoteLetter}`;
  }

  return {
    name: inversionName,
    root: rootNote,
    bassNote: bassNote,
    notes: invertedNotes,
    intervals: invertedIntervals,
    inversion: inversion,
    type: chordType,
  };
};

export const SCALE_TYPES: ScaleTypeName[] = [
  'Major (Ionian)', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian (Minor)', 'Locrian'
];

const SCALE_FORMULAS: Record<ScaleTypeName, number[]> = {
  'Major (Ionian)': [0, 2, 4, 5, 7, 9, 11],
  'Dorian':         [0, 2, 3, 5, 7, 9, 10],
  'Phrygian':       [0, 1, 3, 5, 7, 8, 10],
  'Lydian':         [0, 2, 4, 6, 7, 9, 11],
  'Mixolydian':     [0, 2, 4, 5, 7, 9, 10],
  'Aeolian (Minor)':[0, 2, 3, 5, 7, 8, 10],
  'Locrian':        [0, 1, 3, 5, 6, 8, 10],
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
// ... (rest of guitar/bass voicings remain the same)
export const GUITAR_VOICINGS: Record<string, GuitarVoicing> = {
  // Major Chords
  'C Major': { frets: [null, 3, 2, 0, 1, 0] },'C# Major': { frets: [null, 4, 3, 1, 2, 1] },'D Major': { frets: [null, null, 0, 2, 3, 2] },'D# Major': { frets: [null, null, 1, 3, 4, 3] },'E Major': { frets: [0, 2, 2, 1, 0, 0] },'F Major': { frets: [1, 3, 3, 2, 1, 1] },'F# Major': { frets: [2, 4, 4, 3, 2, 2] },'G Major': { frets: [3, 2, 0, 0, 0, 3] },'G# Major': { frets: [4, 3, 1, 1, 1, 4] },'A Major': { frets: [null, 0, 2, 2, 2, 0] },'A# Major': { frets: [null, 1, 3, 3, 3, 1] },'B Major': { frets: [null, 2, 4, 4, 4, 2] },
  // Minor Chords
  'C Minor': { frets: [null, 3, 5, 5, 4, 3] },'C# Minor': { frets: [null, 4, 6, 6, 5, 4] },'D Minor': { frets: [null, null, 0, 2, 3, 1] },'D# Minor': { frets: [null, null, 1, 3, 4, 2] },'E Minor': { frets: [0, 2, 2, 0, 0, 0] },'F Minor': { frets: [1, 3, 3, 1, 1, 1] },'F# Minor': { frets: [2, 4, 4, 2, 2, 2] },'G Minor': { frets: [3, 5, 5, 3, 3, 3] },'G# Minor': { frets: [4, 6, 6, 4, 4, 4] },'A Minor': { frets: [null, 0, 2, 2, 1, 0] },'A# Minor': { frets: [null, 1, 3, 3, 2, 1] },'B Minor': { frets: [null, 2, 4, 4, 3, 2] },
  // Dominant 7th
  'C Dominant 7th': { frets: [null, 3, 2, 3, 1, 0] },'D Dominant 7th': { frets: [null, null, 0, 2, 1, 2] },'E Dominant 7th': { frets: [0, 2, 0, 1, 0, 0] },'F Dominant 7th': { frets: [1, 3, 1, 2, 1, 1] },'G Dominant 7th': { frets: [3, 2, 0, 0, 0, 1] },'A Dominant 7th': { frets: [null, 0, 2, 0, 2, 0] },'B Dominant 7th': { frets: [null, 2, 1, 2, 0, 2] },
  // Other Voicings
  'C Major 6th': { frets: [null, 3, 2, 2, 1, 0] },'G Major 6th': { frets: [3, 2, 0, 0, 0, 0] },'A Minor 6th': { frets: [null, 0, 2, 2, 1, 2] },'E Minor 6th': { frets: [0, 2, 2, 0, 2, 0] },'D Suspended 2nd': { frets: [null, null, 0, 2, 3, 0] },'A Suspended 2nd': { frets: [null, 0, 2, 2, 0, 0] },'D Suspended 4th': { frets: [null, null, 0, 2, 3, 3] },'A Suspended 4th': { frets: [null, 0, 2, 2, 3, 0] },'C Diminished 7th': { frets: [null, 3, 4, 2, 4, 2] },'G Diminished 7th': { frets: [3, 4, 5, 3, 5, 3] },'B Half-diminished 7th': { frets: [null, 2, 3, 2, 3, null] },'F# Half-diminished 7th': { frets: [2, 0, 2, 2, 1, 0] },
};
export const getGuitarVoicing = (chordName: string): GuitarVoicing | null => GUITAR_VOICINGS[chordName] || null;
export const BASS_TUNING: Note[] = ['G', 'D', 'A', 'E', 'B'] as Note[];
export const BASS_VOICINGS: Record<string, BassVoicing> = {
  'C Major': { frets: [5, 3, 2, 3, 1] },'D Major': { frets: [7, 5, 4, 5, 3] },'E Major': { frets: [null, 2, 2, 1, 0] },'F Major': { frets: [null, 3, 3, 2, 1] },'G Major': { frets: [0, null, 0, 0, 3] },'A Major': { frets: [2, null, 0, 0, 5] },'B Major': { frets: [4, 2, 1, 2, 7] },'C Minor': { frets: [5, 3, 1, 3, 1] },'D Minor': { frets: [7, 5, 3, 5, 3] },'E Minor': { frets: [0, null, 2, 2, 0, 0] },'F Minor': { frets: [null, 3, 3, 1, 1] },'G Minor': { frets: [0, null, 0, 3, 3] },'A Minor': { frets: [2, 0, null, 0, 5] },'B Minor': { frets: [4, 2, 0, 2, 7] },'C Dominant 7th': { frets: [3, 3, 2, 3, 1] },'G Dominant 7th': { frets: [0, 3, 0, 0, 3] },'A Major 7th': { frets: [1, null, 0, 0, 5] },'D Minor 7th': { frets: [7, 5, 3, 5, 3] },'E Half-diminished 7th': { frets: [null, 1, 2, 0, 0] },
};
export const getBassVoicing = (chordName: string): BassVoicing | null => BASS_VOICINGS[chordName] || null;
export const getNoteOnFretboard = (openStringNote: Note, fret: number): Note => NOTES[(NOTES.indexOf(openStringNote) + fret) % 12];
// ... (rest of music theory functions remain largely the same, but may need minor tweaks for inversions if they use chordData)

export const getRomanNumeral = (chordData: ChordData, scaleData: ScaleData): string => {
  const scaleNoteIndex = scaleData.notes.indexOf(chordData.root);
  if (scaleNoteIndex === -1) return '?'; // Chord root not in scale

  const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  let numeral = ROMAN_NUMERALS[scaleNoteIndex];

  const type = chordData.type;
  if (type.includes('Minor') || type.includes('Diminished')) {
    numeral = numeral.toLowerCase();
  }

  let quality = '';
  if (type.includes('Diminished')) {
    quality = '°';
  } else if (type.includes('Augmented')) {
    quality = '+';
  } else if (type.includes('Sus')) {
    quality = 'sus';
  }

  let seventh = '';
  if (type === 'Major 7th') {
    seventh = 'maj7';
  } else if (['Dominant 7th', 'Minor 7th', 'Half-diminished 7th', 'Diminished 7th'].includes(type)) {
    seventh = '7';
  }
  
  if (type === 'Half-diminished 7th') {
    quality = 'ø'; // Using ø symbol for half-diminished
  }

  return `${numeral}${quality}${seventh}`;
};

const getDiatonicChords = (scaleData: ScaleData, useSeventh: boolean = true): ChordData[] => {
    return scaleData.notes.map((root, i) => {
        const getNote = (offset: number) => scaleData.notes[(i + offset) % 7];
        const third = getNote(2);
        const fifth = getNote(4);
        const seventh = getNote(6);

        const rootIndex = NOTES.indexOf(root);
        const thirdInterval = (NOTES.indexOf(third) - rootIndex + 12) % 12;
        const fifthInterval = (NOTES.indexOf(fifth) - rootIndex + 12) % 12;
        const seventhInterval = (NOTES.indexOf(seventh) - rootIndex + 12) % 12;

        let chordType: ChordTypeName = 'Major'; // Default

        if (useSeventh) {
            if (thirdInterval === 4 && fifthInterval === 7 && seventhInterval === 11) chordType = 'Major 7th';
            else if (thirdInterval === 3 && fifthInterval === 7 && seventhInterval === 10) chordType = 'Minor 7th';
            else if (thirdInterval === 4 && fifthInterval === 7 && seventhInterval === 10) chordType = 'Dominant 7th';
            else if (thirdInterval === 3 && fifthInterval === 6 && seventhInterval === 10) chordType = 'Half-diminished 7th';
            else if (thirdInterval === 3 && fifthInterval === 6 && seventhInterval === 9) chordType = 'Diminished 7th';
            // Fallback for scales that don't produce standard 7th chords
            else if (thirdInterval === 3 && fifthInterval === 7) chordType = 'Minor';
            else if (thirdInterval === 3 && fifthInterval === 6) chordType = 'Diminished';
        } else {
            if (thirdInterval === 4 && fifthInterval === 7) chordType = 'Major';
            else if (thirdInterval === 3 && fifthInterval === 7) chordType = 'Minor';
            else if (thirdInterval === 3 && fifthInterval === 6) chordType = 'Diminished';
            else if (thirdInterval === 4 && fifthInterval === 8) chordType = 'Augmented';
        }

        return getChordData(root, chordType, 0);
    });
};


export const generateProgressions = (scaleData: ScaleData): ProgressionChord[][] => {
  const diatonicChords = getDiatonicChords(scaleData, true);
  const progressions: ProgressionChord[][] = [];
  
  const createProgression = (pattern: number[], chords: ChordData[] = diatonicChords): ProgressionChord[] | null => {
    if (pattern.some(index => index >= chords.length)) return null;
    return pattern.map(index => {
      const chord = chords[index];
      return { chord, romanNumeral: getRomanNumeral(chord, scaleData) };
    });
  };

   if (scaleData.name.includes('Major') || scaleData.name.includes('Ionian')) {
    progressions.push(createProgression([0, 4, 5, 3])); // I–V–vi–IV
    progressions.push(createProgression([1, 4, 0]));    // ii–V–I
    progressions.push(createProgression([0, 5, 3, 4])); // I–vi–IV–V
    progressions.push(createProgression([0, 3, 1, 4])); // I-IV-ii-V

    // Gospel Progressions
    const root = scaleData.root;
    const sharpOneIndex = (NOTES.indexOf(root) + 1) % 12;
    const fourIndex = (NOTES.indexOf(root) + 5) % 12;

    const sharpOneDim7 = getChordData(NOTES[sharpOneIndex], 'Diminished 7th', 0);
    const fourMinor7 = getChordData(NOTES[fourIndex], 'Minor 7th', 0);
    const Vofii = getChordData(diatonicChords[1].root, 'Dominant 7th', 0);

    progressions.push([
      { chord: diatonicChords[0], romanNumeral: getRomanNumeral(diatonicChords[0], scaleData) },
      { chord: sharpOneDim7, romanNumeral: '#i°7'},
      { chord: diatonicChords[1], romanNumeral: getRomanNumeral(diatonicChords[1], scaleData)},
      { chord: diatonicChords[4], romanNumeral: getRomanNumeral(diatonicChords[4], scaleData)},
    ]); // I - #i°7 - ii7 - V7
    progressions.push([
      { chord: diatonicChords[0], romanNumeral: getRomanNumeral(diatonicChords[0], scaleData) },
      { chord: Vofii, romanNumeral: 'V7/ii' },
      { chord: diatonicChords[1], romanNumeral: getRomanNumeral(diatonicChords[1], scaleData) },
      { chord: diatonicChords[4], romanNumeral: getRomanNumeral(diatonicChords[4], scaleData) },
    ]); // Imaj7 - V7/ii - ii7 - V7
    progressions.push([
      { chord: diatonicChords[0], romanNumeral: getRomanNumeral(diatonicChords[0], scaleData) },
      { chord: diatonicChords[3], romanNumeral: getRomanNumeral(diatonicChords[3], scaleData) },
      { chord: fourMinor7, romanNumeral: 'iv7' },
      { chord: diatonicChords[0], romanNumeral: getRomanNumeral(diatonicChords[0], scaleData) },
    ]); // Imaj7 - IVmaj7 - ivm7 - Imaj7

  } else if (scaleData.name.includes('Minor') || scaleData.name.includes('Aeolian')) {
     progressions.push(createProgression([0, 5, 2, 6])); // i-VI-III-VII
     progressions.push(createProgression([0, 3, 0, 6])); // i-iv-i-VII
  } else if (scaleData.name.includes('Dorian')) {
    progressions.push(createProgression([0, 3, 0])); // i-IV-i
  }

  return progressions.filter(p => p !== null) as ProgressionChord[][];
};


export const identifyChord = (selectedNotes: Note[]): string[] => {
  if (selectedNotes.length < 2) return [];

  const uniqueSelectedNotes = [...new Set(selectedNotes)].sort();
  const noteIndexes = uniqueSelectedNotes.map(n => NOTES.indexOf(n));

  const foundChords: string[] = [];
  
  // Check for inversions by trying each selected note as a potential root
  for (const rootNote of uniqueSelectedNotes) {
    const rootNoteIndex = NOTES.indexOf(rootNote);
    
    // Calculate intervals relative to the potential root
    const intervals = noteIndexes.map(i => (i - rootNoteIndex + 12) % 12).sort((a,b) => a - b);
    
    for (const chordType of CHORD_TYPES) {
      const formula = CHORD_FORMULAS[chordType].sort((a,b) => a-b);
      
      if (intervals.length === formula.length && intervals.every((val, index) => val === formula[index])) {
        foundChords.push(`${rootNote} ${chordType}`);
      }
    }
  }

  return foundChords;
};


export const getCircleOfFifthsData = () => {
    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const minorKeys = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F', 'C', 'G', 'D'];
    
    return majorKeys.map((majorKey, index) => {
        const angle = index * 30; // 360 / 12 = 30 degrees per key
        return {
            major: majorKey as Note,
            minor: minorKeys[index] as Note,
            angle,
        };
    });
};

// Helper to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const generateQuizQuestion = (): QuizQuestion => {
    const quizChordTypes: ChordTypeName[] = [
        'Major', 'Minor', 'Dominant 7th', 'Major 7th', 'Minor 7th', 'Diminished', 'Augmented'
    ];

    const rootNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    const correctType = quizChordTypes[Math.floor(Math.random() * quizChordTypes.length)];
    const correctAnswer = getChordData(rootNote, correctType, 0);

    const options: ChordTypeName[] = [correctType];
    while (options.length < 4) {
        const randomOption = quizChordTypes[Math.floor(Math.random() * quizChordTypes.length)];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    
    return {
        correctAnswer,
        options: shuffleArray(options),
    };
};