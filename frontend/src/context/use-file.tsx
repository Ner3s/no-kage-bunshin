import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction
} from 'react';

import {
  DeleteDuplicatedFiles,
  ListClones,
  SelectFolder
} from '../../wailsjs/go/main/App';
import { usecases } from '../../wailsjs/go/models';
import { useToast } from './use-toast';

export interface IFileContext {
  isLoading: boolean;
  folderSelected: string;
  selectedClonesToRemove: string[];
  fileList: usecases.CloneResult | undefined;
  setFileList: Dispatch<SetStateAction<usecases.CloneResult | undefined>>;
  setSelectedClonesToRemove: Dispatch<SetStateAction<string[]>>;
  onSelectDirectory: () => Promise<void>;
  onDeleteClones: () => Promise<void>;
}

interface FileProviderProps {
  children: React.ReactNode;
}

const FileContext = createContext<IFileContext>({} as IFileContext);

const FileProvider = ({ children }: FileProviderProps) => {
  const [folderSelected, setFolder] = useState<string>('');
  const [fileList, setFileList] = useState<usecases.CloneResult>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClonesToRemove, setSelectedClonesToRemove] = useState<
    string[]
  >([]);
  const { showToast } = useToast();

  async function onSelectDirectory() {
    setIsLoading(true);
    try {
      const result = await SelectFolder();

      if (!result) {
        return;
      }

      setFolder(result);
      await onListClones(result);
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Error selecting folder'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onListClones(selectedFolder: string) {
    setIsLoading(true);
    try {
      const fileList = await ListClones(selectedFolder);
      setFileList(fileList);
      console.log(fileList);
      if (fileList.clones === null)
        showToast({ type: 'info', message: 'No clones found' });
    } catch (error) {
      console.log(error);
      showToast({
        type: 'error',
        message: 'Error listing clones'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onDeleteClones() {
    setIsLoading(true);
    try {
      if (!selectedClonesToRemove) {
        return;
      }

      const result = await DeleteDuplicatedFiles(selectedClonesToRemove, false);
      showToast({ type: 'success', message: result });

      await onListClones(folderSelected);
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Error deleting clones'
      });
    } finally {
      setIsLoading(false);
      setSelectedClonesToRemove([]);
    }
  }

  return (
    <FileContext.Provider
      value={{
        selectedClonesToRemove,
        setSelectedClonesToRemove,
        onSelectDirectory,
        onDeleteClones,
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
