import type { QueryFunction } from '@tanstack/react-query';
import { PokemonClient, type Pokemon } from 'pokenode-ts';

const api = new PokemonClient();

export const getPokemonList: QueryFunction<
  Pokemon[],
  [key: string, { offset: number; limit: number }]
> = async ({ queryKey }) => {
  const [, { offset, limit }] = queryKey;
  const list = await api.listPokemons(offset, limit);
  const pokemonPromises = list.results.map(pokemon => api.getPokemonByName(pokemon.name));
  return Promise.all(pokemonPromises);
};
