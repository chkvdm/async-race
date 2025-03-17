import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import { CarRefsProvider } from 'CarRefsContext/CarRefsContext';
import Layout from 'layout/RootLayout';
import RootLoader from 'components/Loaders/RootLoader/RootLoader';
import RootRouter from 'routes/RootRouter';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <CarRefsProvider>
        <Suspense fallback={<RootLoader />}>
          <Layout>
            <RootRouter />
          </Layout>
        </Suspense>
      </CarRefsProvider>
    </BrowserRouter>
  );
};

export default App;
