import { useNavigate } from 'react-router';

import { FolderOpen } from 'lucide-react';

import { BaseView } from '@/components/containers/base-view';
import { Button } from '@/components/ui/button';

import { useFile } from '@/context/use-file';
import { RoutePaths } from '@/utils/constants/route-paths';

function Home() {
  const { onSelectDirectory } = useFile();
  const navigate = useNavigate();

  return (
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
      <Button
        onClick={() => {
          navigate(RoutePaths.LOADING_CLONES);
          onSelectDirectory();
        }}
      >
        Select Folder to Scan
      </Button>
    </BaseView>
  );
}

export { Home };
