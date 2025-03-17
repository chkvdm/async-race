import API_ENDPOINTS from 'api/endpoints';
import { Sorting, WinnersPaginationState } from '@winnerTypes/types/winners.types';
import { Winner } from '@winnerTypes/interfaces/winners.interfaces';
import { WinnersLimits, WinnersSortOrder } from '@winnerTypes/enums/winners.enums';

const winnersApi = {
  async getSortParams(sorting: Sorting): Promise<{ sort: string; order: string }> {
    const sort = sorting.length > 0 ? sorting[0].id : '';
    let order = '';
    if (sort) {
      order = sorting[0].desc ? WinnersSortOrder.DESC : WinnersSortOrder.ASC;
    }
    return { sort, order };
  },

  async getWinners(
    pagination: WinnersPaginationState,
    sorting: Sorting
  ): Promise<{ winnersData: Winner[]; total: number }> {
    const { sort, order } = await winnersApi.getSortParams(sorting);
    const page = pagination.pageIndex + WinnersLimits.PAGE_NUMBER_OFFSET;
    const response = await fetch(
      API_ENDPOINTS.WINNERS.GET_WINNERS(page, pagination.pageSize, sort, order)
    );
    if (!response.ok) {
      throw new Error('failed to load winners');
    }
    return {
      winnersData: await response.json(),
      total: Number(response.headers.get('x-total-count')),
    };
  },

  async getWinner(id: number): Promise<Winner | null> {
    const response = await fetch(API_ENDPOINTS.WINNERS.GET_WINNER(id));
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch winner');
    }
    return response.json();
  },

  async createWinner(id: number, wins: number, time: number): Promise<Winner> {
    const response = await fetch(API_ENDPOINTS.WINNERS.CREATE_WINNER(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, wins, time }),
    });
    if (response.status === 500) {
      throw new Error(response.statusText);
    }
    if (!response.ok) {
      throw new Error('Failed to create winner');
    }
    return response.json();
  },

  async updateWinner(id: number, wins: number, time: number): Promise<Winner> {
    const response = await fetch(API_ENDPOINTS.WINNERS.UPDATE_WINNER(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins, time }),
    });
    if (response.status === 404) {
      throw new Error('Winner not found');
    }
    if (!response.ok) {
      throw new Error('Failed to update winner');
    }
    return response.json();
  },

  async deleteWinner(id: number): Promise<void> {
    const response = await fetch(API_ENDPOINTS.WINNERS.DELETE_WINNER(id), {
      method: 'DELETE',
    });
    if (response.status === 404) {
      throw new Error('Winner not found');
    }
    if (!response.ok) {
      throw new Error('Failed to delete winner');
    }
  },
};

export default winnersApi;
