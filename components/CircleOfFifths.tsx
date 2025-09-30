import React from 'react';
import { Note, ScaleTypeName } from '../types';
import { getCircleOfFifthsData, NOTES } from '../utils/musicTheory';

interface CircleOfFifthsProps {
  rootNote: Note;
  setRootNote: (note: Note) => void;
  scaleType: ScaleTypeName;
}

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({ rootNote, setRootNote, scaleType }) => {
  const circleData = getCircleOfFifthsData();
  const radius = 130;
  const center = 150;
  const dotRadius = 24;

  const rootIndex = NOTES.indexOf(rootNote);
  const dominantIndex = (rootIndex + 7) % 12;
  const subdominantIndex = (rootIndex + 5) % 12;
  
  const dominantNote = NOTES[dominantIndex];
  const subdominantNote = NOTES[subdominantIndex];

  let relativeNote: Note;
  if (scaleType.includes('Major') || scaleType.includes('Ionian') || scaleType.includes('Lydian') || scaleType.includes('Mixolydian')) {
    // Major-like scale, find relative minor (down 3 semitones)
    relativeNote = NOTES[(rootIndex - 3 + 12) % 12];
  } else {
    // Minor-like scale, find relative major (up 3 semitones)
    relativeNote = NOTES[(rootIndex + 3) % 12];
  }


  const renderKey = (keyData: { major: Note, minor: Note, angle: number }, index: number) => {
    const angleRad = (keyData.angle - 90) * (Math.PI / 180); // Adjust by -90 to start C at the top
    const x = center + radius * Math.cos(angleRad);
    const y = center + radius * Math.sin(angleRad);

    const isRoot = keyData.major === rootNote || keyData.minor === rootNote;
    const isRelative = keyData.major === relativeNote || keyData.minor === relativeNote;
    const isDominant = keyData.major === dominantNote || keyData.minor === dominantNote;
    const isSubdominant = keyData.major === subdominantNote || keyData.minor === subdominantNote;

    let circleClass = "fill-gray-700 hover:fill-gray-600 transition-all duration-200 cursor-pointer";
    let majorTextClass = "fill-gray-300";
    let minorTextClass = "fill-cyan-400";

    if(isRoot) {
        circleClass = "fill-yellow-400";
        majorTextClass = "fill-black font-bold";
        minorTextClass = "fill-gray-800 font-bold";
    } else if (isRelative) {
        circleClass = "fill-cyan-500";
    } else if (isDominant) {
        circleClass = "fill-purple-600";
    } else if (isSubdominant) {
        circleClass = "fill-green-600";
    }

    return (
      <g key={index} transform={`translate(${x}, ${y})`} onClick={() => setRootNote(keyData.major)}>
        <circle r={dotRadius} className={circleClass} stroke="#111827" strokeWidth="2" />
        <text textAnchor="middle" dy="-3" className={`text-lg font-mono font-semibold ${majorTextClass}`}>{keyData.major}</text>
        <text textAnchor="middle" dy="15" className={`text-sm font-mono ${minorTextClass}`}>{keyData.minor}m</text>
      </g>
    );
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 h-full flex flex-col justify-center items-center">
       <h3 className="text-xl font-bold text-gray-200 mb-4 w-full text-center">Circle of Fifths</h3>
      <svg viewBox="0 0 300 300" className="w-full max-w-xs md:max-w-sm">
        <circle cx={center} cy={center} r={radius + dotRadius + 4} fill="none" stroke="#374151" strokeWidth="2" />
        <circle cx={center} cy={center} r={radius - dotRadius - 4} fill="#1F2937" />
        {circleData.map(renderKey)}
      </svg>
      <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>Root</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-cyan-500 mr-2"></div>Relative</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>Dominant (V)</div>
        <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>Subdominant (IV)</div>
      </div>
    </div>
  );
};

export default CircleOfFifths;
