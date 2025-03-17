import styles from '@garageComponents/emptyGarage/emptyGarage.module.scss';

const EmptyGarage = (): JSX.Element => {
  return (
    <div className={styles.emptyTrackItem}>
      <div className={styles.emptyTrackInfo}></div>
      <div className={styles.emptyRaceTrack}>
        <div className={styles.emptyGarageText}>Currently, no car in garage.</div>
      </div>
    </div>
  );
};

export default EmptyGarage;
