import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PokemonApp from './App.tsx';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('PokemonApp', () => {
  beforeEach(() => {
    // 1. Define the mock function
    const fetchMock = vi.fn((url: string) => {
      // Mock the initial list call
      if (url.includes('limit=151')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
          }),
        });
      }
      
      // Mock the individual pokemon detail call
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          name: 'bulbasaur',
          sprites: { front_default: 'https://img.url/1.png' },
          types: [{ type: { name: 'grass' } }]
        }),
      });
    });

    // 2. Use stubGlobal to safely replace fetch
    vi.stubGlobal('fetch', fetchMock);
  });

  it('loads and displays the pokemon name after fetching', async () => {
    render(<PokemonApp />);

    // Check for loading state first
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the data to populate the table
    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });

    // Verify the comma-separated types from our mock
    const typeElements = screen.getAllByText(/grass/i);
    expect(typeElements.length).toBeGreaterThan(0);
    expect(typeElements[0]).toBeInTheDocument();
  });
});