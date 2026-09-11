import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHistory } from '../components/landing/SectionHistory';

describe('SectionHistory', () => {
  it('renderiza a origem das matrizes e a teoria de Spearman', () => {
    render(<SectionHistory />);

    expect(screen.getByText(/1936 — JOHN C\. RAVEN/i)).toBeInTheDocument();
    expect(screen.getByText(/Fator g/i)).toBeInTheDocument();
    expect(screen.getAllByText(/inteligência fluida/i)).toHaveLength(2);
  });
});
