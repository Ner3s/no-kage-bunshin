import { FolderOpen } from 'lucide-react';

import { BaseView } from '@/components/containers/base-view';
import { Button } from '@/components/ui/button';

import { Loading } from '@/templates/loading';

import { useFile } from '@/context/use-file';

function Home() {
  const { onSelectDirectory, isLoading } = useFile();

  return !isLoading ? (
    <BaseView
      title={
        <>
          Find the fakes, keep the original <br />
          Dattebayo! 🌀🔥
        </>
      }
      subtitle={
        <>
          Select a folder to scan for duplicate files. <br /> No-Kage-Bushin
          will identify identical files and help you
        </>
      }
      text="large"
      Icon={<FolderOpen size={32} color="var(--color-orange-400)" />}
    >
      <Button onClick={onSelectDirectory}>Select Folder to Scan</Button>
    </BaseView>
  ) : (
    <Loading
      goTo=""
      isLoading={isLoading}
      title={<>Scanning for duplicates</>}
      subtitle={<>This may take a few moments...</>}
    />
  );
}

export { Home };
