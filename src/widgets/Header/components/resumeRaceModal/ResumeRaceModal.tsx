import { Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import { resumeRace, stopRace } from '@raceFeatures/slices/raceThunks';

type ResumeRaceModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResumeRaceModal: React.FC<ResumeRaceModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { cars } = useAppSelector((state: RootState) => state.garage);
  const { stopCar, resumeAfterPauseCar } = useRaceCarService();

  const handleOk = async (): Promise<void> => {
    await dispatch(resumeRace({ cars, resumeAfterPauseCar }));
    setIsModalOpen(false);
  };

  const handleCancel = async (e: React.MouseEvent | React.KeyboardEvent): Promise<void> => {
    const isMaskClick = (e.target as HTMLElement).classList.contains('ant-modal-mask');
    if (isMaskClick) {
      setIsModalOpen(true);
    } else await dispatch(stopRace({ cars, stopCar }));
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Resume Race?"
      open={isModalOpen}
      closable={false}
      onOk={handleOk}
      okText="Resume"
      onCancel={handleCancel}
      cancelText="Cancel"
      maskClosable
    />
  );
};

export default ResumeRaceModal;
