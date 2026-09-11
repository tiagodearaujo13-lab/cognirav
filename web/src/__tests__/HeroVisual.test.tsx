import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroVisual } from '../components/HeroVisual';

describe('HeroVisual', () => {
  it('renderiza as oito letras de COGNIRAV', () => {
    render(<HeroVisual />);

    expect(screen.getAllByTestId('hero-letter-main').map((letter) => letter.textContent?.[0]).join('')).toBe('COGNIRAV');
    expect(screen.getByText('COGNIRAV', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('mantém as camadas técnicas ocultas para leitores de tela', () => {
    render(<HeroVisual />);

    expect(screen.getAllByTestId('hero-letter-main')).toHaveLength(8);
    expect(screen.getAllByTestId('hero-letter-main').every((letter) => letter.getAttribute('aria-hidden') === 'true')).toBe(true);
    expect(document.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });
});
