import { Outlet, useNavigate } from 'react-router';

import { Footer } from '@/components/containers/footer';
import { Header } from '@/components/containers/header';

import { useBrowser } from '@/hooks/use-browser';

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
  const { handleOpenUrl } = useBrowser();
  const navigate = useNavigate();
  return (
    <main className="relative flex min-h-screen flex-col">
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
      <div className="flex flex-grow items-center justify-center px-4 pb-16">
        <Outlet />
      </div>
      <Footer handleOpenUrl={handleOpenUrl} />
    </main>
  );
}

export { Base };
