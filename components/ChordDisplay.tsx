import React from 'react';
import { ChordData, Note } from '../types';
import { NOTES } from '../utils/musicTheory';

// Helper to get interval between two notes
const getIntervalSemitones = (note1: Note, note2: Note): number => {
    const index1 = NOTES.indexOf(note1);
    const index2 = NOTES.indexOf(note2);
    return (index2 - index1 + 12) % 12;
};

const INTERVAL_ABBREVIATIONS: { [key: number]: string } = {
    1: 'm2', 2: 'M2', 3: 'm3', 4: 'M3', 5: 'P4', 6: 'TT',
    7: 'P5', 8: 'm6', 9: 'M6', 10: 'm7', 11: 'M7'
};

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.14v13.72L19.25 12 8 5.14z" />
  </svg>
);

interface ChordDisplayProps {
  chordData: ChordData;
  onPlay: () => void;
  isPlaying: boolean;
}

const ChordDisplay: React.FC<ChordDisplayProps> = ({ chordData, onPlay, isPlaying }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 overflow-x-auto">
      <div className="flex justify-center items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-center text-cyan-400 tracking-wide">
          {chordData.name}
        </h2>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className="p-2 rounded-full bg-cyan-500 text-white transition-all duration-200 enabled:hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          aria-label={`Play ${chordData.name} chord`}
        >
          <PlayIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center items-center py-4" style={{ minWidth: '500px' }}>
        <div className="flex justify-center items-center space-x-2 md:space-x-4">
          {chordData.notes.map((note, index) => {
            const isRoot = note === chordData.root;
            const isBass = index === 0;
            const interval = chordData.intervals[index];

            // Calculate interval from previous note
            let intervalFromPrev = null;
            if (index > 0) {
              const semitones = getIntervalSemitones(chordData.notes[index - 1], note);
              intervalFromPrev = INTERVAL_ABBREVIATIONS[semitones];
            }
            
            let noteClass = 'bg-gray-700 text-white border-4 border-gray-600';
            if (isRoot) {
                noteClass = 'bg-yellow-400 text-black border-4 border-yellow-300';
            }
            if (isBass && !isRoot) {
                noteClass = 'bg-purple-500 text-white border-4 border-purple-400';
            }


            return (
              <React.Fragment key={`${note}-${index}`}>
                {/* Connector */}
                {index > 0 && (
                  <div className="flex flex-col items-center self-start mt-6 md:mt-5">
                    <div className="text-cyan-400 text-xs md:text-sm font-mono">
                      +{intervalFromPrev}
                    </div>
                    <div className="w-8 md:w-16 h-1 bg-gray-600 mt-1"></div>
                  </div>
                )}

                {/* Note Circle */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col justify-center items-center shadow-lg transition-all duration-300 ${noteClass}`}
                  >
                    <span className="text-3xl md:text-4xl font-bold font-mono">{note}</span>
                  </div>
                  <span className="text-sm md:text-base text-gray-400">{interval}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChordDisplay;