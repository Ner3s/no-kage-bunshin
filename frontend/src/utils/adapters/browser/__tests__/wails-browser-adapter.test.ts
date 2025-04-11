import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BrowserOpenURL } from '../../../../../wailsjs/runtime/runtime';
import { WailsBrowserAdapter } from '../wails-browser-adapter';

// Mock the Wails runtime
vi.mock('../../../../../wailsjs/runtime/runtime', () => ({
  BrowserOpenURL: vi.fn()
}));

describe('WailsBrowserAdapter', () => {
  const mockUrl = 'https://example.com';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call BrowserOpenURL with the provided URL', async () => {
    await WailsBrowserAdapter.openUrl(mockUrl);
    expect(BrowserOpenURL).toHaveBeenCalledWith(mockUrl);
    expect(BrowserOpenURL).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when BrowserOpenURL fails', async () => {
    const expectedError = new Error('Failed to open URL');
    vi.mocked(BrowserOpenURL).mockImplementationOnce(() => {
      throw expectedError;
    });

    await expect(WailsBrowserAdapter.openUrl(mockUrl)).rejects.toThrow(
      expectedError
    );
  });
});
