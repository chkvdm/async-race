import { Car, CreatedCar, CarStateOnTreck } from '@garageTypes/types/garage.types';

export interface GarageState {
  cars: Car[];
  carsStateOnTrack: { [id: number]: CarStateOnTreck };
  currentPageNumber: number;
  totalCars: number;
  loading: boolean;
  createCarForm: CreatedCar;
  editCarForm: Car;
  garageError: string;
}

export interface UseGarageState {
  currentPageNumber: number;
  totalCars: number;
  handlePageChange: (newPageNumber: number) => void;
}
