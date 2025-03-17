import { ReactNode, useContext } from 'react';

import Header from 'widgets/Header/Header';
import Footer from 'widgets/Footer/Footer';
import styles from 'layout/content.module.scss';

import { CarRefsContext } from 'CarRefsContext/CarRefsContext';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps): JSX.Element => {
  const carRefsContext = useContext(CarRefsContext);
  if (!carRefsContext) return <div />;
  const { carRefs } = carRefsContext;

  return (
    <div className={styles.content}>
      <Header carRefs={carRefs} />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
