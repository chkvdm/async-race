import { useEffect, useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '@widgets/Header/components/Logo/Logo';
import PageName from 'features/root/ts/enums/root.enums';
import { useAppDispatch, useAppSelector } from '@reduxHook';
import { setRootPageName } from 'features/root/slices/rootSlice';
import { pauseRace } from '@raceFeatures/slices/raceThunks';
import { RootState } from '@store';
import useRaceCarService from '@raceFeatures/services/raceCarServices';
import RaceStatus from '@raceTypes/enums/race.enums';
import ResumeRaceModal from '@widgets/Header/components/resumeRaceModal/ResumeRaceModal';
import styles from 'widgets/Header/header.module.scss';

type HeaderProps = {
  carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>;
};

const ROUTES = {
  GARAGE: { path: '/', pageName: PageName.GARAGE },
  WINNERS: { path: '/winners', pageName: PageName.WINNERS },
} as const;

const HeaderContent: React.FC<HeaderProps> = ({ carRefs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { cars } = useAppSelector((state: RootState) => state.garage);
  const { status } = useAppSelector((state: RootState) => state.race);
  const { pauseCar } = useRaceCarService();

  const currentPage = useMemo(() => {
    return Object.values(ROUTES).find((route) => route.path === location.pathname)?.pageName;
  }, [location.pathname]);

  useEffect(() => {
    if (currentPage) {
      dispatch(setRootPageName(currentPage));
    }
  }, [currentPage, dispatch]);

  const handlePauseCheck = (): void => {
    if (status === RaceStatus.PAUSED) {
      setIsModalOpen(true);
    }
  };

  const handlePauseRace = (): void => {
    if (status === RaceStatus.ACTIVE) {
      dispatch(pauseRace({ cars, carRefs, pauseCar }));
    }
  };

  const links = [
    { route: ROUTES.GARAGE, onClick: handlePauseCheck },
    { route: ROUTES.WINNERS, onClick: handlePauseRace },
  ];

  return (
    <div className={styles.headerContent}>
      <Logo />
      <ResumeRaceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <nav className={styles.headerNav}>
        {links.map(({ route, onClick }) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) => (isActive ? styles.activeHeaderLink : styles.headerLink)}
            onClick={onClick}
          >
            {route.pageName}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default HeaderContent;
