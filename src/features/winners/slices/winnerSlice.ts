import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import {
  fetchWinners,
  createWinner,
  updateWinner,
  deleteWinner,
} from 'features/winners/slices/winnerThunks';
import { WinnersState } from '@winnerTypes/interfaces/winners.interfaces';
import { WinnersLimits } from '@winnerTypes/enums/winners.enums';

const initialState: WinnersState = {
  winners: [],
  loading: false,
  winnersError: '',
  pagination: { pageIndex: 0, pageSize: WinnersLimits.PAGE_LIMIT },
  sorting: [],
  totalWinners: 0,
};

const tableSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setSortingParametrs: (state, action) => {
      state.sorting = action.payload;
    },
    setPaginationParametrs: (state, action) => {
      if (state.totalWinners === 0 && action.payload.page !== state.pagination.pageIndex) {
        return;
      }
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.winners = action.payload.data;
        state.totalWinners = action.payload.total;
        state.loading = false;
      })
      .addCase(createWinner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateWinner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWinner.fulfilled, (state) => {
        state.loading = false;
      });
    builder
      .addMatcher(isPending(fetchWinners, createWinner, updateWinner, deleteWinner), (state) => {
        state.winnersError = '';
        state.loading = true;
      })
      .addMatcher(
        isRejected(fetchWinners, createWinner, updateWinner, deleteWinner),
        (state, action) => {
          state.winnersError =
            typeof action.payload === 'string' ? action.payload : 'Something went wrong';
          state.loading = false;
        }
      );
  },
});

export const { setSortingParametrs, setPaginationParametrs } = tableSlice.actions;

export default tableSlice.reducer;
