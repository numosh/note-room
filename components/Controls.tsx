import React from 'react';
import { Note, ChordTypeName, ScaleTypeName, Inversion } from '../types';
import { NOTES, CHORD_TYPES, SCALE_TYPES } from '../utils/musicTheory';

interface ControlsProps {
  rootNote: Note;
  setRootNote: (note: Note) => void;
  chordType: ChordTypeName;
  setChordType: (type: ChordTypeName) => void;
  scaleType: ScaleTypeName;
  setScaleType: (type: ScaleTypeName) => void;
  inversion: Inversion;
  setInversion: (inversion: Inversion) => void;
  numChordNotes: number;
  onGenerateProgressions: () => void;
  identifyMode: boolean;
  onToggleIdentifyMode: () => void;
  isQuizActive: boolean;
  onStartQuiz: () => void;
}

const ControlButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, isActive, onClick, disabled = false }) => {
  const baseClasses = "px-3 py-2 text-sm md:text-base font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500";
  const activeClasses = "bg-cyan-500 text-white shadow-lg";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";
  const disabledClasses = "bg-gray-800 text-gray-500 cursor-not-allowed";
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : (isActive ? activeClasses : inactiveClasses)}`}
    >
      {label}
    </button>
  );
};

const ToggleSwitch: React.FC<{
  label: string;
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
}> = ({ label, enabled, onChange, disabled = false }) => {
  return (
    <div className={`flex items-center justify-between ${disabled ? 'opacity-50' : ''}`}>
      <span className="text-lg font-bold text-gray-200">{label}</span>
      <button
        onClick={onChange}
        disabled={disabled}
        className={`${
          enabled ? 'bg-green-500' : 'bg-gray-600'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:cursor-not-allowed`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </button>
    </div>
  );
};


const Controls: React.FC<ControlsProps> = ({ 
  rootNote, setRootNote, chordType, setChordType, scaleType, setScaleType, 
  inversion, setInversion, numChordNotes, onGenerateProgressions, 
  identifyMode, onToggleIdentifyMode, isQuizActive, onStartQuiz 
}) => {
  const inversionLabels: { [key: number]: string } = { 0: 'Root', 1: '1st', 2: '2nd', 3: '3rd' };
  const isControlsDisabled = identifyMode || isQuizActive;

  return (
    <div className="space-y-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700 h-full">
      <div className="grid grid-cols-1 gap-6">
         <div>
            <ToggleSwitch
              label="Chord Identifier"
              enabled={identifyMode}
              onChange={onToggleIdentifyMode}
              disabled={isQuizActive}
            />
            <p className="text-sm text-gray-400 mt-2">
              {identifyMode ? "Click notes on the piano to identify chords." : "Turn on to identify chords from notes."}
            </p>
         </div>
         <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-bold text-gray-200 mb-3">Ear Training</h3>
             <button 
              onClick={onStartQuiz}
              disabled={identifyMode || isQuizActive}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Quiz
            </button>
         </div>
      </div>
      
      <div className={`border-t border-gray-700 pt-6 ${isControlsDisabled ? 'opacity-40 pointer-events-none' : 'transition-opacity'}`}>
        <div className="space-y-6">
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
           <div>
              <h3 className="text-lg font-bold text-gray-200 mb-3">Chord Inversion</h3>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3].map(inv => (
                  <ControlButton
                    key={inv}
                    label={inversionLabels[inv]}
                    isActive={inversion === inv}
                    onClick={() => setInversion(inv as Inversion)}
                    disabled={inv >= numChordNotes || numChordNotes < 3}
                  />
                ))}
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
      </div>
    </div>
  );
};

export default Controls;