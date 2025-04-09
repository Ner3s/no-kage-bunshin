import { BrowserOpenURL } from '../../../../wailsjs/runtime/runtime';

export class WailsBrowserAdapter {
  /**
   * Abre uma URL no navegador padrão do sistema
   * @param url URL a ser aberta
   */
  static async openUrl(url: string): Promise<void> {
    try {
      BrowserOpenURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
      throw error;
    }
  }
}
