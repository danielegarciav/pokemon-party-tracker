import { type FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import { FadingImg } from '../components/FadingImg';
import { PokemonTypeDisplay } from '../components/PokemonTypeDisplay';

import { getPokemonList } from '../queries/pokemon';
import { displayPokemonDetails } from '../store/drawer';
import { useDispatch, useSelector } from '../store/hooks';
import { selectTablePage, selectTableTypeFilter, setPage } from '../store/pokemon-table';
import { kebabCaseToTitleCase as formatName } from '../util/case-conversion';

import css from './PokemonTable.module.css';

export const PokemonTable: FC = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectTablePage);
  const pokemonTypeFilter = useSelector(selectTableTypeFilter);

  const query = useQuery({
    queryFn: getPokemonList,
    queryKey: ['pokemon-list', { limit: 20, offset: page * 20, type: pokemonTypeFilter || undefined }],
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
  const displayedTypeFilter = query.data.type || '';
  return (
    <>
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
            <tr key={pokemon.id} tabIndex={0} onClick={() => dispatch(displayPokemonDetails(pokemon))}>
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
                <PokemonTypeDisplay types={pokemon.types} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.pokemonTableFooter}>
        <button
          onClick={() => dispatch(setPage(page => Math.max(0, page - 1)))}
          disabled={page === 0 || displayedTypeFilter !== pokemonTypeFilter}
        >
          Prev
        </button>
        <span>
          Page {page + 1} of {lastPage + 1}
        </span>
        <button
          onClick={() => dispatch(setPage(page => Math.min(lastPage, page + 1)))}
          disabled={page >= lastPage || displayedTypeFilter !== pokemonTypeFilter}
        >
          Next
        </button>
      </div>
    </>
  );
};
