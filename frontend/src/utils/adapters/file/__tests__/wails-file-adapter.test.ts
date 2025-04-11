import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as App from '../../../../../wailsjs/go/main/App';
import { WailsFileAdapter } from '../wails-file-adapter';

// Mock dos módulos externos
vi.mock('../../../../../wailsjs/go/main/App', () => ({
  SelectFolder: vi.fn(),
  ListClones: vi.fn(),
  DeleteDuplicatedFiles: vi.fn()
}));

describe('WailsFileAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('selectFolder', () => {
    it('should return selected folder path when successful', async () => {
      // Arrange
      const expectedPath = '/path/to/folder';
      vi.mocked(App.SelectFolder).mockResolvedValue(expectedPath);

      // Act
      const result = await WailsFileAdapter.selectFolder();

      // Assert
      expect(result).toBe(expectedPath);
      expect(App.SelectFolder).toHaveBeenCalledTimes(1);
    });

    it('should throw error when selection fails', async () => {
      // Arrange
      const expectedError = new Error('Selection failed');
      vi.mocked(App.SelectFolder).mockRejectedValue(expectedError);

      // Act & Assert
      await expect(WailsFileAdapter.selectFolder()).rejects.toThrow(
        expectedError
      );
      expect(App.SelectFolder).toHaveBeenCalledTimes(1);
    });
  });

  describe('listClones', () => {
    it('should return clone results when successful', async () => {
      // Arrange
      const selectedFolder = '/path/to/analyze';
      const expectedResult = { clones: [{}, {}] };
      vi.mocked(App.ListClones).mockResolvedValue(expectedResult);

      // Act
      const result = await WailsFileAdapter.listClones(selectedFolder);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(App.ListClones).toHaveBeenCalledWith(selectedFolder);
    });

    it('should throw error when listing fails', async () => {
      // Arrange
      const selectedFolder = '/path/to/analyze';
      const expectedError = new Error('Listing failed');
      vi.mocked(App.ListClones).mockRejectedValue(expectedError);

      // Act & Assert
      await expect(WailsFileAdapter.listClones(selectedFolder)).rejects.toThrow(
        expectedError
      );
      expect(App.ListClones).toHaveBeenCalledWith(selectedFolder);
    });
  });

  describe('deleteDuplicatedFiles', () => {
    it('should return success message when deletion is successful', async () => {
      // Arrange
      const paths = ['/path/to/file1', '/path/to/file2'];
      const permanent = false;
      const expectedMessage = 'Files moved to trash successfully';
      vi.mocked(App.DeleteDuplicatedFiles).mockResolvedValue(expectedMessage);

      // Act
      const result = await WailsFileAdapter.deleteDuplicatedFiles(
        paths,
        permanent
      );

      // Assert
      expect(result).toBe(expectedMessage);
      expect(App.DeleteDuplicatedFiles).toHaveBeenCalledWith(paths, permanent);
    });

    it('should throw error when deletion fails', async () => {
      // Arrange
      const paths = ['/path/to/file1', '/path/to/file2'];
      const permanent = true;
      const expectedError = new Error('Deletion failed');
      vi.mocked(App.DeleteDuplicatedFiles).mockRejectedValue(expectedError);

      // Act & Assert
      await expect(
        WailsFileAdapter.deleteDuplicatedFiles(paths, permanent)
      ).rejects.toThrow(expectedError);
      expect(App.DeleteDuplicatedFiles).toHaveBeenCalledWith(paths, permanent);
    });
  });
});
