import { Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import { setIsWinnerModalOpen } from '@raceFeatures/slices/raceSlice';
import RaceStatus from '@raceTypes/enums/race.enums';

const RaceModal: React.FC = () => {
  const { status, winner, isWinnerModalOpen } = useAppSelector((state: RootState) => state.race);
  const { winnerRecord } = useRaceCarService();
  const dispatch = useAppDispatch();

  const handleOk = async (): Promise<void> => {
    winnerRecord();
    dispatch(setIsWinnerModalOpen(false));
  };

  const handleCancel = async (): Promise<void> => {
    dispatch(setIsWinnerModalOpen(false));
  };

  return (
    <Modal
      title={`${winner.name} Win!`}
      open={status === RaceStatus.FINISHED && !!winner.name && isWinnerModalOpen}
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
