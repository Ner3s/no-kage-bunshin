import { useToast } from '@/context/use-toast';
// Importamos diretamente do novo módulo de adapters de browser
import { BrowserAdapter } from '@/utils/adapters/browser';

export const useBrowser = () => {
  const { showToast } = useToast();

  const handleOpenUrl = async (url: string) => {
    try {
      await BrowserAdapter.openUrl(url);
    } catch (error) {
      showToast({
        message: 'Error opening URL',
        type: 'error'
      });
    }
  };

  return { handleOpenUrl };
};
