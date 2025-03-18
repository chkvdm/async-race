import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import { startRace, stopRace, pauseRace, resumeRace } from '@raceFeatures/slices/raceThunks';
import { RaceState } from '@raceTypes/interfaces/race.interfaces';
import RaceStatus from '@raceTypes/enums/race.enums';

const initialWinnerState = {
  id: 0,
  name: '',
  raceTime: 0,
};

const initialState: RaceState = {
  status: RaceStatus.INITIAL,
  winner: initialWinnerState,
  loading: false,
  raceError: '',
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setRaceStatus(state, action) {
      state.status = action.payload;
    },
    setRaceWinner(state, action) {
      state.winner = action.payload;
    },
    setRaceError(state, action) {
      state.raceError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startRace.fulfilled, (state) => {
        state.status = RaceStatus.ACTIVE;
        state.loading = false;
      })
      .addCase(stopRace.fulfilled, (state) => {
        state.winner = initialWinnerState;
        state.status = RaceStatus.INITIAL;
        state.loading = false;
      })
      .addCase(pauseRace.fulfilled, (state) => {
        state.status = RaceStatus.PAUSED;
        state.loading = false;
      })
      .addCase(resumeRace.fulfilled, (state) => {
        state.status = RaceStatus.ACTIVE;
        state.loading = false;
      });
    builder
      .addMatcher(isPending(startRace, stopRace, pauseRace, resumeRace), (state) => {
        state.raceError = '';
        state.loading = true;
      })
      .addMatcher(isRejected(startRace, stopRace, pauseRace, resumeRace), (state, action) => {
        state.raceError =
          typeof action.payload === 'string' ? action.payload : 'Something went wrong';
        state.loading = false;
      });
  },
});

export const { setRaceStatus, setRaceWinner, setRaceError } = raceSlice.actions;

export default raceSlice.reducer;
