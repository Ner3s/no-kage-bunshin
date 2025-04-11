const mockShowToast = vi.fn();

const mocks = vi.hoisted(() => ({
  mockSelectFolder: vi.fn(),
  mockListClones: vi.fn(),
  mockDeleteDuplicatedFiles: vi.fn()
}));

vi.mock(import('@/utils/adapters/file'), () => {
  return {
    FileAdapter: {
      selectFolder: mocks.mockSelectFolder,
      listClones: mocks.mockListClones,
      deleteDuplicatedFiles: mocks.mockDeleteDuplicatedFiles
    }
  };
});

vi.mock('../use-toast', () => ({
  useToast: vi.fn(() => ({
    showToast: mockShowToast
  }))
}));

import { ReactNode } from 'react';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FileProvider, useFile } from '../use-file';

import { renderHook, act } from '@testing-library/react';

describe('useFile hook', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <FileProvider>{children}</FileProvider>
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('provides initial context values', () => {
    const { result } = renderHook(() => useFile(), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.folderSelected).toBe('');
    expect(result.current.selectedClonesToRemove).toEqual([]);
    expect(result.current.fileList).toBeUndefined();
  });

  it('selects directory and lists clones', async () => {
    const folderPath = '/test/folder';
    const mockCloneResults = {
      clones: {
        hash1: { original: { filename: 'test.jpg' }, duplicates: [] }
      }
    };

    mocks.mockSelectFolder.mockResolvedValue(folderPath);
    mocks.mockListClones.mockResolvedValue(mockCloneResults);

    const { result } = renderHook(() => useFile(), { wrapper });

    await act(async () => {
      await result.current.onSelectDirectory();
    });

    expect(mocks.mockSelectFolder).toHaveBeenCalled();
    expect(mocks.mockListClones).toHaveBeenCalledWith(folderPath);
    expect(result.current.folderSelected).toBe(folderPath);
    expect(result.current.fileList).toEqual(mockCloneResults);
  });

  it('handles no folder selected', async () => {
    mocks.mockSelectFolder.mockResolvedValue(null);

    const { result } = renderHook(() => useFile(), { wrapper });

    await act(async () => {
      await result.current.onSelectDirectory();
    });

    expect(mocks.mockSelectFolder).toHaveBeenCalled();
    expect(mocks.mockListClones).not.toHaveBeenCalled();
    expect(result.current.folderSelected).toBe('');
  });

  it('displays toast when no clones are found', async () => {
    const folderPath = '/test/folder';
    const mockCloneResults = { clones: null };

    mocks.mockSelectFolder.mockResolvedValue(folderPath);
    mocks.mockListClones.mockResolvedValue(mockCloneResults);

    const { result } = renderHook(() => useFile(), { wrapper });

    await act(async () => {
      await result.current.onSelectDirectory();
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      type: 'info',
      message: 'No clones found'
    });
  });

  it('deletes selected clones', async () => {
    const folderPath = '/test/folder';
    mocks.mockDeleteDuplicatedFiles.mockResolvedValue(
      'Successfully deleted 2 files'
    );
    mocks.mockListClones.mockResolvedValue({});

    const { result } = renderHook(() => useFile(), { wrapper });

    // Set folder and selected clones
    act(() => {
      result.current.setSelectedClonesToRemove(['file1.jpg', 'file2.jpg']);
      result.current.setFolder(folderPath);
    });

    await act(async () => {
      await result.current.onDeleteClones();
    });

    expect(mocks.mockDeleteDuplicatedFiles).toHaveBeenCalledWith(
      ['file1.jpg', 'file2.jpg'],
      false
    );
    expect(mocks.mockListClones).toHaveBeenCalledWith(folderPath);
    expect(mockShowToast).toHaveBeenCalledWith({
      type: 'success',
      message: 'Successfully deleted 2 files'
    });
    expect(result.current.selectedClonesToRemove).toEqual([]);
  });

  it('does not attempt to delete when no clones are selected', async () => {
    const { result } = renderHook(() => useFile(), { wrapper });

    await act(async () => {
      await result.current.onDeleteClones();
    });

    expect(mocks.mockDeleteDuplicatedFiles).not.toHaveBeenCalled();
  });

  it('handles errors when selecting directory', async () => {
    mocks.mockSelectFolder.mockRejectedValue(
      new Error('Failed to select folder')
    );

    const { result } = renderHook(() => useFile(), { wrapper });

    await act(async () => {
      await result.current.onSelectDirectory();
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error selecting folder'
    });
  });

  it('handles errors when listing clones', async () => {
    mocks.mockSelectFolder.mockResolvedValue('/test/folder');
    mocks.mockListClones.mockRejectedValue(new Error('Failed to list clones'));

    const { result } = renderHook(() => useFile(), { wrapper });

    await act(async () => {
      await result.current.onSelectDirectory();
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error listing clones'
    });
  });

  it('handles errors when deleting clones', async () => {
    mocks.mockDeleteDuplicatedFiles.mockRejectedValue(
      new Error('Failed to delete files')
    );

    const { result } = renderHook(() => useFile(), { wrapper });

    act(() => {
      result.current.setSelectedClonesToRemove(['file1.jpg']);
    });

    await act(async () => {
      await result.current.onDeleteClones();
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error deleting clones'
    });
  });
  it('should throw exception when dont have provider', async () => {
    expect(() => renderHook(() => useFile())).toThrow(
      'useFile must be used within a FileProvider'
    );
  });
});
