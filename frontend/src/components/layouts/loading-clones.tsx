import { Loading } from '../containers/loading';

import { useFile } from '@/context/use-file';
import { RoutePaths } from '@/utils/constants/route-paths';

function LoadingClones() {
  const { isLoading } = useFile();

  return (
    <Loading
      isLoading={isLoading}
      title={<>Scanning for duplicates</>}
      subtitle={<>This may take a few moments...</>}
      goTo={RoutePaths.CLONES}
    />
  );
}

export { LoadingClones };
