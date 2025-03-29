import React from 'react';

import { FileProvider } from './use-file';

function AppProvider({ children }: { children: React.ReactNode }) {
  return <FileProvider>{children}</FileProvider>;
}

export { AppProvider };
