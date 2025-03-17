import { Pagination } from 'antd';

import useGaragePagination from '@garageFeatures/hooks/useGaragePagination';
import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { GarageLimits } from '@garageTypes/enums/garage.enums';
import RaceStatus from '@raceFeatures/ts/enums/race.enums';

const RaceTrackPagination: React.FC = () => {
  const { currentPageNumber, totalCars, handlePageChange } = useGaragePagination();
  const { status } = useAppSelector((state: RootState) => state.race);

  return (
    <Pagination
      total={totalCars}
      current={currentPageNumber}
      pageSize={GarageLimits.PAGE_LIMIT}
      onChange={handlePageChange}
      showTotal={(_, range) => `${range[0]}-${range[1]} of ${totalCars} cars`}
      showSizeChanger={false}
      disabled={!(status === RaceStatus.INITIAL)}
    />
  );
};

export default RaceTrackPagination;
