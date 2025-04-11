import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ProgressBar } from '../progress-bar';

import { render, screen } from '@/test/test-utils';
import { act } from '@testing-library/react';

describe('ProgressBar component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders correctly with initial progress at 0%', () => {
    const { container } = render(<ProgressBar />);

    const progressBar = container.querySelector('.bg-orange-400');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle('width: 0%');
  });

  it('increases progress over time', () => {
    const { container } = render(<ProgressBar />);

    let progressBar = container.querySelector('.bg-orange-400');
    expect(progressBar).toHaveStyle('width: 0%');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    progressBar = container.querySelector('.bg-orange-400');
    expect(progressBar).toHaveStyle('width: 1%');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    progressBar = container.querySelector('.bg-orange-400');
    expect(progressBar).toHaveStyle('width: 6%');
  });

  it('resets to 0% after reaching 100%', () => {
    const { container } = render(<ProgressBar />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    const progressBar = container.querySelector('.bg-orange-400');
    expect(progressBar).toHaveStyle('width: 100%');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    const progressBarAfterReset = container.querySelector('.bg-orange-400');
    expect(progressBarAfterReset).toHaveStyle('width: 0%');
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const { unmount } = render(<ProgressBar />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
