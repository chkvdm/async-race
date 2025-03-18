import { useAppDispatch, useAppSelector } from '@reduxHook';
import { useEffect } from 'react';
import { setCurrentPageNumber } from '@garageFeatures/slices/garageSlice';
import { fetchCars } from '@garageFeatures/slices/garageThunks';
import { RootState } from '@store';
import { UseGaragePaginationHook } from '@garageTypes/interfaces/garage.interfaces';

const useGaragePagination = (): UseGaragePaginationHook => {
  const dispatch = useAppDispatch();

  const { currentPageNumber, totalCars } = useAppSelector((state: RootState) => state.garage);

  useEffect(() => {
    dispatch(fetchCars(currentPageNumber));
  }, [currentPageNumber, dispatch]);

  const handlePageChange = async (newPageNumber: number): Promise<void> => {
    dispatch(setCurrentPageNumber(newPageNumber));
  };

  return {
    currentPageNumber,
    totalCars,
    handlePageChange,
  };
};

export default useGaragePagination;
