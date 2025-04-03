import React from 'react';

import { FileProvider } from './use-file';
import { ToastProvider } from './use-toast';

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <FileProvider>{children}</FileProvider>
    </ToastProvider>
  );
}

export { AppProvider };
