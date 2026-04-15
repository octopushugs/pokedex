export interface PokemonType {
  type: { name: string };
}

export interface PokemonDetails {
  name: string;
  sprites: { front_default: string };
  types: PokemonType[];
}

export interface PokemonResource {
  name: string;
  url: string;
}