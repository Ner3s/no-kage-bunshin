import { FolderOpen, Trash2 } from 'lucide-react';

import { Button } from '../button';
import { Logo } from '../icons/logo';

type HeaderProps = {
  folderSelected?: string;
  onSelectDirectory: () => void;
  extractFiles?: () => void;
  handleSearchFiles?: (filename: string) => void;
};

export function Header({
  folderSelected = '',
  onSelectDirectory,
  extractFiles,
  handleSearchFiles
}: HeaderProps) {
  return (
    <header className="flex min-h-16 w-full bg-white p-4 drop-shadow-xs">
      <section className="grid w-full grid-cols-3">
        <section className="flex items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400">
            <Logo width={45.3} height={32.6} />
          </div>
          <h1 className="ml-3 self-center text-center text-2xl font-bold text-orange-400">
            No Kage Bunshin
          </h1>
          {/* <span>Find the fakes, keep the original — Dattebayo! 🌀🔥</span> */}
        </section>
        <section>
          {/* <input type="search" placeholder="Search for filename" /> */}
          {folderSelected && <span>Folder selected: {folderSelected}</span>}
        </section>
        <section className="flex items-center justify-end gap-3.5">
          <Button>
            <FolderOpen />
            <span className="ml-1">Select Folder</span>
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
