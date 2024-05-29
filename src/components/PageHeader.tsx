import { pokemonTypeNames } from '../data/pokemon-types';
import { displayRoster } from '../store/drawer';
import { useDispatch, useSelector } from '../store/hooks';
import { selectTableTypeFilter, setTypeFilter } from '../store/pokemon-table';
import { ROSTER_LIMIT, selectRosterCount } from '../store/roster';
import { kebabCaseToTitleCase as formatName } from '../util/case-conversion';

import css from './PageHeader.module.css';

export const PageHeader = () => {
  const dispatch = useDispatch();
  const pokemonTypeFilter = useSelector(selectTableTypeFilter);
  const rosterCount = useSelector(selectRosterCount);

  return (
    <div className={css.pageHeader}>
      <div>
        <button onClick={() => dispatch(displayRoster())}>
          View your Pokemon party ({rosterCount}/{ROSTER_LIMIT})
        </button>
      </div>
      {rosterCount === 0 && <p className={css.instructions}>Select a Pokemon to add it to your party</p>}
      <div className={css.filter}>
        <span className={css.filterLabel}>Filter by Pokemon type:</span>
        <select value={pokemonTypeFilter} onChange={e => dispatch(setTypeFilter(e.target.value))}>
          <option value="">Show All</option>
          {pokemonTypeNames.map(type => (
            <option key={type} value={type}>
              {formatName(type)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
