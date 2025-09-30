
import React from 'react';
import { GuitarVoicing, Note } from '../types';
import { GUITAR_TUNING, getNoteOnFretboard } from '../utils/musicTheory';

interface FretboardProps {
  voicing: GuitarVoicing | null;
  chordName: string;
  scaleNotes: Note[];
  chordNotes: Note[];
  rootNote: Note;
  bassNote: Note;
}

const Fretboard: React.FC<FretboardProps> = ({ voicing, chordName, scaleNotes, chordNotes, rootNote, bassNote }) => {
  const NUM_FRETS = 12;
  const stringNames = ['e', 'B', 'G', 'D', 'A', 'E'];

  const renderNoteDot = (stringIndex: number, fret: number) => {
    const note = getNoteOnFretboard(GUITAR_TUNING[stringIndex], fret);

    if (!scaleNotes.includes(note)) return null;

    const isRoot = note === rootNote;
    const isBass = note === bassNote;
    const isChordNote = chordNotes.includes(note);
    const isVoicingNote = voicing?.frets[stringIndex] === fret;

    let dotClass = 'border-2 border-gray-400 text-gray-400';
    if (isChordNote) dotClass = 'bg-cyan-900 text-cyan-200 border-cyan-700';
    if (isBass && !isRoot) dotClass = 'bg-purple-500 text-white border-purple-400';
    if (isRoot) dotClass = 'bg-yellow-400 text-black border-yellow-600 font-bold';
    if (isVoicingNote) dotClass = 'bg-cyan-500 text-white border-cyan-300 ring-2 ring-white scale-110';
    
    const dotStyle: React.CSSProperties = {
      top: `${stringIndex * (100 / (stringNames.length-1))}%`,
      left: `calc(40px + ${fret * (100 / (NUM_FRETS + 1.5))}% - ${(100 / (NUM_FRETS + 1.5)) / 2}% )`,
      transform: 'translate(-50%, -50%)',
    };
    
    if (fret === 0) {
        dotStyle.left = `12px`;
    }

    return (
      <div 
        key={`note-${stringIndex}-${fret}`} 
        className={`absolute w-7 h-7 rounded-full flex justify-center items-center text-sm shadow-lg transition-all duration-200 z-10 ${dotClass}`} 
        style={dotStyle}
      >
        {note}
      </div>
    );
  };
  
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 overflow-x-auto">
       <h3 className="text-xl font-bold text-gray-200 mb-4">Guitar Fretboard <span className="text-base font-normal text-gray-400">- {voicing ? `Voicing for ${chordName}` : 'Scale View'}</span></h3>

      <div className="relative" style={{ minWidth: '700px', height: '170px' }}>
        {/* Frets */}
        <div className="flex h-full">
          <div className="w-10 border-r-8 border-gray-400" /> {/* Nut */}
          {[...Array(NUM_FRETS)].map((_, i) => (
            <div key={`fret-${i}`} className="flex-1 border-r-2 border-gray-500" />
          ))}
        </div>

        {/* Strings */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-around py-1">
          {stringNames.map((name, i) => (
            <div key={`string-${name}-${i}`} className="flex items-center">
              <span className="w-8 text-center text-gray-400">{name}</span>
              <div className="w-full h-[2px] bg-gray-600" />
            </div>
          ))}
        </div>
        
        {/* Fret Markers */}
        {[3, 5, 7, 9, 12].map(fret => (
           <div key={`marker-${fret}`} className="absolute top-1/2 -translate-y-1/2 flex justify-center items-center z-0" style={{ left: `calc(40px + ${fret * (100/(NUM_FRETS + 1.5))}% - ${(100/(NUM_FRETS + 1.5))/2}% )` }}>
              <div className={`w-4 h-4 rounded-full ${fret === 12 ? 'bg-gray-500/80' : 'bg-gray-600'}`} />
              {fret === 12 && <div className="absolute -top-10 w-4 h-4 rounded-full bg-gray-500/80" />}
              {fret === 12 && <div className="absolute top-10 w-4 h-4 rounded-full bg-gray-500/80" />}
           </div>
        ))}
        
        {/* Scale & Voicing Notes */}
        {GUITAR_TUNING.map((_, stringIndex) => 
          [...Array(NUM_FRETS + 1)].map((_, fret) => renderNoteDot(stringIndex, fret))
        )}
      </div>
      <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-cyan-500 ring-2 ring-white mr-2"></div>Voicing Note</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>Root Note</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>Bass Note</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-cyan-900 mr-2"></div>Chord Note</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full border-2 border-gray-400 mr-2"></div>Scale Note</div>
      </div>
    </div>
  );
};

export default Fretboard;