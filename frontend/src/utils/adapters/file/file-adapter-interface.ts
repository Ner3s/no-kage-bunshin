import { usecases } from '../../../../wailsjs/go/models';

export interface FileAdapterInterface {
  selectFolder(): Promise<string | null>;
  listClones(selectedFolder: string): Promise<usecases.CloneResult>;
  deleteDuplicatedFiles(paths: string[], permanent: boolean): Promise<string>;
}
