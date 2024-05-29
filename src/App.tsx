import { useQuery } from '@tanstack/react-query';
import { useState, type CSSProperties as CSSProps } from 'react';
import css from './App.module.css';
import { FadingImg } from './components/FadingImg';
import { getTypeBgColor } from './data/pokemon-types';
import { getPokemonList } from './queries/pokemon';
import { kebabCaseToTitleCase as formatName } from './util/case-conversion';

export default function App() {
  const [page, setPage] = useState(0);
  const query = useQuery({
    queryFn: getPokemonList,
    queryKey: ['pokemon-list', { limit: 20, offset: page * 20 }],
  });

  if (query.isPending) return <p>Loading...</p>;
  if (query.isError)
    return (
      <div className={css.messageBox}>
        <h3>Error!</h3>
        <p>{query.error.message}</p>
        <button onClick={() => query.refetch()}>Retry</button>
      </div>
    );

  const lastPage = query.data.lastPage;
  return (
    <div>
      <table className={css.pokemonTable} style={{ opacity: query.isPlaceholderData ? 0.5 : 1 }}>
        <thead>
          <tr>
            <th className={css.idColumn}>ID</th>
            <th className={css.spriteColumn}>Sprite</th>
            <th>Name</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {query.data.items.map(pokemon => (
            <tr key={pokemon.id} tabIndex={0}>
              <td className={css.idColumn}>{pokemon.id}</td>
              <td className={css.spriteColumn}>
                <div className={css.spriteFlexContainer}>
                  {pokemon.sprites.front_default ? (
                    <FadingImg src={pokemon.sprites.front_default} alt={pokemon.name} />
                  ) : (
                    <span style={{ width: '56px', textAlign: 'center' }}>?</span>
                  )}
                </div>
              </td>
              <td>{formatName(pokemon.name)}</td>
              <td className={css.typesColumn}>
                <div className={css.typesFlexContainer}>
                  {pokemon.types.map(type => (
                    <span
                      key={type.slot}
                      className={css.typeBubble}
                      style={{ '--bg-color': getTypeBgColor(type.type.name) } as CSSProps}
                    >
                      {formatName(type.type.name)}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.pokemonTableFooter}>
        <button onClick={() => setPage(page => Math.max(0, page - 1))} disabled={page === 0}>
          Prev
        </button>
        <span>
          Page {page + 1} of {lastPage + 1}
        </span>
        <button onClick={() => setPage(page => Math.min(lastPage, page + 1))} disabled={page >= lastPage}>
          Next
        </button>
      </div>
    </div>
  );
}
