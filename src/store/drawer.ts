import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './root';
import type { Pokemon } from 'pokenode-ts';

interface DrawerState {
  isOpen: boolean;
  currentPokemon?: Pokemon;
}

const initialState: DrawerState = {
  isOpen: false,
  currentPokemon: undefined,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    displayPokemonDetails: (state, action: PayloadAction<Pokemon>) => {
      state.isOpen = true;
      state.currentPokemon = action.payload;
    },
    displayRoster: state => {
      state.isOpen = true;
      state.currentPokemon = undefined;
    },
    closeDrawer: state => {
      state.isOpen = false;
    },
  },
});

export const { displayPokemonDetails, displayRoster, closeDrawer } = drawerSlice.actions;
export const selectIsDrawerOpen = (state: RootState) => state.drawer.isOpen;
export const selectCurrentPokemon = (state: RootState) => state.drawer.currentPokemon;
export const drawerReducer = drawerSlice.reducer;
