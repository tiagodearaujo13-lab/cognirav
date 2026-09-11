import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionFAQ } from '../components/landing/SectionFAQ';

describe('SectionFAQ', () => {
  it('expande e recolhe uma resposta do acordeão', () => {
    render(<SectionFAQ />);

    const question = screen.getByRole('button', { name: /validade diagnóstica médica/i });
    expect(question).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('faq-answer')).not.toBeInTheDocument();

    fireEvent.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('faq-answer')).toBeInTheDocument();

    fireEvent.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('faq-answer')).not.toBeInTheDocument();
  });
});
