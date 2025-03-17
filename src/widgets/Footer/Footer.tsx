import styles from 'widgets/Footer/footer.module.scss';
import { GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContent}>
      <div className={styles.footerWrapper}>
        <ul className={styles.footerList}>
          <li className={styles.footerItem}>
            <a
              href="https://github.com/chkvdm"
              target="_blank"
              rel="external noreferrer"
              className={styles.footerLink}
            >
              <GithubOutlined className={styles.footerThumb} />
              Vadim Chaiko
            </a>
          </li>
          <li className={styles.footerItem}>
            <a
              href="https://rs.school/"
              target="_blank"
              rel="external noreferrer"
              className={styles.footerLink}
            >
              <img
                src="/rss-logo.webp"
                alt="rsschool"
                width="20px"
                className={styles.footerThumb}
              />
              RS School
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
