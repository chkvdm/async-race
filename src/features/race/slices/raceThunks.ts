import { createAsyncThunk } from '@reduxjs/toolkit';

import { Car } from '@garageTypes/types/garage.types';
import handleApiRequest from 'utils/helpers/handleApiRequest';

export const startRace = createAsyncThunk(
  'race/startRace',
  async (
    {
      cars,
      carRefs,
      startCar,
      drive,
    }: {
      cars: Car[];
      carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>;
      startCar: (id: number) => Promise<void>;
      drive: (
        id: number,
        carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>
      ) => Promise<void>;
    },
    { rejectWithValue }
  ) => {
    return handleApiRequest(async () => {
      await Promise.all(cars.map((car) => startCar(car.id)));
      cars.forEach((car) => drive(car.id, carRefs));
      return 'Race started successfully';
    }, rejectWithValue);
  }
);

export const stopRace = createAsyncThunk(
  'race/stopRace',
  async (
    {
      cars,
      stopCar,
    }: {
      cars: Car[];
      stopCar: (id: number) => Promise<void>;
    },
    { rejectWithValue }
  ) => {
    return handleApiRequest(async () => {
      await Promise.all(cars.map((car) => stopCar(car.id)));
      return 'Race stopped successfully';
    }, rejectWithValue);
  }
);

export const pauseRace = createAsyncThunk(
  'race/pauseRace',
  async (
    {
      cars,
      carRefs,
      pauseCar,
    }: {
      cars: Car[];
      carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>;
      pauseCar: (
        id: number,
        carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>
      ) => Promise<void>;
    },
    { rejectWithValue }
  ) => {
    return handleApiRequest(async () => {
      await Promise.all(cars.map((car) => pauseCar(car.id, carRefs)));
      return 'Paused race';
    }, rejectWithValue);
  }
);

export const resumeRace = createAsyncThunk(
  'race/resumeRace',
  async (
    {
      cars,
      resumeAfterPauseCar,
    }: { cars: Car[]; resumeAfterPauseCar: (id: number) => Promise<void> },
    { rejectWithValue }
  ) => {
    return handleApiRequest(async () => {
      cars.forEach((car) => resumeAfterPauseCar(car.id));
      return 'Race resumed';
    }, rejectWithValue);
  }
);
