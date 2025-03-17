import React from 'react';
import { FlagOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Car } from '@garageTypes/types/garage.types';
import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import styles from '@garageComponents/finishStatusIcon/finishStatusIcon.module.scss';

interface FinishStatusIconProps {
  car: Car;
}

const FinishStatusIcon: React.FC<FinishStatusIconProps> = ({ car }) => {
  const { carsStateOnTrack } = useAppSelector((state: RootState) => state.garage);

  return !carsStateOnTrack[car.id].carStateOnTreckError ? (
    <FlagOutlined className={styles.finishFlagIcon} />
  ) : (
    <ExclamationCircleOutlined className={styles.checkEngineIcon} />
  );
};

export default FinishStatusIcon;
