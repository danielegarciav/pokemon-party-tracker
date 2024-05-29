import { DrawerRoot } from './components/Drawer';
import { PokemonTable } from './components/PokemonTable';
import { pokemonTypeNames } from './data/pokemon-types';
import { useDispatch, useSelector } from './store/hooks';
import { selectTableTypeFilter, setTypeFilter } from './store/pokemon-table';
import { kebabCaseToTitleCase as formatName } from './util/case-conversion';

export default function App() {
  const dispatch = useDispatch();
  const pokemonTypeFilter = useSelector(selectTableTypeFilter);

  return (
    <DrawerRoot>
      <div>
        <p>
          Filter by pokemon type:
          <select value={pokemonTypeFilter} onChange={e => dispatch(setTypeFilter(e.target.value))}>
            <option value="">Show All</option>
            {pokemonTypeNames.map(type => (
              <option key={type} value={type}>
                {formatName(type)}
              </option>
            ))}
          </select>
        </p>
        <PokemonTable />
      </div>
    </DrawerRoot>
  );
}
