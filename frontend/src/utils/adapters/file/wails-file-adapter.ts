import {
  SelectFolder,
  ListClones,
  DeleteDuplicatedFiles
} from '../../../../wailsjs/go/main/App';
import { usecases } from '../../../../wailsjs/go/models';

/**
 * Adapter para operações de sistema de arquivos usando a API Wails
 *
 * Esta classe fornece métodos estáticos para interagir com o sistema de arquivos
 * através da API Wails, permitindo selecionar pastas, listar clones (arquivos duplicados)
 * e excluir arquivos duplicados.
 */
export class WailsFileAdapter {
  /**
   * Abre um diálogo para selecionar uma pasta
   * @returns Promise com o caminho da pasta selecionada ou null se cancelado
   */
  static async selectFolder(): Promise<string | null> {
    try {
      return await SelectFolder();
    } catch (error) {
      console.error('Error selecting folder:', error);
      throw error;
    }
  }

  /**
   * Lista arquivos duplicados (clones) em uma pasta selecionada
   * @param selectedFolder Caminho da pasta a ser analisada
   * @returns Promise com o resultado da análise de clones
   */
  static async listClones(
    selectedFolder: string
  ): Promise<usecases.CloneResult> {
    try {
      return await ListClones(selectedFolder);
    } catch (error) {
      console.error('Error listing clones:', error);
      throw error;
    }
  }

  /**
   * Remove arquivos duplicados
   * @param paths Lista de caminhos de arquivos a serem removidos
   * @param permanent Se true, exclui permanentemente; se false, move para a lixeira
   * @returns Promise com mensagem de resultado da operação
   */
  static async deleteDuplicatedFiles(
    paths: string[],
    permanent: boolean
  ): Promise<string> {
    try {
      return await DeleteDuplicatedFiles(paths, permanent);
    } catch (error) {
      console.error('Error deleting duplicated files:', error);
      throw error;
    }
  }
}
