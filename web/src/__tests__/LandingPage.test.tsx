import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LandingPage } from '../pages/LandingPage';

const { startQuiz } = vi.hoisted(() => ({
  startQuiz: vi.fn(),
}));

vi.mock('../hooks/useQuiz', () => ({
  useQuiz: () => ({
    startQuiz,
    status: 'idle',
  }),
}));

describe('LandingPage CTA', () => {
  it('dispara o início do teste psicométrico', () => {
    render(<LandingPage />);

    fireEvent.click(screen.getByRole('button', { name: /iniciar teste psicométrico/i }));

    expect(startQuiz).toHaveBeenCalledTimes(1);
  });
});
