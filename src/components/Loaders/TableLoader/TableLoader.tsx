import styles from 'components/Loaders/TableLoader/tableLoader.module.scss';

const TableLoader: React.FC = () => {
  return (
    <div className={styles.loaderPanel}>
      <div className={styles.loaderLine} />
      <div className={styles.loaderLine} />
      <div className={styles.loaderLine} />
      <div className={styles.loaderLine} />
      <div className={styles.loaderLine} />
      <div className={styles.loaderLine} />
      <div className={styles.loaderLine} />
    </div>
  );
};

export default TableLoader;
