import type { Pokemon } from 'pokenode-ts';
import { type FC, type ReactNode } from 'react';
import { Drawer } from 'vaul';
import { closeDrawer, displayRoster, selectCurrentPokemon, selectIsDrawerOpen } from '../store/drawer';
import { useDispatch, useSelector } from '../store/hooks';
import { addPokemon, removePokemon, selectRoster, selectRosterIsFull } from '../store/roster';
import { kebabCaseToTitleCase as formatName } from '../util/case-conversion';
import css from './Drawer.module.css';
import { FadingImg } from './FadingImg';
import { PokemonTypeDisplay } from './PokemonTypeDisplay';

const RosterView = () => {
  const currentRoster = useSelector(selectRoster);

  return <div>{currentRoster.map(p => formatName(p.name)).join(', ')}</div>;
};

const PokemonView = ({ pokemon }: { pokemon: Pokemon }) => {
  const dispatch = useDispatch();
  const isPokemonInRoster = useSelector(state => selectRoster(state).some(p => p.name === pokemon.name));
  const isRosterFull = useSelector(selectRosterIsFull);
  const image = pokemon.sprites.front_default;
  return (
    <div className={css.pokemonView}>
      {image ? <FadingImg src={image} alt={pokemon.name} /> : <div className={css.noImage}>No image</div>}
      <div className={css.pokemonDetails}>
        <p className={css.pokemonName}>{formatName(pokemon.name)}</p>
        <PokemonTypeDisplay types={pokemon.types} />
        <div className={css.pokemonViewButtons}>
          {isPokemonInRoster ? (
            <button onClick={() => dispatch(removePokemon(pokemon.name))}>Remove from party</button>
          ) : isRosterFull ? (
            <button disabled>Party is full</button>
          ) : (
            <button onClick={() => dispatch(addPokemon(pokemon))}>Add to party!</button>
          )}
          <button onClick={() => dispatch(displayRoster())}>View current party</button>
          <button className={css.closeButton} onClick={() => dispatch(closeDrawer())}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const DrawerRoot: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const currentPokemon = useSelector(selectCurrentPokemon);

  return (
    <Drawer.Root
      open={isDrawerOpen}
      onClose={() => dispatch(closeDrawer())}
      shouldScaleBackground={true}
      setBackgroundColorOnScale={false}
    >
      {children}
      <Drawer.Portal>
        <Drawer.Overlay className={css.overlay} onClick={() => dispatch(closeDrawer())} />
        <Drawer.Content className={css.drawerContent}>
          <div className={css.drawerHandle} />
          {currentPokemon ? <PokemonView pokemon={currentPokemon} /> : <RosterView />}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
