import { BrowserOpenURL } from '../../wailsjs/runtime/runtime';

import { useToast } from '@/context/use-toast';

export const useBrowser = () => {
  const { showToast } = useToast();

  const handleOpenUrl = async (url: string) => {
    try {
      BrowserOpenURL(url);
    } catch (error) {
      showToast({
        message: 'Error opening URL',
        type: 'error'
      });
    }
  };

  return { handleOpenUrl };
};
