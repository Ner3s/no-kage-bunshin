import { Outlet, useNavigate } from 'react-router';

import { Header } from '@/components/containers/header';

import { useFile } from '@/context/use-file';

function Base() {
  const { onSelectDirectory, isLoading, folderSelected } = useFile();
  const navigate = useNavigate();
  return (
    <main className="flex h-full flex-col">
      <Header
        goToHome={() => {
          navigate('/');
        }}
        folderSelected={folderSelected}
        isLoading={isLoading}
        onSelectDirectory={onSelectDirectory}
      />
      <Outlet />
    </main>
  );
}

export { Base };
