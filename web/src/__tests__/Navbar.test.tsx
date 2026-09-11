import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Navbar } from '../components/Navbar';

describe('Navbar', () => {
  it('expõe links de navegação com labels e âncoras corretos', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'AVALIAÇÃO' })).toHaveAttribute('href', '#avaliacao');
    expect(screen.getByRole('link', { name: 'METODOLOGIA' })).toHaveAttribute('href', '#recursos');
    expect(screen.getByRole('link', { name: 'SOBRE' })).toHaveAttribute('href', '#historia');
  });
});
