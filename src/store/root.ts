import { configureStore } from '@reduxjs/toolkit';
import { drawerReducer } from './drawer';
import { rosterReducer } from './roster';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    roster: rosterReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
