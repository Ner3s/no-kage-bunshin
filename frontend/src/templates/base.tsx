import { Outlet } from 'react-router';

import { Header } from '@/components/header';

import { useFile } from '@/context/use-file';

function Base() {
  const { onSelectDirectory } = useFile();
  return (
    <main className="flex h-full flex-col">
      <Header onSelectDirectory={onSelectDirectory} />
      <Outlet />;
    </main>
  );
}

export { Base };
