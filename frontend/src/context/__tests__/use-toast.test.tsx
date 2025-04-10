import { ReactNode } from 'react';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ToastProps } from '@/components/ui/toast';

import { ToastProvider, useToast } from '../use-toast';

import { renderHook, act } from '@testing-library/react';

vi.mock('@/components/ui/toast', () => ({
  Toast: ({ hideToast, message, type }: ToastProps) => (
    <div data-testid="mock-toast" data-type={type} data-message={message}>
      <button onClick={hideToast}>Close</button>
    </div>
  )
}));

describe('useToast hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  );

  it('provides toast functions and state', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current.showToast).toBeDefined();
    expect(result.current.hideToast).toBeDefined();
    expect(result.current.toastData).toBeDefined();
  });

  it('shows toast with provided message and type', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Test toast',
        type: 'success'
      });
    });

    expect(result.current.toastData.message).toBe('Test toast');
    expect(result.current.toastData.type).toBe('success');
    expect(result.current.toastData.isVisible).toBe(true);
  });

  it('hides toast when hideToast is called', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Test toast',
        type: 'success'
      });
    });

    act(() => {
      result.current.hideToast();
    });

    expect(result.current.toastData.isVisible).toBe(false);
  });

  it('auto-hides toast after duration', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Test toast',
        type: 'success',
        duration: 2000
      });
    });

    expect(result.current.toastData.isVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.toastData.isVisible).toBe(false);
  });
  it('should throw exception when dont have provider', async () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used within a ToastProvider'
    );
  });
});
