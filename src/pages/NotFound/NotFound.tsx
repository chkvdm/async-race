import { Button } from 'antd';

import styles from 'pages/notFound/notFound.module.scss';

const NotFound: React.FC = () => (
  <div className={styles.notFoundContainer}>
    <h1 className={styles.notFoundTitle}>404</h1>
    <p className={styles.notFoundSubtitle}>oooops...</p>
    <p className={styles.notFoundText}>Page not found</p>
    <Button type="primary" href="/" className={styles.notFoundButton}>
      Back Home
    </Button>
  </div>
);

export default NotFound;
