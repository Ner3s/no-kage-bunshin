import { createBrowserRouter } from 'react-router';

import { Base } from '@/templates/base';

import { Home } from '@/pages/home';

export const Routes = createBrowserRouter([
  {
    path: '/',
    Component: Base,
    children: [{ path: '/', Component: Home, index: true }]
  }
]);
