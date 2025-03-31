import { File } from 'lucide-react';

import { COLORS, FileIcon, FileIconMap } from '../constants/file-icons';

export const getFileIcon = (extension: string): FileIcon => {
  return (
    FileIconMap[extension.toLowerCase()] || {
      Component: File,
      color: COLORS.GRAY
    }
  );
};
