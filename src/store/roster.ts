import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './root';
import type { Pokemon } from 'pokenode-ts';

export const ROSTER_LIMIT = 6;

interface RosterState {
  pokemons: Pokemon[];
}

const initialState: RosterState = {
  pokemons: [],
};

const rosterSlice = createSlice({
  name: 'roster',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemons.push(action.payload);
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      state.pokemons = state.pokemons.filter(pokemon => pokemon.name !== action.payload);
    },
  },
});

export const { addPokemon, removePokemon } = rosterSlice.actions;
export const selectRoster = (state: RootState) => state.roster.pokemons;
export const selectRosterIsFull = (state: RootState) => state.roster.pokemons.length >= ROSTER_LIMIT;
export const rosterReducer = rosterSlice.reducer;
