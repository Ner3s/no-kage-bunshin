import { Outlet } from 'react-router';

import { Header } from '@/components/header';

import { useFile } from '@/context/use-file';

function Base() {
  const { onSelectDirectory, isLoading, folderSelected } = useFile();
  return (
    <main className="flex h-full flex-col">
      <Header
        folderSelected={folderSelected}
        isLoading={isLoading}
        onSelectDirectory={onSelectDirectory}
      />
      <Outlet />;
    </main>
  );
}

export { Base };
