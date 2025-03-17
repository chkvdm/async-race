import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { generateRandomCars, fetchCars } from '@garageFeatures/slices/garageThunks';
import ActionButton from 'components/Buttons/ActionButton/ActionButton';
import RaceStatus from '@raceFeatures/ts/enums/race.enums';

const GenerateCars: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPageNumber } = useAppSelector((state: RootState) => state.garage);
  const { status } = useAppSelector((state: RootState) => state.race);

  const generateCars = async (): Promise<void> => {
    dispatch(generateRandomCars())
      .unwrap()
      .then(() => {
        dispatch(fetchCars(currentPageNumber));
      });
  };

  return (
    <ActionButton
      htmlType="button"
      style={{ width: '200px', marginRight: 0 }}
      onClick={generateCars}
      disabled={!(status === RaceStatus.INITIAL)}
    >
      Add 100 random car
    </ActionButton>
  );
};

export default GenerateCars;
