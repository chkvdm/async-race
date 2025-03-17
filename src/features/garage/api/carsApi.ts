import { GarageLimits } from '@garageTypes/enums/garage.enums';
import { Car } from '@garageTypes/types/garage.types';
import API_ENDPOINTS from 'api/endpoints';
import winnersAPI from 'features/winners/api/winnersApi';

const carsAPI = {
  async getCars(
    page: number,
    limit = GarageLimits.PAGE_LIMIT
  ): Promise<{ cars: Car[]; total: number }> {
    const response = await fetch(API_ENDPOINTS.GARAGE.GET_CARS(page, limit));
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    return {
      cars: await response.json(),
      total: Number(response.headers.get('x-total-count')),
    };
  },

  async getCar(id: number): Promise<Car> {
    const response = await fetch(API_ENDPOINTS.GARAGE.GET_CAR(id));
    if (!response.ok) {
      throw new Error('failed to load auto');
    }
    return response.json();
  },

  async createCar(name: string, color: string): Promise<Car> {
    const response = await fetch(API_ENDPOINTS.GARAGE.CREATE_CAR(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    return response.json();
  },

  async updateCar(id: number, name: string, color: string): Promise<Car> {
    const response = await fetch(API_ENDPOINTS.GARAGE.UPDATE_CAR(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    if (!response.ok) {
      throw new Error('Failed to update car');
    }
    return response.json();
  },

  async deleteCar(id: number): Promise<{ id: number }> {
    const response = await fetch(API_ENDPOINTS.GARAGE.DELETE_CAR(id), {
      method: 'DELETE',
    });
    if (response.status === 404) throw Error('Invalid ID or car does not exist');
    if (!response.ok) {
      throw new Error('Failed to delete car');
    }
    const winnerStatistics = await winnersAPI.getWinner(id);
    if (winnerStatistics) {
      await winnersAPI.deleteWinner(id);
    }
    return { id };
  },
};

export default carsAPI;
