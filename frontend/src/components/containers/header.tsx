import { FolderOpen, Trash2 } from 'lucide-react';

import { Logo } from '../icons/logo';
import { Button } from '../ui/button';

type HeaderProps = {
  folderSelected?: string;
  isLoading?: boolean;
  onSelectDirectory: () => void;
  extractFiles?: () => void;
  handleSearchFiles?: (filename: string) => void;
  goToHome: () => void;
};

export function Header({
  folderSelected = '',
  onSelectDirectory,
  goToHome,
  isLoading,
  extractFiles,
  handleSearchFiles
}: HeaderProps) {
  return (
    <header className="flex w-full bg-white p-4 drop-shadow-xs">
      <section className="grid w-full grid-cols-3">
        <section className="flex items-center">
          <div className="flex cursor-pointer" onClick={goToHome}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400">
              <Logo width={45.3} height={32.6} />
            </div>
            <h1 className="ml-3 self-center text-center text-2xl font-bold text-orange-400">
              No Kage Bunshin
            </h1>
          </div>
        </section>
        <section className="flex items-center justify-center">
          {folderSelected && (
            <span className="font-normal text-gray-500">
              Folder selected: {folderSelected}
            </span>
          )}
        </section>
        <section className="flex items-center justify-end gap-3.5">
          <Button onClick={onSelectDirectory} disabled={isLoading}>
            <FolderOpen />
            <span className="ml-1">
              {isLoading ? 'Scanning...' : 'Select Folder'}
            </span>
          </Button>
          <Button color="delete" disabled>
            <Trash2 />
            <span className="ml-1">Delete Selected (0)</span>
          </Button>
        </section>
      </section>
    </header>
  );
}
