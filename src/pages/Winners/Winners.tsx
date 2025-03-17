import { useEffect } from 'react';
import { notification } from 'antd';

import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import WinnerTable from 'features/winners/components/WinnerTable/WinnerTable';

const Winners: React.FC = () => {
  const { winnersError } = useAppSelector((state: RootState) => state.winners);

  useEffect(() => {
    if (winnersError) {
      notification.error({
        message: 'Oooops...',
        description: winnersError,
        placement: 'topRight',
      });
    }
  }, [winnersError]);

  return (
    <div>
      <WinnerTable />
    </div>
  );
};

export default Winners;
