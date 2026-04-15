// PokemonRow.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import PokemonRow from './pokemon-row.tsx';
import type { PokemonDetails } from '../interfaces.ts';

const mockPokemon: PokemonDetails = {
  name: 'bulbasaur',
  sprites: { front_default: 'https://img.url/1.png' },
  types: [
    { type: { name: 'grass' } },
    { type: { name: 'poison' } }
  ]
};

describe('PokemonRow', () => {
  it('renders pokemon name and comma-separated types', () => {
    render(
      <table>
        <tbody>
          <PokemonRow pokemon={mockPokemon} />
        </tbody>
      </table>
      
    );

    // Check name
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    
    // Check comma-separated types
    expect(screen.getByText(/grass, poison/i)).toBeInTheDocument();
    
    // Check image
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPokemon.sprites.front_default);
  });
});