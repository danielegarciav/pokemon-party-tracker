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

  // If a type is provided, we fetch the names of all pokemons of that type in a single request.
  // We then request details for a paginated subset of those pokemons. Pagination is done on our side.
  if (type) {
    const typeData = await api.getTypeByName(type);
    const slicedPokemonList = typeData.pokemon.slice(offset, offset + limit);
    const pokemonDataPromises = slicedPokemonList.map(pokemon => api.getPokemonByName(pokemon.pokemon.name));

    const items = await Promise.all(pokemonDataPromises);
    const page = Math.floor(offset / limit);
    const lastPage = Math.max(0, Math.ceil(typeData.pokemon.length / limit) - 1);
    return { page, lastPage, type, items };
  }

  const pokemonList = await api.listPokemons(offset, limit);
  const pokemonDataPromises = pokemonList.results.map(pokemon => api.getPokemonByName(pokemon.name));

  const items = await Promise.all(pokemonDataPromises);
  const page = Math.floor(offset / limit);
  const lastPage = Math.max(0, Math.ceil(pokemonList.count / limit) - 1);
  return { page, lastPage, type, items };
};
