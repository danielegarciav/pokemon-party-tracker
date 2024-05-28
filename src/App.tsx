import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import css from './App.module.css';
import { getPokemonList } from './queries/pokemon';

const titlecase = (str: string) => str[0].toUpperCase() + str.slice(1);

export default function App() {
  const [page, setPage] = useState(0);
  const query = useQuery({
    queryKey: ['pokemon-list', { limit: 20, offset: page * 20 }],
    queryFn: getPokemonList,
    placeholderData: keepPreviousData,
  });
  if (query.isLoading) return <p>Loading...</p>;
  if (query.isError) return <p>Error: {query.error.message}</p>;
  if (!query.data) return <p>No data</p>;
  return (
    <div>
      <table className={css.pokemonTable}>
        <thead>
          <tr>
            <th className={css.idColumn}>ID</th>
            <th className={css.spriteColumn}>Sprite</th>
            <th>Name</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {query.data.map(pokemon => (
            <tr key={pokemon.id}>
              <td className={css.idColumn}>{pokemon.id}</td>
              <td className={css.spriteColumn}>
                <div className={css.spriteFlexContainer}>
                  {pokemon.sprites.front_default ? (
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  ) : (
                    'No sprite'
                  )}
                </div>
              </td>
              <td>{titlecase(pokemon.name)}</td>
              <td className={css.typesColumn}>
                <div className={css.typesFlexContainer}>
                  {pokemon.types.map(type => (
                    <span key={type.slot} className={css.typeBubble}>
                      {titlecase(type.type.name)}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.pokemonTableFooter}>
        <button onClick={() => setPage(page => Math.max(0, page - 1))}>Prev</button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(page => page + 1)}>Next</button>
      </div>
    </div>
  );
}
