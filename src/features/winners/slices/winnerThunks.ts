import { createAsyncThunk } from '@reduxjs/toolkit';

import handleApiRequest from 'utils/helpers/handleApiRequest';
import winnersApi from 'features/winners/api/winnersApi';
import carsApi from '@garageFeatures/api/carsApi';
import { Sorting, WinnersPaginationState } from '@winnerTypes/types/winners.types';
import { Winner } from '@winnerTypes/interfaces/winners.interfaces';
import { WinnerWinsCountUpdater } from '@winnerTypes/enums/winners.enums';

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async (
    { pagination, sorting }: { pagination: WinnersPaginationState; sorting: Sorting },
    { rejectWithValue }
  ) =>
    handleApiRequest(async () => {
      const { winnersData, total } = await winnersApi.getWinners(pagination, sorting);
      if (!winnersData.length) return { data: [], total };

      const winnersWithCar = await Promise.all(
        winnersData.map(async (winner) => {
          const { color, name } = await carsApi.getCar(winner.id);
          return { ...winner, color, name };
        })
      );

      return { data: winnersWithCar, total };
    }, rejectWithValue)
);

export const createWinner = createAsyncThunk(
  'winners/createWinner',
  async ({ id, raceTime }: { id: number; raceTime: number }, { rejectWithValue }) =>
    handleApiRequest(
      () => winnersApi.createWinner(id, WinnerWinsCountUpdater.WINS_COUNT_INCREMENT, raceTime),
      rejectWithValue
    )
);

export const updateWinner = createAsyncThunk(
  'winners/updateWinner',
  async ({ winner, raceTime }: { winner: Winner; raceTime: number }, { rejectWithValue }) =>
    handleApiRequest(() => {
      const winnerBestRaceTime = Math.min(winner.time, raceTime);
      return winnersApi.updateWinner(
        winner.id,
        winner.wins + WinnerWinsCountUpdater.WINS_COUNT_INCREMENT,
        winnerBestRaceTime
      );
    }, rejectWithValue)
);

export const deleteWinner = createAsyncThunk(
  'winners/deleteWinner',
  async (id: number, { rejectWithValue }) =>
    handleApiRequest(() => winnersApi.deleteWinner(id), rejectWithValue)
);
