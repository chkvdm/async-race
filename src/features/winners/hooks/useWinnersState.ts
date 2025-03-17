import { UseWinnerState } from '@winnerTypes/interfaces/winners.interfaces';
import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { useEffect } from 'react';
import { setSortingParametrs, setPaginationParametrs } from 'features/winners/slices/winnerSlice';
import { fetchWinners } from 'features/winners/slices/winnerThunks';
import { Sorting, WinnersPaginationState } from '@winnerTypes/types/winners.types';

const useWinnerState = (): UseWinnerState => {
  const dispatch = useAppDispatch();
  const { sorting, pagination, totalWinners } = useAppSelector((state: RootState) => state.winners);

  useEffect(() => {
    dispatch(fetchWinners({ pagination, sorting }));
  }, [dispatch, pagination, sorting, totalWinners]);

  const handlePageChange = (newPaginationParam: WinnersPaginationState): void => {
    dispatch(setPaginationParametrs(newPaginationParam));
  };

  const handleSortChange = (newSortingParam: Sorting): void => {
    dispatch(setSortingParametrs(newSortingParam));
  };

  return { sorting, pagination, totalWinners, handlePageChange, handleSortChange };
};

export default useWinnerState;
