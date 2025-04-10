import { Outlet, useNavigate } from 'react-router';

import { Linkedin, Github } from 'lucide-react';

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
    <main className="relative flex h-full flex-col">
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
      <Outlet />
      <div className="sticky right-0 bottom-0 flex justify-end rounded bg-white px-4 py-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Develop by @AlanNer3s</span>
          <a
            className="cursor-pointer rounded bg-blue-300 p-1"
            data-testid="linkedin"
            onClick={() => {
              handleOpenUrl('https://www.linkedin.com/in/alan-neres/');
            }}
          >
            <Linkedin color="var(--color-white)" size={14} />
          </a>
          <a
            className="cursor-pointer rounded bg-gray-600 p-1"
            data-testid="github"
            onClick={() => {
              handleOpenUrl('https://github.com/ner3s');
            }}
          >
            <Github color="var(--color-white)" size={14} />
          </a>
        </div>
      </div>
    </main>
  );
}

export { Base };
