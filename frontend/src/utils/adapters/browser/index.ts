import { BrowserAdapterInterface } from './browser-adapter-interface';
import { WailsBrowserAdapter } from './wails-browser-adapter';

export const BrowserAdapter: BrowserAdapterInterface = WailsBrowserAdapter;

export { WailsBrowserAdapter };
export type { BrowserAdapterInterface };
