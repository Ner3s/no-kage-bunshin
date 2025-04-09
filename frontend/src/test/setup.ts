import '@testing-library/jest-dom';
import { afterEach, afterAll, beforeAll, vi } from 'vitest';

import { cleanup } from '@testing-library/react';

// Mock the wailsjs runtime functions
vi.mock('../../../../wailsjs/runtime/runtime', () => ({
  BrowserOpenURL: vi.fn()
}));

// Limpar o DOM após cada teste
afterEach(() => {
  cleanup();
});

// Global test setup
beforeAll(() => {
  // Add any global setup here
});

afterAll(() => {
  // Add any global cleanup here
});
