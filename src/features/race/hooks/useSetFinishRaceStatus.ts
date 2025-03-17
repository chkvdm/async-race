import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import RaceStatus from '@raceTypes/enums/race.enums';
import { setRaceStatus } from '@raceFeatures/slices/raceSlice';

const useSetFinishRaceStatus = async (): Promise<void> => {
  const dispatch = useAppDispatch();
  const carsStateOnTrack = useAppSelector((state) => state.garage.carsStateOnTrack);
  const status = useAppSelector((state) => state.race.status);

  useEffect(() => {
    const hasRunningCars = Object.values(carsStateOnTrack).some((car) => car.isDrive === true);
    if (!hasRunningCars && status === RaceStatus.ACTIVE) {
      dispatch(setRaceStatus(RaceStatus.FINISHED));
    }
  }, [carsStateOnTrack, status]);
};

export default useSetFinishRaceStatus;
