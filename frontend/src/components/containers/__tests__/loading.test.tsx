import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { BaseViewProps } from '../base-view';
import { Loading } from '../loading';

import { render, screen, waitFor } from '@/test/test-utils';

// Mock the dependencies
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock('@/components/containers/base-view', () => ({
  BaseView: ({ children, title, subtitle, Icon }: BaseViewProps) => (
    <div data-testid="base-view">
      <div data-testid="title">{title}</div>
      <div data-testid="subtitle">{subtitle}</div>
      <div data-testid="icon">{Icon}</div>
      <div data-testid="content">{children}</div>
    </div>
  )
}));

vi.mock('@/components/ui/progress-bar', () => ({
  ProgressBar: () => <div data-testid="progress-bar">Progress Bar</div>
}));

const mockLoading = {
  title: 'title',
  subtitle: 'subtitle',
  goTo: '/destination'
};

describe('Loading component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders with correct props', () => {
    const title = 'Loading Title';
    const subtitle = 'Loading Subtitle';

    render(
      <Loading
        isLoading={true}
        goTo="/destination"
        title={title}
        subtitle={subtitle}
      />
    );

    expect(screen.getByTestId('base-view')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent(title);
    expect(screen.getByTestId('subtitle')).toHaveTextContent(subtitle);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('rotates through icons', async () => {
    const { rerender } = render(<Loading {...mockLoading} isLoading={true} />);

    const initialIcon = screen.getByTestId('icon').innerHTML;

    // Advance timers to trigger icon change
    vi.advanceTimersByTime(1000);
    rerender(<Loading {...mockLoading} isLoading={true} />);

    const newIcon = screen.getByTestId('icon').innerHTML;
    expect(newIcon).not.toBe(initialIcon);
  });

  it('navigates to the specified route when loading completes', async () => {
    const destination = '/destination';

    render(<Loading {...mockLoading} isLoading={false} goTo={destination} />);

    // Advance time to trigger navigation
    vi.advanceTimersByTime(1000);

    expect(mockNavigate).toHaveBeenCalledWith(destination);
  });

  it('does not navigate if still loading', () => {
    render(<Loading {...mockLoading} isLoading={true} goTo="/destination" />);

    // Advance time that would normally trigger navigation
    vi.advanceTimersByTime(1000);

    // Should not navigate while loading is true
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate if goTo is empty', () => {
    render(<Loading {...mockLoading} isLoading={false} goTo="" />);

    // Advance time that would normally trigger navigation
    vi.advanceTimersByTime(1000);

    // Should not navigate if goTo is empty
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('cleans up interval timers on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const { unmount } = render(<Loading {...mockLoading} isLoading={true} />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(2); // Two intervals: navigation and icon rotation
  });
});
