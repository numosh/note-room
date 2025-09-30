export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export type Inversion = 0 | 1 | 2 | 3;

export type ChordTypeName = 
  | 'Major' 
  | 'Minor' 
  | 'Diminished' 
  | 'Augmented'
  | 'Major 7th'
  | 'Minor 7th'
  | 'Dominant 7th'
  | 'Major 6th'
  | 'Minor 6th'
  | 'Suspended 2nd'
  | 'Suspended 4th'
  | 'Diminished 7th'
  | 'Half-diminished 7th';

export interface ChordData {
  name: string;
  root: Note;
  bassNote: Note;
  notes: Note[];
  intervals: string[];
  inversion: Inversion;
  type: ChordTypeName;
}

export type ScaleTypeName = 
  | 'Major (Ionian)' 
  | 'Dorian' 
  | 'Phrygian' 
  | 'Lydian' 
  | 'Mixolydian' 
  | 'Aeolian (Minor)' 
  | 'Locrian';

export interface ScaleData {
  name: string;
  root: Note;
  notes: Note[];
  intervals: string[];
}

export interface GuitarVoicing {
  frets: (number | null)[]; // 6 strings
}

export interface BassVoicing {
  frets: (number | null)[]; // 5 strings
}

export interface ProgressionChord {
  chord: ChordData;
  romanNumeral: string;
}

export interface QuizQuestion {
  correctAnswer: ChordData;
  options: ChordTypeName[];
}