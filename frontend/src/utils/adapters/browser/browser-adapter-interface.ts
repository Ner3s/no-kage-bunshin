export interface BrowserAdapterInterface {
  openUrl(url: string): Promise<void>;
}
