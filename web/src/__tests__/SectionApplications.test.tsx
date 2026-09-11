import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionApplications } from '../components/landing/SectionApplications';

describe('SectionApplications', () => {
  it('renderiza os quatro contextos de aplicação', () => {
    render(<SectionApplications />);

    expect(screen.getAllByTestId('application-card')).toHaveLength(4);
    expect(screen.getByText('Sociedades de Alto QI')).toBeInTheDocument();
    expect(screen.getByText('Recrutamento Executivo & Tech')).toBeInTheDocument();
    expect(screen.getByText('Aviação Militar & Forças Especiais')).toBeInTheDocument();
    expect(screen.getByText('Clínica Neuropsicológica')).toBeInTheDocument();
  });
});
