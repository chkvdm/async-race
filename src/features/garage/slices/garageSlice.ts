import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import { Car, CarStateOnTreck } from '@garageTypes/types/garage.types';
import { GarageState } from '@garageTypes/interfaces/garage.interfaces';
import { EngineStatus, CarConstants } from '@garageTypes/enums/garage.enums';
import {
  fetchCars,
  createCar,
  updateCar,
  deleteCar,
  generateRandomCars,
} from '@garageFeatures/slices/garageThunks';

export const initialCarState: CarStateOnTreck = {
  position: CarConstants.CAR_INITIAL_POSITION_IN_PERCENT,
  engineStatus: EngineStatus.STOP,
  engineCondition: true,
  isDrive: false,
  isFinished: false,
  trackTime: 0,
  trackTimeAfterPause: 0,
  carStateOnTreckError: '',
};

const initialState: GarageState = {
  cars: [],
  carsStateOnTrack: {},
  currentPageNumber: 1,
  totalCars: 0,
  loading: false,
  createCarForm: {
    name: '',
    color: '#08314c',
  },
  editCarForm: {
    id: 0,
    name: '',
    color: '#08314c',
  },
  garageError: '',
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCurrentPageNumber(state, action) {
      state.currentPageNumber = action.payload;
    },
    updateCreateCarForm(state, action) {
      state.createCarForm = { ...state.createCarForm, ...action.payload };
    },
    resetCreateCarForm(state) {
      state.createCarForm = { name: '', color: '#000000' };
    },
    updateEditCarForm(state, action) {
      state.editCarForm = { ...state.editCarForm, ...action.payload };
    },
    resetEditCarForm(state) {
      state.editCarForm = { id: 0, name: '', color: '#000000' };
    },
    updateCarStateOnTrack(state, action) {
      const { id, carState } = action.payload;
      state.carsStateOnTrack[id] = { ...state.carsStateOnTrack[id], ...carState };
    },
    resetCarsStateOnTrack(state) {
      Object.keys(state.carsStateOnTrack).forEach((id) => {
        state.carsStateOnTrack[parseInt(id, 10)] = initialCarState;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload.cars;
        state.totalCars = action.payload.total;
        state.carsStateOnTrack = action.payload.cars.reduce(
          (acc: Record<number, CarStateOnTreck>, car: Car) => {
            return { ...acc, [car.id]: initialCarState };
          },
          {}
        );
        state.loading = false;
      })
      .addCase(createCar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateRandomCars.fulfilled, (state) => {
        state.loading = false;
      });

    builder
      .addMatcher(
        isPending(fetchCars, createCar, updateCar, deleteCar, generateRandomCars),
        (state) => {
          state.garageError = '';
          state.loading = true;
        }
      )
      .addMatcher(
        isRejected(fetchCars, createCar, updateCar, deleteCar, generateRandomCars),
        (state, action) => {
          state.garageError =
            typeof action.payload === 'string' ? action.payload : 'Something went wrong';
          state.loading = false;
        }
      );
  },
});

export const {
  setCurrentPageNumber,
  updateCarStateOnTrack,
  updateCreateCarForm,
  resetCreateCarForm,
  updateEditCarForm,
  resetEditCarForm,
  resetCarsStateOnTrack,
} = garageSlice.actions;

export default garageSlice.reducer;
