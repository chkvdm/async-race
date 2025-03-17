import { useContext } from 'react';

import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { CarRefsContext } from 'CarRefsContext/CarRefsContext';
import CarFormsPanel from '@garageFeatures/components/CarFormPanel/CarFormsPanel';
import RandomCarGenerator from '@garageFeatures/components/RandomCarGenerator/RandomCarGenerator';
import RaceControlPanel from '@garageFeatures/components/RaceControlPanel/RaceControlPanel';
import RaceTrack from '@garageFeatures/components/RaceTrack/RaceTrack';
import RaceTrackPagination from '@garageFeatures/components/Paginations/RaceTrackPagination';
import TableLoader from 'components/Loaders/TableLoader/TableLoader';
import styles from 'pages/garage/garage.module.scss';

const Garage: React.FC = () => {
  const { loading } = useAppSelector((state: RootState) => state.garage);

  const carRefsContext = useContext(CarRefsContext);
  if (!carRefsContext) return null;
  const { carRefs } = carRefsContext;

  return (
    <>
      <div className={styles.carsManagementContainer}>
        <div className={styles.formsWrapper}>
          <CarFormsPanel />
        </div>
        <RandomCarGenerator />
      </div>

      <div className={styles.raceManagmentContainer}>
        <RaceControlPanel carRefs={carRefs} />
      </div>

      <div className={styles.raceTrackContainer}>
        {loading ? <TableLoader /> : <RaceTrack carRefs={carRefs} />}
      </div>

      <div className={styles.raceTrackPaginationContainer}>
        <RaceTrackPagination />
      </div>
    </>
  );
};

export default Garage;
