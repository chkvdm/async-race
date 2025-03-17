import useSetFinishRaceStatus from '@raceFeatures/hooks/useSetFinishRaceStatus';
import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import EmptyGarage from '@garageFeatures/components/EmptyGarage/EmptyGarage';
import RaceModal from '@raceFeatures/components/RaceResultModal/RaceResultModal';
import RaceCarActionButtonsPanel from '@garageFeatures/components/RaceCarActionButtonsPanel/RaceCarActionButtonsPanel';
import RaceCar from '@garageFeatures/components/RaceCar/RaceCar';
import FinishStatusIcon from '@garageFeatures/components/FinishStatusIcon/FinishStatusIcon';
import styles from '@garageComponents/RaceTrack/raceTrack.module.scss';

interface RaceTrackType {
  carRefs: React.MutableRefObject<{
    [id: number]: HTMLSpanElement | null;
  }>;
}

const RaceTrack: React.FC<RaceTrackType> = ({ carRefs }) => {
  useSetFinishRaceStatus();
  const { cars, carsStateOnTrack } = useAppSelector((state: RootState) => state.garage);

  return (
    <>
      <RaceModal />
      <ul className={styles.raceTrackList}>
        {cars.length === 0 ? (
          <EmptyGarage />
        ) : (
          cars.map((car) => (
            <div key={car.id} className={styles.raceTrackItem}>
              <div className={styles.raceCarInfo}>
                <span>{car.name}</span>
                <span>{carsStateOnTrack[car.id]?.carStateOnTreckError}</span>
              </div>

              <div className={styles.raceTrack}>
                <div className={styles.raceCarActionButtons}>
                  <RaceCarActionButtonsPanel car={car} />
                </div>

                <div className={styles.raceCar}>
                  <RaceCar car={car} carRefs={carRefs} />
                </div>

                <div className={styles.finishLogo}>
                  <FinishStatusIcon car={car} />
                </div>
              </div>
            </div>
          ))
        )}
      </ul>
    </>
  );
};

export default RaceTrack;
