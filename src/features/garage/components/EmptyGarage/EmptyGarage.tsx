import styles from '@garageComponents/EmptyGarage/emptyGarage.module.scss';

const EmptyGarage = (): JSX.Element => {
  return (
    <div className={styles.emptyTrackItem}>
      <div className={styles.emptyTrackInfo} />
      <div className={styles.emptyRaceTrack}>
        <div className={styles.emptyGarageText}>Currently, no car in garage.</div>
      </div>
    </div>
  );
};

export default EmptyGarage;
