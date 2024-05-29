import type { QueryFunction } from '@tanstack/react-query';
import { PokemonClient, type Pokemon } from 'pokenode-ts';

export interface ListResponse<T> {
  page: number;
  lastPage: number;
  items: T[];
}

const api = new PokemonClient();

export const getPokemonList: QueryFunction<
  ListResponse<Pokemon>,
  [key: string, { offset: number; limit: number }]
> = async ({ queryKey }) => {
  const [, { offset, limit }] = queryKey;
  const list = await api.listPokemons(offset, limit);
  const pokemonPromises = list.results.map(pokemon => api.getPokemonByName(pokemon.name));
  const page = Math.floor(offset / limit);
  const lastPage = Math.max(0, Math.ceil(list.count / limit) - 1);
  return { page, lastPage, items: await Promise.all(pokemonPromises) };
};
