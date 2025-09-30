import React from 'react';
import { Note } from '../types';

interface ChordIdentifierProps {
  selectedNotes: Note[];
  identifiedChords: string[];
  onClear: () => void;
}

const ChordIdentifier: React.FC<ChordIdentifierProps> = ({ selectedNotes, identifiedChords, onClear }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-cyan-400 tracking-wide">
          Chord Identifier
        </h2>
        <button
          onClick={onClear}
          disabled={selectedNotes.length === 0}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Clear Selection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected Notes Section */}
        <div className="bg-gray-900/50 p-4 rounded-md">
          <h3 className="font-semibold text-lg text-gray-300 mb-3">Selected Notes ({selectedNotes.length})</h3>
          {selectedNotes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {[...selectedNotes].sort().map(note => (
                <div key={note} className="bg-green-500 text-white font-bold font-mono text-lg py-2 px-4 rounded-md shadow-md">
                  {note}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Click notes on the piano keyboard above to begin.</p>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-gray-900/50 p-4 rounded-md">
          <h3 className="font-semibold text-lg text-gray-300 mb-3">Possible Chords</h3>
          {selectedNotes.length > 0 ? (
            identifiedChords.length > 0 ? (
              <ul className="space-y-2">
                {identifiedChords.map(chordName => (
                  <li key={chordName} className="bg-gray-700 text-cyan-300 font-semibold p-2 rounded-md">
                    {chordName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No matching chords found for this combination of notes.</p>
            )
          ) : (
            <p className="text-gray-400">Results will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChordIdentifier;
