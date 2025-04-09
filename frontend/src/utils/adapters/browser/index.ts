import { BrowserAdapterInterface } from './browser-adapter-interface';
import { WailsBrowserAdapter } from './wails-browser-adapter';

export const BrowserAdapter: BrowserAdapterInterface = {
  openUrl: async (url: string): Promise<void> => {
    return WailsBrowserAdapter.openUrl(url);
  }
};

export { WailsBrowserAdapter };
export type { BrowserAdapterInterface };
