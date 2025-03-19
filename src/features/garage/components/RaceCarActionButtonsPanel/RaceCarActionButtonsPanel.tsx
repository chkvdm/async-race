import { Button, Popconfirm } from 'antd';
import {
  PlayCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { Car } from '@garageTypes/types/garage.types';
import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import styles from '@garageComponents/RaceCarActionButtonsPanel/raceCarActionButton.module.scss';
import RaceStatus from '@raceFeatures/ts/enums/race.enums';

type RaceCarActionButtonsPanelType = {
  car: Car;
  carRefs: React.MutableRefObject<{
    [id: number]: HTMLSpanElement | null;
  }>;
};

const RaceCarActionButtonsPanel: React.FC<RaceCarActionButtonsPanelType> = ({ car, carRefs }) => {
  const { carsStateOnTrack } = useAppSelector((state: RootState) => state.garage);
  const { status } = useAppSelector((state: RootState) => state.race);
  const { startCar, stopCar, removeCar, editCar } = useRaceCarService();

  return (
    <>
      <Popconfirm
        title="Delete the car"
        description="Are you sure to delete this car?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => removeCar(car.id, car.name)}
      >
        <Button
          type="text"
          className={styles.raceCarActionButton}
          icon={
            <DeleteOutlined
              style={{
                color:
                  carsStateOnTrack[car.id]?.isDrive || !(status === RaceStatus.INITIAL)
                    ? 'gray'
                    : 'red',
              }}
            />
          }
          disabled={carsStateOnTrack[car.id]?.isDrive || !(status === RaceStatus.INITIAL)}
        />
      </Popconfirm>

      <Button
        type="text"
        className={styles.raceCarActionButton}
        icon={
          <EditOutlined
            style={{
              color:
                carsStateOnTrack[car.id]?.isDrive || !(status === RaceStatus.INITIAL)
                  ? 'gray'
                  : 'blue',
            }}
          />
        }
        onClick={() => editCar(car)}
        disabled={carsStateOnTrack[car.id]?.isDrive || !(status === RaceStatus.INITIAL)}
      />

      <Button
        type="text"
        className={styles.raceCarActionButton}
        icon={
          <PlayCircleOutlined
            style={{
              color: carsStateOnTrack[car.id]?.trackTimeAfterPause ? 'gray' : 'green',
            }}
          />
        }
        onClick={() => startCar(car.id, carRefs)}
        disabled={!!carsStateOnTrack[car.id]?.trackTimeAfterPause}
      />

      <Button
        type="text"
        className={styles.raceCarActionButton}
        icon={
          <CloseCircleOutlined
            style={{
              color:
                (!carsStateOnTrack[car.id]?.isDrive &&
                  !carsStateOnTrack[car.id]?.trackTimeAfterPause) ||
                !(status === RaceStatus.INITIAL)
                  ? 'gray'
                  : 'red',
            }}
          />
        }
        onClick={() => stopCar(car.id)}
        disabled={
          (!carsStateOnTrack[car.id]?.isDrive && !carsStateOnTrack[car.id]?.trackTimeAfterPause) ||
          !(status === RaceStatus.INITIAL)
        }
      />
    </>
  );
};

export default RaceCarActionButtonsPanel;
