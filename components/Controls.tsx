import React from 'react';
import { Note, ChordTypeName, ScaleTypeName } from '../types';
import { NOTES, CHORD_TYPES, SCALE_TYPES } from '../utils/musicTheory';

interface ControlsProps {
  rootNote: Note;
  setRootNote: (note: Note) => void;
  chordType: ChordTypeName;
  setChordType: (type: ChordTypeName) => void;
  scaleType: ScaleTypeName;
  setScaleType: (type: ScaleTypeName) => void;
  onGenerateProgressions: () => void;
}

const ControlButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  const baseClasses = "px-3 py-2 text-sm md:text-base font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500";
  const activeClasses = "bg-cyan-500 text-white shadow-lg";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {label}
    </button>
  );
};

const Controls: React.FC<ControlsProps> = ({ rootNote, setRootNote, chordType, setChordType, scaleType, setScaleType, onGenerateProgressions }) => {
  return (
    <div className="space-y-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-gray-200 mb-3">Root Note</h3>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
            {NOTES.map(note => (
              <ControlButton 
                key={note}
                label={note}
                isActive={rootNote === note}
                onClick={() => setRootNote(note)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-200 mb-3">Scale / Mode</h3>
          <div className="flex flex-wrap gap-2">
            {SCALE_TYPES.map(type => (
              <ControlButton 
                key={type}
                label={type}
                isActive={scaleType === type}
                onClick={() => setScaleType(type)}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-200 mb-3">Chord Type (for detailed view)</h3>
        <div className="flex flex-wrap gap-2">
          {CHORD_TYPES.map(type => (
            <ControlButton 
              key={type}
              label={type}
              isActive={chordType === type}
              onClick={() => setChordType(type)}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-lg font-bold text-gray-200 mb-3">Progression Generation</h3>
        <button 
          onClick={onGenerateProgressions}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
        >
          Generate Common Progressions
        </button>
      </div>
    </div>
  );
};

export default Controls;
