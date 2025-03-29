import { HomeTemplate } from '@/templates/home';

import { useFile } from '@/context/use-file';

function Home() {
  const { onSelectDirectory } = useFile();

  return <HomeTemplate onSelectDirectory={onSelectDirectory} />;
}

export { Home };
