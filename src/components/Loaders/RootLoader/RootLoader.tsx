import { Spin } from 'antd';
import styles from 'components/loaders/rootLoader/rootLoader.module.scss';

const RootLoader: React.FC = () => {
  return (
    <div className={styles.rootLoader}>
      <Spin size="large" />
    </div>
  );
};

export default RootLoader;
