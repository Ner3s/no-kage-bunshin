import { createBrowserRouter } from 'react-router';

import { Base } from '@/components/layouts/base';
import { LoadingClones } from '@/components/layouts/loading-clones';

import { RoutePaths } from './utils/constants/route-paths';

import { Clones } from '@/pages/clones';
import { Home } from '@/pages/home';

export const Routes = createBrowserRouter([
  {
    path: RoutePaths.HOME,
    Component: Base,
    children: [
      { path: RoutePaths.HOME, Component: Home, index: true },
      {
        path: RoutePaths.LOADING_CLONES,
        Component: LoadingClones
      },
      { path: RoutePaths.CLONES, Component: Clones }
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
