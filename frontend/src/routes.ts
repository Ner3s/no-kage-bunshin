import { createBrowserRouter } from 'react-router';

import { Base } from '@/templates/base';

import { Clones } from '@/pages/clones';
import { Home } from '@/pages/home';

export const Routes = createBrowserRouter([
  {
    path: '/',
    Component: Base,
    children: [
      { path: '/', Component: Home, index: true },
      { path: '/clones', Component: Clones }
    ]
  },
  {
    path: '*',
    loader: () => {
      window.location.replace('/');
      return null;
    }
  }
]);
