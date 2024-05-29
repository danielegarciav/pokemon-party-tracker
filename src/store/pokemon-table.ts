import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './root';

interface DrawerState {
  page: number;
  typeFilter: string;
}

const initialState: DrawerState = {
  page: 0,
  typeFilter: '',
};

const pokemonTable = createSlice({
  name: 'pokemonTable',
  initialState,
  reducers: {
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.page = 0;
      state.typeFilter = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setTypeFilter, setPage } = pokemonTable.actions;
export const selectTablePage = (state: RootState) => state.pokemonTable.page;
export const selectTableTypeFilter = (state: RootState) => state.pokemonTable.typeFilter;
export const pokemonTableReducer = pokemonTable.reducer;
