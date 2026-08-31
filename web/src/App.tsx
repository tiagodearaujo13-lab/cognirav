import React from 'react';
import { QuizProvider } from './contexts/QuizContext';
import { useQuiz } from './hooks/useQuiz';
import { LandingPage } from './pages/LandingPage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';

// Router interno baseado no estado — sem dependências externas
const AppRouter: React.FC = () => {
  const { status } = useQuiz();

  if (status === 'idle') return <LandingPage />;
  if (status === 'completed' || status === 'already_taken') return <ResultPage />;
  // in_progress | submitting
  return <QuizPage />;
};

const App: React.FC = () => {
  return (
    <QuizProvider>
      <AppRouter />
    </QuizProvider>
  );
};

export default App;
