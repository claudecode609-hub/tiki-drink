import { useState, useCallback, useMemo } from 'react';
import { questions } from './data/questions';
import { drinks } from './data/drinks';
import { getResults } from './scoring/matcher';
import { useAudio } from './hooks/useAudio';
import LandingPage from './components/LandingPage';
import QuizContainer from './components/Quiz/QuizContainer';
import ResultsPage from './components/Results/ResultsPage';
import AudioPlayer from './components/AudioPlayer';

const QUIZ_LENGTH = 15;

// Pick QUIZ_LENGTH questions, ensuring every category is represented
function pickQuestions(allQuestions, count) {
  // Group by category
  const byCategory = {};
  allQuestions.forEach(q => {
    (byCategory[q.category] ||= []).push(q);
  });

  // Shuffle helper
  const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const picked = new Set();

  // First pass: pick 1 random from each category so all axes are covered
  Object.values(byCategory).forEach(catQuestions => {
    const shuffled = shuffle(catQuestions);
    picked.add(shuffled[0].id);
  });

  // Second pass: fill remaining slots from shuffled pool
  const remaining = shuffle(allQuestions.filter(q => !picked.has(q.id)));
  for (const q of remaining) {
    if (picked.size >= count) break;
    picked.add(q.id);
  }

  // Return in shuffled order
  return shuffle(allQuestions.filter(q => picked.has(q.id)));
}

function App() {
  const [phase, setPhase] = useState('landing');
  const [results, setResults] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const audio = useAudio();

  const handleStart = useCallback(() => {
    audio.play();
    setQuizQuestions(pickQuestions(questions, QUIZ_LENGTH));
    setPhase('quiz');
  }, [audio]);

  const handleQuizComplete = useCallback((answers) => {
    const quizResults = getResults(answers, questions, drinks, QUIZ_LENGTH);
    setResults(quizResults);
    setPhase('results');
  }, []);

  const handleRetake = useCallback(() => {
    setResults(null);
    setQuizQuestions(pickQuestions(questions, QUIZ_LENGTH));
    setPhase('quiz');
  }, []);

  return (
    <div className="app">
      <div className="app-content">
        {phase === 'landing' && (
          <LandingPage onStart={handleStart} />
        )}
        {phase === 'quiz' && (
          <QuizContainer
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
        )}
        {phase === 'results' && results && (
          <ResultsPage
            results={results}
            onRetake={handleRetake}
          />
        )}
      </div>
      <AudioPlayer isPlaying={audio.isPlaying} onToggle={audio.toggle} />
    </div>
  );
}

export default App;
