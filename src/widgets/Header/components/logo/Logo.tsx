import styles from 'widgets/Header/components/logo/logo.module.scss';

const Logo = (): JSX.Element => {
  return <img className={styles.headerLogo} src="/header-logo.webp" alt="header-logo" />;
};

export default Logo;
