import type { QueryFunction } from '@tanstack/react-query';
import { PokemonClient, type Pokemon } from 'pokenode-ts';

export interface ListResponse<T> {
  page: number;
  lastPage: number;
  type?: string;
  items: T[];
}

// All network requests made by pokenode-ts are cached, we can safely call its methods multiple times.
const api = new PokemonClient();

export const getPokemonList: QueryFunction<
  ListResponse<Pokemon>,
  [key: string, { offset: number; limit: number; type?: string }]
> = async ({ queryKey }) => {
  const [, { offset, limit, type }] = queryKey;
  if (type) {
    const typeData = await api.getTypeByName(type);
    const pokemonPromises = typeData.pokemon.map(pokemon => api.getPokemonByName(pokemon.pokemon.name));
    const allPokemon = await Promise.all(pokemonPromises);

    const items = allPokemon.slice(offset, offset + limit);
    const page = Math.floor(offset / limit);
    const lastPage = Math.max(0, Math.ceil(allPokemon.length / limit) - 1);
    return { page, lastPage, type, items };
  }
  const list = await api.listPokemons(offset, limit);
  const pokemonPromises = list.results.map(pokemon => api.getPokemonByName(pokemon.name));

  const items = await Promise.all(pokemonPromises);
  const page = Math.floor(offset / limit);
  const lastPage = Math.max(0, Math.ceil(list.count / limit) - 1);
  return { page, lastPage, type, items };
};
