import RaceStatus from '@raceTypes/enums/race.enums';
import RaceWinner from '@raceTypes/types/race.types';
import { Car } from '@garageFeatures/ts/types/garage.types';

export interface RaceState {
  status: RaceStatus;
  winner: RaceWinner;
  isWinnerModalOpen: boolean;
  loading: boolean;
  raceError: string;
}

export interface UseCarServiceType {
  startCar: (id: number) => Promise<void>;
  drive: (
    id: number,
    carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>
  ) => Promise<void>;
  stopCar: (id: number) => Promise<void>;
  pauseCar: (
    id: number,
    carRefs: React.MutableRefObject<{
      [id: number]: HTMLSpanElement | null;
    }>
  ) => Promise<void>;
  resumeAfterPauseCar: (id: number) => Promise<void>;
  removeCar: (id: number, name: string) => Promise<void>;
  editCar: (clickedCar: Car) => void;
  finishAction: (
    car: Car,
    carRefs: React.MutableRefObject<{
      [id: number]: HTMLSpanElement | null;
    }>
  ) => void;
  winnerRecord: () => Promise<void>;
}
