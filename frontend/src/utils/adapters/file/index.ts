/**
 * Adapters para manipulação de arquivos
 *
 * Este módulo fornece adapters para operações relacionadas a arquivos,
 * como seleção de diretórios, listagem de clones e deleção de arquivos duplicados.
 * Atualmente utiliza WailsFileAdapter como implementação padrão.
 */
import { FileAdapterInterface } from './file-adapter-interface';
import { WailsFileAdapter } from './wails-file-adapter';

export const FileAdapter: FileAdapterInterface = WailsFileAdapter;

export { WailsFileAdapter };
export type { FileAdapterInterface };
