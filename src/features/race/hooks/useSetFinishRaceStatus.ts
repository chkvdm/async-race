import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import RaceStatus from '@raceTypes/enums/race.enums';
import { setRaceStatus, setIsWinnerModalOpen } from '@raceFeatures/slices/raceSlice';

const useSetFinishRaceStatus = (): void => {
  const dispatch = useAppDispatch();
  const carsStateOnTrack = useAppSelector((state) => state.garage.carsStateOnTrack);
  const cars = useAppSelector((state) => state.garage.cars);
  const status = useAppSelector((state) => state.race.status);

  useEffect(() => {
    const carIds = new Set(cars.map((car) => car.id));
    const hasRunningCars = Object.values(carsStateOnTrack).some((car) => car.isDrive === true);
    const hasFinishedCars = Object.entries(carsStateOnTrack).some(
      ([id, car]) => car.isFinished === false && carIds.has(Number(id))
    );
    if (!hasRunningCars && !hasFinishedCars && status === RaceStatus.ACTIVE) {
      dispatch(setRaceStatus(RaceStatus.FINISHED));
      dispatch(setIsWinnerModalOpen(true));
    }
  }, [carsStateOnTrack, status]);
};

export default useSetFinishRaceStatus;
