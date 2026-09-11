import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QuizPage } from '../pages/QuizPage';

const selectAnswer = vi.fn();
const question = {
  id: 1,
  category: 'numeric' as const,
  statement: 'Qual é o próximo padrão?',
  options: [
    { id: 'a', text: 'Sinal Alfa' },
    { id: 'b', text: 'Sinal Beta' },
    { id: 'c', text: 'Sinal Gama' },
    { id: 'd', text: 'Sinal Delta' },
  ],
};

vi.mock('../hooks/useQuiz', () => ({
  useQuiz: () => ({
    questions: [question],
    currentIndex: 0,
    answers: {},
    timeLeft: 1800,
    status: 'in_progress',
    error: null,
    selectAnswer,
    nextQuestion: vi.fn(),
    prevQuestion: vi.fn(),
    submitQuiz: vi.fn(),
  }),
}));

describe('QuizPage console', () => {
  it('seleciona uma alternativa por clique e pela tecla numérica 1', () => {
    render(<QuizPage />);

    fireEvent.click(screen.getByTestId('answer-option-2'));
    expect(selectAnswer).toHaveBeenCalledWith(1, 'b');

    fireEvent.keyDown(window, { key: '1' });
    expect(selectAnswer).toHaveBeenCalledWith(1, 'a');
  });
});
