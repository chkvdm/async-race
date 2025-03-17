import { TruckOutlined } from '@ant-design/icons';

import { Car } from '@garageTypes/types/garage.types';
import { CarConstants } from '@garageTypes/enums/garage.enums';
import RaceStatus from '@raceTypes/enums/race.enums';
import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import styles from '@garageComponents/RaceCar/raceCar.module.scss';

type RaceCarType = {
  car: Car;

  carRefs: React.MutableRefObject<{
    [id: number]: HTMLSpanElement | null;
  }>;
};

type CustomCSSProperties = React.CSSProperties & {
  '--car-color': string;
  '--car-position': string;
  '--car-transition': string;
  '--car-animation-state': string;
};

const RaceCar: React.FC<RaceCarType> = ({ car, carRefs }) => {
  const { status } = useAppSelector((state: RootState) => state.race);
  const { carsStateOnTrack } = useAppSelector((state: RootState) => state.garage);
  const { finishAction } = useRaceCarService();

  const setCarRef = async (id: number, el: HTMLSpanElement | null): Promise<void> => {
    const refs = carRefs.current;
    refs[id] = el;
  };

  const carStyle: CustomCSSProperties = {
    '--car-color': car.color,
    '--car-position': carsStateOnTrack[car.id]?.isDrive
      ? '0%'
      : `calc(${carsStateOnTrack[car.id]?.position}% - ${CarConstants.CAR_SIZE}px)`,
    '--car-transition': carsStateOnTrack[car.id]?.isDrive
      ? `right ${carsStateOnTrack[car.id]?.trackTimeAfterPause}ms linear`
      : 'none',
    '--car-animation-state': status === RaceStatus.PAUSED ? 'paused' : 'running',
  };

  return (
    <TruckOutlined
      ref={(el) => setCarRef(car.id, el)}
      className={styles.raceCarIcon}
      style={carStyle}
      onTransitionEnd={() => finishAction(car, carRefs)}
    />
  );
};

export default RaceCar;
