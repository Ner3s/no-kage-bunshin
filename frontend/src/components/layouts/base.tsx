import { Outlet, useNavigate } from 'react-router';

import { Header } from '@/components/containers/header';

import { useFile } from '@/context/use-file';
import { RoutePaths } from '@/utils/constants/route-paths';

function Base() {
  const {
    onSelectDirectory,
    isLoading,
    folderSelected,
    selectedClonesToRemove,
    onDeleteClones
  } = useFile();
  const navigate = useNavigate();
  return (
    <section className="flex h-full flex-col">
      <Header
        goToHome={() => {
          navigate('/');
        }}
        selectedClonesToRemove={selectedClonesToRemove}
        folderSelected={folderSelected}
        isLoading={isLoading}
        onSelectDirectory={() => {
          onSelectDirectory();
          navigate(RoutePaths.LOADING_CLONES);
        }}
        handleOnDeleteClones={onDeleteClones}
      />
      <main className="relative flex h-full flex-col">
        <Outlet />
      </main>
    </section>
  );
}

export { Base };
