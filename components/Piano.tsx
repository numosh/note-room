import React from 'react';
import { Note } from '../types';

interface PianoProps {
  chordNotes: Note[];
  scaleNotes: Note[];
  rootNote: Note;
  onNotePlay: (note: Note) => void;
}

const PIANO_KEYS = [
  { note: 'C', type: 'white', octave: 4 }, { note: 'C#', type: 'black', octave: 4 },
  { note: 'D', type: 'white', octave: 4 }, { note: 'D#', type: 'black', octave: 4 },
  { note: 'E', type: 'white', octave: 4 },
  { note: 'F', type: 'white', octave: 4 }, { note: 'F#', type: 'black', octave: 4 },
  { note: 'G', type: 'white', octave: 4 }, { note: 'G#', type: 'black', octave: 4 },
  { note: 'A', type: 'white', octave: 4 }, { note: 'A#', type: 'black', octave: 4 },
  { note: 'B', type: 'white', octave: 4 },
  { note: 'C', type: 'white', octave: 5 }, { note: 'C#', type: 'black', octave: 5 },
  { note: 'D', type: 'white', octave: 5 }, { note: 'D#', type: 'black', octave: 5 },
  { note: 'E', type: 'white', octave: 5 },
  { note: 'F', type: 'white', octave: 5 }, { note: 'F#', type: 'black', octave: 5 },
  { note: 'G', type: 'white', octave: 5 }, { note: 'G#', type: 'black', octave: 5 },
  { note: 'A', type: 'white', octave: 5 }, { note: 'A#', type: 'black', octave: 5 },
  { note: 'B', type: 'white', octave: 5 },
];

const Piano: React.FC<PianoProps> = ({ chordNotes, scaleNotes, rootNote, onNotePlay }) => {
   const getKeyClass = (note: Note, type: 'white' | 'black') => {
    const isRoot = note === rootNote;
    const isChordNote = chordNotes.includes(note);
    const isScaleNote = scaleNotes.includes(note);

    let baseClass = type === 'white' ? 'bg-white hover:bg-gray-200' : 'bg-gray-900 hover:bg-gray-700';
    let textClass = type === 'white' ? 'text-gray-600' : 'text-gray-400';
    let ringClass = '';

    if (isScaleNote) {
      baseClass = 'bg-cyan-900 hover:bg-cyan-800';
      textClass = 'text-cyan-200';
    }

    if (isChordNote) {
      baseClass = 'bg-cyan-500 hover:bg-cyan-400';
      textClass = 'text-white';
    }

    if (isRoot) {
        ringClass = 'ring-4 ring-offset-2 ring-offset-gray-800 ring-yellow-400 z-20';
    }
    
    return { baseClass, textClass, ringClass };
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Piano View</h3>
      <div className="relative flex h-48 select-none">
        {PIANO_KEYS.map(({ note, type, octave }, index) => {
          if (type !== 'white') return null;
          const { baseClass, textClass, ringClass } = getKeyClass(note as Note, 'white');
          const whiteKeyContainerStyle = {
            zIndex: ringClass ? 20 : 1,
          };
          return (
             <div key={`${note}${octave}-${index}-container`} className="relative flex-1" style={whiteKeyContainerStyle}>
                <div
                    onMouseDown={() => onNotePlay(note as Note)}
                    className={`w-full h-full border-2 border-gray-900 rounded-b-md transition-colors duration-200 cursor-pointer ${baseClass} ${ringClass}`}
                >
                    <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 font-semibold ${textClass}`}>
                    {note}
                    </span>
                </div>
            </div>
          );
        })}
        
        {PIANO_KEYS.map(({ note, type, octave }, index) => {
            if (type !== 'black') return null;

            const { baseClass, textClass, ringClass } = getKeyClass(note as Note, 'black');
            const whiteKeysBefore = PIANO_KEYS.slice(0, index).filter(k => k.type === 'white').length;
            const whiteKeyCount = PIANO_KEYS.filter(k => k.type === 'white').length;
            const keyWidth = 100 / whiteKeyCount;
            const blackKeyStyle: React.CSSProperties = {
                left: `${whiteKeysBefore * keyWidth - (keyWidth * 0.35)}%`,
                width: `${keyWidth * 0.7}%`
            };

            return (
                <div
                    key={`${note}${octave}-${index}`}
                    onMouseDown={() => onNotePlay(note as Note)}
                    className={`absolute top-0 h-2/3 border-2 border-gray-900 rounded-b-md transition-colors duration-200 z-30 cursor-pointer ${baseClass} ${ringClass}`}
                    style={blackKeyStyle}
                >
                     <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold ${textClass}`}>
                      {note}
                    </span>
                </div>
            );
        })}

      </div>
       <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-yellow-400 ring-2 ring-yellow-600 mr-2"></div>Root</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-cyan-500 mr-2"></div>Chord Note</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-cyan-900 mr-2"></div>Scale Note</div>
      </div>
    </div>
  );
};

export default Piano;