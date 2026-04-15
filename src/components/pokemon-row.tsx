// PokemonRow.tsx
import type { PokemonDetails } from "../interfaces";

interface PokemonRowProps {
  pokemon: PokemonDetails;
}

const PokemonRow = ({ pokemon }: PokemonRowProps) => {
  const { name, sprites, types } = pokemon;

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      <td className="px-6 py-2">
        <img src={sprites.front_default} alt={name} className="w-12 h-12" />
      </td>
      <td className="px-6 py-4 font-bold capitalize">{name}</td>
      <td className="px-6 py-4 capitalize">
        {types.map((t) => t.type.name).join(', ')}
      </td>
    </tr>
  );
};

export default PokemonRow;