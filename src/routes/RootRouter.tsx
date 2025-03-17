import { lazy, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { errorAlert } from 'components/Alerts/errorAlert';

const Garage = lazy(() => import('pages/Garage/Garage'));
const Winners = lazy(() => import('pages/Winners/Winners'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));

const RootRouter: React.FC = () => {
  const { garageError } = useAppSelector((state: RootState) => state.garage);
  const { raceError } = useAppSelector((state: RootState) => state.race);
  const { winnersError } = useAppSelector((state: RootState) => state.winners);

  const errorMessage = useMemo(() => {
    if (garageError) return garageError;
    if (raceError) return raceError;
    if (winnersError) return winnersError;
    return '';
  }, [garageError, raceError, winnersError]);

  useEffect(() => {
    if (errorMessage) {
      errorAlert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <Routes>
      <Route path="/" element={<Garage />} />
      <Route path="/winners" element={<Winners />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RootRouter;
