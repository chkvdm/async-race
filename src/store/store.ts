import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'features/root/slices/rootSlice';
import garageReducer from '@garageFeatures/slices/garageSlice';
import winnersReducer from 'features/winners/slices/winnerSlice';
import raceReducer from '@raceFeatures/slices/raceSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    garage: garageReducer,
    race: raceReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
