import { describe, it, expect, vi } from 'vitest';

import { Toast } from '../toast';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Toast component', () => {
  it('renders correctly with message and button', () => {
    const hideToast = vi.fn();
    render(
      <Toast
        type="success"
        message="Test message 1"
        hideToast={hideToast}
        isVisible={true}
      />
    );

    expect(screen.getByText('Test message 1')).toBeInTheDocument();
    expect(screen.getByTestId('close-toast')).toBeInTheDocument();
  });

  it('renders with default message when no message is provided', () => {
    const hideToast = vi.fn();
    render(<Toast type="success" hideToast={hideToast} isVisible={true} />);

    expect(
      screen.getByText('Operation completed successfully.')
    ).toBeInTheDocument();
  });

  it('renders with error type and its default message', () => {
    const hideToast = vi.fn();
    render(<Toast type="error" hideToast={hideToast} isVisible={true} />);

    expect(
      screen.getByText('An error occurred. Please try again.')
    ).toBeInTheDocument();
  });

  it('renders with warning type and its default message', () => {
    const hideToast = vi.fn();
    render(<Toast type="warning" hideToast={hideToast} isVisible={true} />);

    expect(
      screen.getByText('Warning: Please check your input.')
    ).toBeInTheDocument();
  });

  it('is not visible when isVisible is false', () => {
    const hideToast = vi.fn();
    const { container } = render(
      <Toast
        type="success"
        message="Test message"
        hideToast={hideToast}
        isVisible={false}
      />
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('hidden');
  });

  it('calls hideToast when close button is clicked', async () => {
    const hideToast = vi.fn();
    const user = userEvent.setup();

    render(
      <Toast
        type="success"
        message="Test message"
        hideToast={hideToast}
        isVisible={true}
      />
    );

    const closeButton = screen.getByTestId('close-toast');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(hideToast).toHaveBeenCalledTimes(1);
  });
});
