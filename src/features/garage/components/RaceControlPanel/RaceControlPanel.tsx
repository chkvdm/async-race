import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import { startRace, stopRace, pauseRace, resumeRace } from '@raceFeatures/slices/raceThunks';
import ActionButton from 'components/Buttons/ActionButton/ActionButton';
import RaceStatus from '@raceTypes/enums/race.enums';
import styles from '@garageComponents/RaceControlPanel/raceButtonGroup.module.scss';

interface RaceControlPanelProps {
  carRefs: React.MutableRefObject<{
    [id: number]: HTMLSpanElement | null;
  }>;
}

const RaceControlPanel: React.FC<RaceControlPanelProps> = ({ carRefs }) => {
  const dispatch = useAppDispatch();
  const { cars } = useAppSelector((state: RootState) => state.garage);
  const { startCar, stopCar, drive, pauseCar, resumeAfterPauseCar } = useRaceCarService();
  const { status } = useAppSelector((state: RootState) => state.race);

  const handleStartRace = async (): Promise<void> => {
    dispatch(startRace({ cars, carRefs, startCar, drive }));
  };

  const handleStopRace = async (): Promise<void> => {
    dispatch(stopRace({ cars, stopCar }));
  };

  const handlePauseRace = async (): Promise<void> => {
    dispatch(pauseRace({ cars, carRefs, pauseCar }));
  };

  const handleResumeRaceAfterPause = async (): Promise<void> => {
    dispatch(resumeRace({ cars, resumeAfterPauseCar }));
  };

  return (
    <>
      <div className={styles.raceButtonGroup}>
        <ActionButton
          htmlType="button"
          style={{ width: '120px' }}
          onClick={handleStartRace}
          disabled={!(status === RaceStatus.INITIAL) || cars.length === 0}
        >
          Start Race
        </ActionButton>

        <ActionButton
          htmlType="button"
          style={{ width: '120px' }}
          onClick={handleStopRace}
          disabled={status === RaceStatus.INITIAL}
        >
          Reset Race
        </ActionButton>
      </div>

      <div className={styles.raceButtonGroup}>
        <ActionButton
          htmlType="button"
          style={{ width: '120px' }}
          onClick={handlePauseRace}
          disabled={!(status === RaceStatus.ACTIVE)}
        >
          Pause Race
        </ActionButton>

        <ActionButton
          htmlType="button"
          style={{ width: '120px' }}
          onClick={handleResumeRaceAfterPause}
          disabled={!(status === RaceStatus.PAUSED)}
        >
          Resume Race
        </ActionButton>
      </div>
    </>
  );
};

export default RaceControlPanel;
