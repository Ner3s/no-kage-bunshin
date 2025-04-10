import { ReactNode } from 'react';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ToastProvider, useToast } from '../use-toast';

import { renderHook, act } from '@testing-library/react';

vi.mock('@/components/ui/toast', () => ({
  Toast: ({
    hideToast,
    message,
    type
  }: {
    hideToast: () => void;
    message?: string;
    type: string;
  }) => (
    <div data-testid="mock-toast" data-type={type} data-message={message}>
      <button onClick={hideToast}>Close</button>
    </div>
  ),
  ToastContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="toast-container">{children}</div>
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
    expect(result.current.toasts).toBeDefined();
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  it('shows a toast with provided message and type', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Test toast',
        type: 'success'
      });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].message).toBe('Test toast');
    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[0].isVisible).toBe(true);
  });

  it('supports multiple toasts stacked', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Success message',
        type: 'success'
      });

      result.current.showToast({
        message: 'Error message',
        type: 'error'
      });
    });

    expect(result.current.toasts.length).toBe(2);
    expect(result.current.toasts[0].message).toBe('Success message');
    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[1].message).toBe('Error message');
    expect(result.current.toasts[1].type).toBe('error');
  });

  it('hides toast when hideToast is called', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Test toast',
        type: 'success'
      });
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.hideToast(toastId);
    });

    expect(result.current.toasts[0].isVisible).toBe(false);
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

    expect(result.current.toasts[0].isVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.toasts[0].isVisible).toBe(false);
  });

  it('should throw exception when dont have provider', async () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used within a ToastProvider'
    );
  });

  it('removes toast from array after transition period', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast({
        message: 'Test toast',
        type: 'success'
      });
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.hideToast(toastId);
    });

    expect(result.current.toasts.length).toBe(1); // Still in array but hidden

    act(() => {
      vi.advanceTimersByTime(300); // Animation duration
    });

    expect(result.current.toasts.length).toBe(0); // Removed from array
  });
});
