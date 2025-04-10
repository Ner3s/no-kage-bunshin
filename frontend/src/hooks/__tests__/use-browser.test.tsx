import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useBrowser } from '../use-browser';

import { renderHook, act } from '@testing-library/react';

// Mock adapters independentemente
const mockShowToast = vi.fn();

// Mock dependencies
vi.mock('@/context/use-toast', () => ({
  useToast: () => ({
    showToast: mockShowToast
  })
}));

const mocks = vi.hoisted(() => ({
  mockOpenUrl: vi.fn()
}));

vi.mock('@/utils/adapters/browser', () => ({
  BrowserAdapter: {
    openUrl: mocks.mockOpenUrl
  }
}));

describe('useBrowser hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should call BrowserAdapter.openUrl with the provided URL', async () => {
    mocks.mockOpenUrl.mockResolvedValue(undefined);

    const { result } = renderHook(() => useBrowser());

    await act(async () => {
      await result.current.handleOpenUrl('https://example.com');
    });

    expect(mocks.mockOpenUrl).toHaveBeenCalledWith('https://example.com');
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it('should show error toast when BrowserAdapter.openUrl fails', async () => {
    mocks.mockOpenUrl.mockRejectedValue(new Error('Failed to open URL'));

    const { result } = renderHook(() => useBrowser());

    await act(async () => {
      await result.current.handleOpenUrl('https://example.com');
    });

    expect(mocks.mockOpenUrl).toHaveBeenCalledWith('https://example.com');
    expect(mockShowToast).toHaveBeenCalledWith({
      message: 'Error opening URL',
      type: 'error'
    });
  });
});
