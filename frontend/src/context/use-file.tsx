import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction
} from 'react';

import { ListClones, SelectFolder } from '../../wailsjs/go/main/App';
import { services } from '../../wailsjs/go/models';

export interface IFileContext {
  isLoading: boolean;
  folderSelected: string;
  selectedClonesToRemove: string[];
  fileList: services.CloneResult | undefined;
  setFileList: Dispatch<SetStateAction<services.CloneResult | undefined>>;
  setSelectedClonesToRemove: Dispatch<SetStateAction<string[]>>;
  onSelectDirectory: () => Promise<void>;
}

interface FileProviderProps {
  children: React.ReactNode;
}

const FileContext = createContext<IFileContext>({} as IFileContext);

const FileProvider = ({ children }: FileProviderProps) => {
  const [folderSelected, setFolder] = useState<string>('');
  const [fileList, setFileList] = useState<services.CloneResult>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClonesToRemove, setSelectedClonesToRemove] = useState<
    string[]
  >([]);

  async function onSelectDirectory() {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FileContext.Provider
      value={{
        selectedClonesToRemove,
        setSelectedClonesToRemove,
        onSelectDirectory,
        folderSelected,
        fileList,
        isLoading,
        setFileList
      }}
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
