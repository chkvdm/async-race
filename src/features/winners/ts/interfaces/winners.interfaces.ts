import { Sorting, WinnersPaginationState } from '@winnerTypes/types/winners.types';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCar extends Winner {
  color: string;
  name: string;
}

export interface WinnersState {
  winners: WinnerWithCar[];
  loading: boolean;
  winnersError: string;
  totalWinners: number;
  pagination: WinnersPaginationState;
  sorting: Sorting;
}

type WinnersStatePartForHook = Pick<WinnersState, 'sorting' | 'pagination' | 'totalWinners'>;

export interface UseWinnerState extends WinnersStatePartForHook {
  handlePageChange: (newPaginationParam: WinnersPaginationState) => void;
  handleSortChange: (newSortingParam: Sorting) => void;
}
