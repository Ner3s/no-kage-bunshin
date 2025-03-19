import { Button } from '../button';
import { Logo } from '../icons/logo';
import headerStyles from './header.module.scss';

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
    <header className={headerStyles.header}>
      <section className={headerStyles.container}>
        <section className={headerStyles.infoContainer}>
          <div className={headerStyles.logo}>
            <Logo width={45.3} height={32.6} />
          </div>
          <div className={headerStyles.textContainer}>
            <h1>No Kage Bunshin</h1>
            <span>Find the fakes, keep the original — Dattebayo! 🌀🔥</span>
          </div>
        </section>
        <section className={headerStyles.middleContainer}>
          {/* <input type="search" placeholder="Search for filename" /> */}
          {folderSelected && <span>Folder selected: {folderSelected}</span>}
        </section>
        <section className={headerStyles.actionContainer}>
          <Button>text</Button>
        </section>
      </section>
    </header>
  );
}
