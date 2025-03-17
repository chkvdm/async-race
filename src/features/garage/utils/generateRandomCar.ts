import { faker } from '@faker-js/faker';

import { CreatedCar } from '@garageTypes/types/garage.types';

const getRandomCarName = (): string => `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`;
const getRandomColor = (): string => faker.color.rgb();

const generateCars = (count: number): CreatedCar[] => {
  return Array.from({ length: count }).map(() => ({
    name: getRandomCarName(),
    color: getRandomColor(),
  }));
};

export default generateCars;
