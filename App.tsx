import React, { useState, useEffect } from 'react';
import { Note, ChordTypeName, ChordData, GuitarVoicing, ScaleTypeName, ScaleData, BassVoicing, ProgressionChord } from './types';
import { 
  getChordData, 
  getGuitarVoicing,
  getScaleData, 
  getBassVoicing,
  generateProgressions
} from './utils/musicTheory';
import { playChord, playProgression, playPianoNote } from './utils/audio';
import Controls from './components/Controls';
import ChordDisplay from './components/ChordDisplay';
import Piano from './components/Piano';
import Fretboard from './components/Fretboard';
import BassFretboard from './components/BassFretboard';
import ProgressionDisplay from './components/ProgressionDisplay';

const App: React.FC = () => {
  const [rootNote, setRootNote] = useState<Note>('C');
  const [chordType, setChordType] = useState<ChordTypeName>('Major');
  const [scaleType, setScaleType] = useState<ScaleTypeName>('Major (Ionian)');
  
  const [chordData, setChordData] = useState<ChordData | null>(null);
  const [scaleData, setScaleData] = useState<ScaleData | null>(null);
  const [guitarVoicing, setGuitarVoicing] = useState<GuitarVoicing | null>(null);
  const [bassVoicing, setBassVoicing] = useState<BassVoicing | null>(null);
  const [progressions, setProgressions] = useState<ProgressionChord[][]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const newChordData = getChordData(rootNote, chordType);
    const newScaleData = getScaleData(rootNote, scaleType);
    const guitarV = getGuitarVoicing(newChordData.name);
    const bassV = getBassVoicing(newChordData.name);
    
    setChordData(newChordData);
    setScaleData(newScaleData);
    setGuitarVoicing(guitarV);
    setBassVoicing(bassV);

    // When scale changes, clear old progressions
    setProgressions([]);
  }, [rootNote, chordType, scaleType]);
  
  const handleGenerateProgressions = () => {
    if (!scaleData) return;
    const generated = generateProgressions(scaleData);
    setProgressions(generated);
  };

  const handlePlayChord = () => {
    if (!chordData || isPlaying) return;
    setIsPlaying(true);
    playChord(chordData.notes).finally(() => setIsPlaying(false));
  };

  const handlePlayProgression = (prog: ProgressionChord[]) => {
    if (isPlaying || prog.length === 0) return;
    setIsPlaying(true);
    playProgression(prog).finally(() => setIsPlaying(false));
  };

  const Header: React.FC = () => (
    <header className="text-center p-4 md:p-6 border-b border-gray-700">
      <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-wider">
        Chord Theory Interface
      </h1>
      <p className="text-gray-400 mt-2">
        Visualize chords, analyze progressions, and explore scales on piano, guitar, and bass.
      </p>
    </header>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="mt-8 flex flex-col gap-8">
          <Controls 
            rootNote={rootNote} 
            setRootNote={setRootNote} 
            chordType={chordType} 
            setChordType={setChordType} 
            scaleType={scaleType}
            setScaleType={setScaleType}
            onGenerateProgressions={handleGenerateProgressions}
          />
          
          <ProgressionDisplay 
            progressions={progressions}
            onPlayProgression={handlePlayProgression}
            isPlaying={isPlaying}
          />

          {chordData && (
            <ChordDisplay 
              chordData={chordData}
              onPlay={handlePlayChord}
              isPlaying={isPlaying} 
            />
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {chordData && scaleData && (
              <div className="xl:col-span-2">
                <Piano 
                  chordNotes={chordData.notes}
                  scaleNotes={scaleData.notes}
                  rootNote={rootNote}
                  onNotePlay={playPianoNote}
                />
              </div>
            )}
            {scaleData && chordData && (
              <Fretboard 
                voicing={guitarVoicing} 
                chordName={chordData.name}
                scaleNotes={scaleData.notes}
                chordNotes={chordData.notes}
                rootNote={rootNote}
              />
            )}
            {scaleData && chordData && (
              <BassFretboard
                voicing={bassVoicing}
                chordName={chordData.name}
                scaleNotes={scaleData.notes}
                chordNotes={chordData.notes}
                rootNote={rootNote}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;