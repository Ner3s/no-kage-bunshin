import { useContext, useState, createContext } from 'react';

import { ListClones, SelectFolder } from '../../wailsjs/go/main/App';
import { services } from '../../wailsjs/go/models';

export interface IFileContext {
  folderSelected: string;
  fileList: services.CloneResult | undefined;
  onSelectDirectory: () => Promise<void>;
}

interface FileProviderProps {
  children: React.ReactNode;
}

const FileContext = createContext<IFileContext>({} as IFileContext);

const FileProvider = ({ children }: FileProviderProps) => {
  const [folderSelected, setFolder] = useState<string>('');
  const [fileList, setFileList] = useState<services.CloneResult>();

  async function onSelectDirectory() {
    try {
      const result = await SelectFolder();

      if (!result) {
        return;
      }

      setFolder(result);

      const fileList = await ListClones(result);
      setFileList(fileList);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FileContext.Provider
      value={{ onSelectDirectory, folderSelected, fileList }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};

export { FileProvider };
