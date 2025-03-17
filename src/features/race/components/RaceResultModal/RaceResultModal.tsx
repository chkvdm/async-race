import { Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import { stopRace } from '@raceFeatures/slices/raceThunks';
import RaceStatus from '@raceTypes/enums/race.enums';

const RaceModal: React.FC = () => {
  const { status, winner } = useAppSelector((state: RootState) => state.race);
  const { cars } = useAppSelector((state: RootState) => state.garage);
  const { stopCar, winnerRecord } = useRaceCarService();
  const dispatch = useAppDispatch();

  const handleOk = async (): Promise<void> => {
    winnerRecord();
    dispatch(stopRace({ cars, stopCar }));
  };

  const handleCancel = async (): Promise<void> => {
    dispatch(stopRace({ cars, stopCar }));
  };

  return (
    <Modal
      title={`${winner.name} Win!`}
      open={status === RaceStatus.FINISHED && !!winner.name}
      closable={false}
      onOk={handleOk}
      okText="Save result"
      onCancel={handleCancel}
      cancelText="Cancel result"
      maskClosable={false}
    >
      {`Time - ${Math.round(winner.raceTime * 10) / 10} sec`}
    </Modal>
  );
};

export default RaceModal;
