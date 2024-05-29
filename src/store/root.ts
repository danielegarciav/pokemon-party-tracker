import { configureStore } from '@reduxjs/toolkit';
import { drawerReducer } from './drawer';
import { rosterReducer } from './roster';
import { pokemonTableReducer } from './pokemon-table';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    roster: rosterReducer,
    pokemonTable: pokemonTableReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
