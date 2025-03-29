import { FolderOpen } from 'lucide-react';

import { Button } from '@/components/button';

import { IFileContext } from '@/context/use-file';

function HomeTemplate({
  onSelectDirectory
}: {
  onSelectDirectory: IFileContext['onSelectDirectory'];
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-6 rounded-full bg-orange-200 p-6">
        <FolderOpen size={32} color="var(--color-orange-400)" />
      </div>
      <div className="mb-6 text-center">
        <h2 className="mb-4 text-4xl font-extrabold">
          Find the fakes, keep the original <br />
          Dattebayo! 🌀🔥
        </h2>
        <span className="font-normal text-gray-500">
          Select a folder to scan for duplicate files.
          <br /> No-Kage-Bushin will identify identical files and help you
        </span>
      </div>
      <Button onClick={onSelectDirectory}>Select Folder to Scan</Button>
    </div>
  );
}

export { HomeTemplate };
