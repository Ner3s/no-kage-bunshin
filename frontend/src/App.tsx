import { RouterProvider } from 'react-router';

import { AppProvider } from './context';
import { Routes } from './routes';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={Routes} />
    </AppProvider>
  );
}

export default App;
