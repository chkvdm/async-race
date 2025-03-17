import { UseCarServiceType } from '@raceFeatures/ts/interfaces/race.interfaces';
import { Car } from '@garageTypes/types/garage.types';
import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import {
  trackTimeCalculation,
  calculateRemainingTrackTime,
  convertMillisecondsToSeconds,
} from '@raceFeatures/utils/carTrackTimeCalculation';
import { EngineStatus } from '@garageTypes/enums/garage.enums';
import {
  getTrackAndCarPositions,
  calculateRemainingDistance,
} from '@raceFeatures/utils/carPositionCalculation';
import engineApi from '@raceFeatures/api/engineApi';
import {
  updateCarStateOnTrack,
  initialCarState,
  resetEditCarForm,
  updateEditCarForm,
} from '@garageFeatures/slices/garageSlice';
import { fetchCars, deleteCar } from '@garageFeatures/slices/garageThunks';
import RaceStatus from '@raceTypes/enums/race.enums';
import { setRaceWinner } from '@raceFeatures/slices/raceSlice';
import winnersApi from 'features/winners/api/winnersApi';
import { createWinner, updateWinner } from 'features/winners/slices/winnerThunks';

const useRaceCarService = (): UseCarServiceType => {
  const dispatch = useAppDispatch();
  const { carsStateOnTrack, currentPageNumber, editCarForm } = useAppSelector(
    (state: RootState) => state.garage
  );
  const { status, winner } = useAppSelector((state: RootState) => state.race);

  const raceCarService = {
    async engineDamage(
      id: number,
      carRefs: React.MutableRefObject<{
        [id: number]: HTMLSpanElement | null;
      }>
    ): Promise<void> {
      const carElement = carRefs.current[id];
      if (!carElement) return;

      // defines the element's position on race track
      const positions = await getTrackAndCarPositions(carElement);
      if (!positions) return;
      const { trackLength, trackFinishPosition, currentCarPosition } = positions;

      const { remainingDistanceInPercent } = await calculateRemainingDistance(
        trackFinishPosition,
        currentCarPosition,
        trackLength
      );
      dispatch(
        updateCarStateOnTrack({
          id,
          carState: {
            position: remainingDistanceInPercent,
            isDrive: false,
            engineCondition: false,
            carStateOnTreckError: 'Ooopppp... Engine is damage',
          },
        })
      );
    },

    // Sends a request to the API to check the engine condition during race.
    async drive(
      id: number,
      carRefs: React.MutableRefObject<{
        [id: number]: HTMLSpanElement | null;
      }>
    ): Promise<void> {
      const engineIsOk = await engineApi.getEngineCondition(id, EngineStatus.DRIVE);
      if (!engineIsOk.success) {
        await raceCarService.engineDamage(id, carRefs);
      }
    },

    async startCar(id: number): Promise<void> {
      const trackTime = await trackTimeCalculation(id, EngineStatus.START);
      dispatch(
        updateCarStateOnTrack({
          id,
          carState: {
            engineStatus: EngineStatus.START,
            isDrive: true,
            trackTime,
            trackTimeAfterPause: trackTime,
          },
        })
      );
      if (!trackTime) {
        throw new Error('Failed to start...');
      }
    },

    async stopCar(id: number): Promise<void> {
      await trackTimeCalculation(id, EngineStatus.STOP);
      dispatch(
        updateCarStateOnTrack({
          id,
          carState: initialCarState,
        })
      );
    },

    async pauseCar(
      id: number,
      carRefs: React.MutableRefObject<{
        [id: number]: HTMLSpanElement | null;
      }>
    ): Promise<void> {
      const carElement = carRefs.current[id];
      if (!carElement) return;

      // defines the element's position on race track
      const positions = await getTrackAndCarPositions(carElement);
      if (!positions) return;
      const { trackLength, trackFinishPosition, currentCarPosition } = positions;

      const { remainingDistance, remainingDistanceInPercent } = await calculateRemainingDistance(
        trackFinishPosition,
        currentCarPosition,
        trackLength
      );

      const remainingTrackTime = await calculateRemainingTrackTime(
        remainingDistance,
        trackLength,
        carsStateOnTrack[id].trackTime
      );

      dispatch(
        updateCarStateOnTrack({
          id,
          carState: {
            position: remainingDistanceInPercent,
            isDrive: false,
            trackTimeAfterPause: remainingTrackTime,
          },
        })
      );
    },

    async resumeAfterPauseCar(id: number): Promise<void> {
      if (carsStateOnTrack[id].engineCondition) {
        dispatch(
          updateCarStateOnTrack({
            id,
            carState: {
              isDrive: true,
            },
          })
        );
      }
    },

    async removeCar(id: number, name: string): Promise<void> {
      dispatch(deleteCar({ id, name }))
        .unwrap()
        .then(() => {
          dispatch(resetEditCarForm());
          dispatch(fetchCars(currentPageNumber));
        });
    },

    editCar(clickedCar: Car): void {
      if (editCarForm.id === clickedCar.id) {
        dispatch(resetEditCarForm());
      } else {
        dispatch(updateEditCarForm(clickedCar));
      }
    },

    async winnerExist(car: Car): Promise<void> {
      if (status === RaceStatus.ACTIVE && !winner.name) {
        const bestRaceTime = await convertMillisecondsToSeconds(carsStateOnTrack[car.id].trackTime);
        dispatch(setRaceWinner({ id: car.id, name: car.name, raceTime: bestRaceTime }));
      }
    },

    async winnerRecord(): Promise<void> {
      const winnerHistory = await winnersApi.getWinner(winner.id);
      if (winnerHistory) {
        dispatch(updateWinner({ winner: winnerHistory, raceTime: winner.raceTime }));
      } else {
        dispatch(createWinner({ id: winner.id, raceTime: winner.raceTime }));
      }
    },

    async finishAction(
      car: Car,
      carRefs: React.MutableRefObject<{
        [id: number]: HTMLSpanElement | null;
      }>
    ): Promise<void> {
      const carElement = carRefs.current[car.id];
      if (!carElement) return;

      // defines the element's position on race track
      const positions = await getTrackAndCarPositions(carElement);
      if (!positions) return;
      const { trackLength, trackFinishPosition, currentCarPosition } = positions;

      const { remainingDistanceInPercent } = await calculateRemainingDistance(
        trackFinishPosition,
        currentCarPosition,
        trackLength
      );

      dispatch(
        updateCarStateOnTrack({
          id: car.id,
          carState: {
            position: remainingDistanceInPercent,
            isDrive: false,
          },
        })
      );
      raceCarService.winnerExist(car);
    },
  };

  return raceCarService;
};

export default useRaceCarService;
