import React from 'react';
import { ChordTypeName, QuizQuestion } from '../types';

interface EarTrainingQuizProps {
  question: QuizQuestion;
  score: { correct: number; total: number };
  feedback: { message: string; correct: boolean } | null;
  hasAnswered: boolean;
  isPlaying: boolean;
  onPlaySound: () => void;
  onAnswer: (answer: ChordTypeName) => void;
  onNextQuestion: () => void;
  onEndQuiz: () => void;
}

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.14v13.72L19.25 12 8 5.14z" />
  </svg>
);

const EarTrainingQuiz: React.FC<EarTrainingQuizProps> = ({
  question, score, feedback, hasAnswered, isPlaying,
  onPlaySound, onAnswer, onNextQuestion, onEndQuiz
}) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-400 tracking-wide">Ear Training Quiz</h2>
        <div className="text-lg font-semibold text-gray-300">
          Score: <span className="font-bold text-white">{score.correct} / {score.total}</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-300 mb-4">Listen to the chord and identify its type.</p>
        <button
          onClick={onPlaySound}
          disabled={isPlaying}
          className="mb-6 px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg transition-all duration-200 enabled:hover:bg-cyan-400 disabled:bg-gray-600 flex items-center gap-2 mx-auto"
        >
          <PlayIcon className="w-5 h-5" />
          Play Chord
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {question.options.map(option => {
            let buttonClass = 'bg-gray-700 hover:bg-gray-600';
            if (hasAnswered) {
              if (option === question.correctAnswer.type) {
                buttonClass = 'bg-green-600'; // Correct answer
              } else if (feedback && !feedback.correct) {
                // Find the user's incorrect answer to highlight it red
                // This assumes we'll enhance feedback to know the user's choice
                // For now, only the correct one is highlighted green.
                buttonClass = 'bg-gray-700 opacity-60';
              } else {
                 buttonClass = 'bg-gray-700 opacity-60';
              }
            }

            return (
              <button
                key={option}
                onClick={() => onAnswer(option)}
                disabled={hasAnswered}
                className={`w-full p-4 font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className={`my-4 text-lg font-bold ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
            {feedback.message}
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-6">
           {hasAnswered && (
             <button
              onClick={onNextQuestion}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all"
            >
              Next Question
            </button>
           )}
            <button
              onClick={onEndQuiz}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-all"
            >
              End Quiz
            </button>
        </div>
      </div>
    </div>
  );
};

export default EarTrainingQuiz;