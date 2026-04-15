import React, { useState, useEffect, useMemo } from 'react';
import PokemonRow from './components/pokemon-row';
import type { PokemonDetails, PokemonResource } from './interfaces.ts'

const allPokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

// --- Main App ---
const PokemonApp: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(allPokemonUrl);
        const data = await response.json();
        
        const detailPromises = data.results.map((p: PokemonResource) => 
          fetch(p.url).then((res) => res.json())
        );
        const details = await Promise.all(detailPromises);
        setPokemonList(details);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, []);

  const filteredAndSortedPokemon = useMemo(() => {
    let result = [...pokemonList];
    if (searchTerm) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedType) {
      result = result.filter((p) => p.types.some((t) => t.type.name === selectedType));
    }
    if (sortConfig) {
      result.sort((a, b) => {
        if (a.name < b.name) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a.name > b.name) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [pokemonList, searchTerm, selectedType, sortConfig]);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    pokemonList.forEach((p) => p.types.forEach((t) => types.add(t.type.name)));
    return Array.from(types).sort();
  }, [pokemonList]);

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Pokedex</h1>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-grow border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sm:w-64 border border-gray-300 p-3 rounded-lg shadow-sm bg-white capitalize outline-none"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sprite</th>
              <th 
                className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 select-none"
                onClick={() => setSortConfig({ direction: sortConfig?.direction === 'asc' ? 'desc' : 'asc' })}
              >
                Name {sortConfig?.direction === 'asc' ? '▲' : sortConfig?.direction === 'desc' ? '▼' : ''}
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Types</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedPokemon.map((pokemon) => (
              <PokemonRow key={pokemon.name} pokemon={pokemon} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonApp;