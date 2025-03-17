import { createAsyncThunk } from '@reduxjs/toolkit';

import handleApiRequest from 'utils/helpers/handleApiRequest';
import { CreatedCar } from '@garageTypes/types/garage.types';
import { GarageLimits } from '@garageTypes/enums/garage.enums';
import generateCars from '@garageFeatures/utils/generateRandomCar';
import carsApi from '@garageFeatures/api/carsApi';
import successAlert from '@garageFeatures/utils/successAlert';

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number, { rejectWithValue }) =>
    handleApiRequest(() => carsApi.getCars(page), rejectWithValue)
);

export const createCar = createAsyncThunk(
  'garage/createCar',
  async ({ name, color }: { name: string; color: string }, { rejectWithValue }) => {
    return handleApiRequest(async () => {
      const createdCar = await carsApi.createCar(name, color);
      successAlert({ message: createdCar.name, description: 'Created successful' });
      return createdCar;
    }, rejectWithValue);
  }
);

export const updateCar = createAsyncThunk(
  'garage/updateCar',
  async ({ id, name, color }: { id: number; name: string; color: string }, { rejectWithValue }) => {
    return handleApiRequest(async () => {
      const updatedCar = await carsApi.updateCar(id, name, color);
      successAlert({ message: updatedCar.name, description: 'Updated successful' });
      return updatedCar;
    }, rejectWithValue);
  }
);

export const deleteCar = createAsyncThunk(
  'garage/deleteCar',
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
    return handleApiRequest(async () => {
      await carsApi.deleteCar(id);
      successAlert({ message: name, description: 'Deleted successful' });
    }, rejectWithValue);
  }
);

export const generateRandomCars = createAsyncThunk(
  'garage/generateRandomCars',
  async (_, { rejectWithValue }) => {
    return handleApiRequest(async () => {
      const randomCars: CreatedCar[] = generateCars(GarageLimits.RANDOM_CAR_CREATE_COUNT);
      await Promise.all(randomCars.map((car) => carsApi.createCar(car.name, car.color)));
      successAlert({ message: '100 cars', description: 'created successful' });
    }, rejectWithValue);
  }
);
