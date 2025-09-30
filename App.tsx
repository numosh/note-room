import React, { useState, useEffect } from 'react';
import { Note, ChordTypeName, ChordData, GuitarVoicing, ScaleTypeName, ScaleData, BassVoicing, ProgressionChord, Inversion, QuizQuestion } from './types';
import { 
  getChordData, 
  getGuitarVoicing,
  getScaleData, 
  getBassVoicing,
  generateProgressions,
  identifyChord,
  generateQuizQuestion,
} from './utils/musicTheory';
import { playChord, playProgression, playPianoNote } from './utils/audio';
import Controls from './components/Controls';
import ChordDisplay from './components/ChordDisplay';
import ChordIdentifier from './components/ChordIdentifier';
import Piano from './components/Piano';
import Fretboard from './components/Fretboard';
import BassFretboard from './components/BassFretboard';
import ProgressionDisplay from './components/ProgressionDisplay';
import CircleOfFifths from './components/CircleOfFifths';
import EarTrainingQuiz from './components/EarTrainingQuiz';

const App: React.FC = () => {
  const [rootNote, setRootNote] = useState<Note>('C');
  const [chordType, setChordType] = useState<ChordTypeName>('Major');
  const [scaleType, setScaleType] = useState<ScaleTypeName>('Major (Ionian)');
  const [inversion, setInversion] = useState<Inversion>(0);
  
  const [chordData, setChordData] = useState<ChordData | null>(null);
  const [scaleData, setScaleData] = useState<ScaleData | null>(null);
  const [guitarVoicing, setGuitarVoicing] = useState<GuitarVoicing | null>(null);
  const [bassVoicing, setBassVoicing] = useState<BassVoicing | null>(null);
  const [progressions, setProgressions] = useState<ProgressionChord[][]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // State for identify mode
  const [identifyMode, setIdentifyMode] = useState<boolean>(false);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [identifiedChords, setIdentifiedChords] = useState<string[]>([]);

  // State for ear training quiz
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [quizFeedback, setQuizFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);


  useEffect(() => {
    if (isQuizActive) return; // Don't update main display during quiz
    
    const numNotes = getChordData(rootNote, chordType, 0).notes.length;
    if (inversion >= numNotes) {
      setInversion(0);
      return; 
    }

    const newChordData = getChordData(rootNote, chordType, inversion);
    const newScaleData = getScaleData(rootNote, scaleType);
    const rootChordName = `${rootNote} ${chordType}`;
    const guitarV = getGuitarVoicing(rootChordName);
    const bassV = getBassVoicing(rootChordName);
    
    setChordData(newChordData);
    setScaleData(newScaleData);
    setGuitarVoicing(guitarV);
    setBassVoicing(bassV);

    setProgressions([]);
  }, [rootNote, chordType, scaleType, inversion, isQuizActive]);

  useEffect(() => {
    if (identifyMode) {
      const found = identifyChord(selectedNotes);
      setIdentifiedChords(found);
    }
  }, [selectedNotes, identifyMode]);
  
  const handleToggleIdentifyMode = () => {
    setIdentifyMode(prev => !prev);
    setSelectedNotes([]);
    setIdentifiedChords([]);
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNotes(prev => {
      const newNotes = prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note];
      return newNotes.sort();
    });
  };

  const handleClearSelectedNotes = () => setSelectedNotes([]);
  const handleGenerateProgressions = () => scaleData && setProgressions(generateProgressions(scaleData));
  const handlePlayChord = (notes: Note[]) => {
    if (isPlaying) return;
    setIsPlaying(true);
    playChord(notes).finally(() => setIsPlaying(false));
  };
  const handlePlayProgression = (prog: ProgressionChord[]) => {
    if (isPlaying || prog.length === 0) return;
    setIsPlaying(true);
    playProgression(prog).finally(() => setIsPlaying(false));
  };

  // --- Ear Training Quiz Handlers ---
  const generateNewQuizQuestion = () => {
    setQuizFeedback(null);
    setHasAnswered(false);
    setQuizQuestion(generateQuizQuestion());
  };

  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setQuizScore({ correct: 0, total: 0 });
    generateNewQuizQuestion();
  };

  const handleEndQuiz = () => {
    setIsQuizActive(false);
    setQuizQuestion(null);
  };

  const handleQuizAnswer = (answer: ChordTypeName) => {
    if (!quizQuestion) return;
    const isCorrect = answer === quizQuestion.correctAnswer.type;
    setQuizScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }));
    setQuizFeedback({
      message: isCorrect ? 'Correct!' : `Incorrect. The answer was ${quizQuestion.correctAnswer.type}.`,
      correct: isCorrect,
    });
    setHasAnswered(true);
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

  const isContentDisabled = isQuizActive || identifyMode;

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="mt-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={isQuizActive ? 'opacity-40 pointer-events-none' : ''}>
              <CircleOfFifths rootNote={rootNote} setRootNote={setRootNote} scaleType={scaleType} />
            </div>
            <Controls 
              rootNote={rootNote} 
              setRootNote={setRootNote} 
              chordType={chordType} 
              setChordType={setChordType} 
              scaleType={scaleType}
              setScaleType={setScaleType}
              inversion={inversion}
              setInversion={setInversion}
              numChordNotes={chordData?.notes.length || 0}
              onGenerateProgressions={handleGenerateProgressions}
              identifyMode={identifyMode}
              onToggleIdentifyMode={handleToggleIdentifyMode}
              isQuizActive={isQuizActive}
              onStartQuiz={handleStartQuiz}
            />
          </div>
          
          {isQuizActive && quizQuestion && (
            <EarTrainingQuiz
              question={quizQuestion}
              score={quizScore}
              feedback={quizFeedback}
              hasAnswered={hasAnswered}
              isPlaying={isPlaying}
              onPlaySound={() => handlePlayChord(quizQuestion.correctAnswer.notes)}
              onAnswer={handleQuizAnswer}
              onNextQuestion={generateNewQuizQuestion}
              onEndQuiz={handleEndQuiz}
            />
          )}

          <div className={isQuizActive ? 'hidden' : 'flex flex-col gap-8'}>
            <ProgressionDisplay 
              progressions={progressions}
              onPlayProgression={handlePlayProgression}
              isPlaying={isPlaying}
            />

            {identifyMode ? (
              <ChordIdentifier
                selectedNotes={selectedNotes}
                identifiedChords={identifiedChords}
                onClear={handleClearSelectedNotes}
              />
            ) : chordData && (
              <ChordDisplay 
                chordData={chordData}
                onPlay={() => handlePlayChord(chordData.notes)}
                isPlaying={isPlaying} 
              />
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {chordData && scaleData && (
                <div className="xl:col-span-2">
                  <Piano 
                    chordNotes={chordData.notes}
                    scaleNotes={scaleData.notes}
                    rootNote={chordData.root}
                    bassNote={chordData.bassNote}
                    onNotePlay={playPianoNote}
                    identifyMode={identifyMode}
                    selectedNotes={selectedNotes}
                    onNoteSelect={handleNoteSelect}
                  />
                </div>
              )}
              {scaleData && chordData && (
                <Fretboard 
                  voicing={guitarVoicing} 
                  chordName={`${chordData.root} ${chordType}`}
                  scaleNotes={scaleData.notes}
                  chordNotes={chordData.notes}
                  rootNote={chordData.root}
                  bassNote={chordData.bassNote}
                />
              )}
              {scaleData && chordData && (
                <BassFretboard
                  voicing={bassVoicing}
                  chordName={`${chordData.root} ${chordType}`}
                  scaleNotes={scaleData.notes}
                  chordNotes={chordData.notes}
                  rootNote={chordData.root}
                  bassNote={chordData.bassNote}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;