import { FolderOpen, Trash2 } from 'lucide-react';

import { Logo } from '../icons/logo';
import { Button } from '../ui/button';

type HeaderProps = {
  folderSelected?: string;
  isLoading?: boolean;
  selectedClonesToRemove?: string[];
  onSelectDirectory: () => void;
  extractFiles?: () => void;
  handleSearchFiles?: (filename: string) => void;
  handleOnDeleteClones?: () => void;
  goToHome: () => void;
};

export function Header({
  folderSelected = '',
  onSelectDirectory,
  goToHome,
  isLoading,
  selectedClonesToRemove = [],
  handleOnDeleteClones
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-white p-2 drop-shadow-xs sm:p-4">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <div
          className="flex shrink-0 cursor-pointer items-center justify-center sm:justify-start"
          onClick={goToHome}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-400 sm:h-12 sm:w-12">
            <Logo width={32} height={32} />
          </div>
          <h1 className="ml-2 self-center text-lg font-extrabold whitespace-nowrap text-gray-800 sm:ml-3 sm:text-xl lg:text-2xl">
            No Kage Bunshin
          </h1>
        </div>

        <div className="mx-2 flex-grow truncate sm:mx-4">
          <span className="flex justify-center text-sm font-normal text-gray-500 sm:text-base">
            <span className="truncate">
              📁 {folderSelected ? folderSelected : 'No folder selected'}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:justify-start sm:gap-3.5">
          <Button
            onClick={onSelectDirectory}
            disabled={isLoading}
            className="px-2 py-1 text-sm sm:px-3 sm:text-base"
          >
            <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="ml-1 hidden sm:inline">
              {isLoading ? 'Scanning...' : 'Select Folder'}
            </span>
          </Button>
          <Button
            color="delete"
            disabled={selectedClonesToRemove.length === 0}
            onClick={handleOnDeleteClones}
            className="px-2 py-1 text-xs sm:px-3 sm:text-sm md:text-base"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="ml-1 hidden sm:inline">
              Delete{' '}
              <span className="inline-block">
                ({selectedClonesToRemove.length})
              </span>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
