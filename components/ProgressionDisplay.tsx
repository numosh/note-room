import React from 'react';
import { ProgressionChord } from '../types';

interface ProgressionDisplayProps {
  progressions: ProgressionChord[][];
  onPlayProgression: (prog: ProgressionChord[]) => void;
  isPlaying: boolean;
}

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.14v13.72L19.25 12 8 5.14z" />
  </svg>
);


const ProgressionDisplay: React.FC<ProgressionDisplayProps> = ({ progressions, onPlayProgression, isPlaying }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-200">Generated Progressions</h3>
      </div>
      <div className="space-y-6">
        {progressions.length === 0 ? (
          <div className="w-full flex justify-center items-center min-h-[110px] bg-gray-900/50 p-4 rounded-md">
            <p className="text-gray-400 text-center">
              Select a root note and scale, then click "Generate Common Progressions" to see results here.
            </p>
          </div>
        ) : (
          progressions.map((prog, progIndex) => {
            const progressionTitle = prog.map(p => p.romanNumeral).join(' – ');
            return (
              <div key={progIndex} className="bg-gray-900/50 p-4 rounded-md">
                <div className="flex items-center gap-4 mb-3">
                    <h4 className="text-lg font-semibold text-purple-300 font-mono">{progressionTitle}</h4>
                    <button
                        onClick={() => onPlayProgression(prog)}
                        disabled={isPlaying}
                        className="p-1.5 rounded-full bg-purple-600 text-white transition-all duration-200 enabled:hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
                        aria-label={`Play progression ${progressionTitle}`}
                    >
                        <PlayIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {prog.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2 bg-gray-700 rounded-lg w-24 h-24 border border-gray-600 shadow-md"
                    >
                      <span className="text-3xl font-bold text-cyan-400 font-mono">{item.romanNumeral}</span>
                      <span className="text-xs text-center text-gray-300 mt-1">{item.chord.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default ProgressionDisplay;