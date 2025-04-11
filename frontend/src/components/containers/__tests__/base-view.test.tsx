import { describe, it, expect } from 'vitest';

import { BaseView } from '../base-view';

import { render, screen } from '@/test/test-utils';

describe('BaseView component', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    children: <div data-testid="test-children">Test Children</div>
  };

  it('renders with title and subtitle', () => {
    render(<BaseView {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<BaseView {...defaultProps} />);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('renders with an icon when provided', () => {
    const icon = <svg data-testid="test-icon" />;
    render(<BaseView {...defaultProps} Icon={icon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies normal text style by default', () => {
    render(<BaseView {...defaultProps} />);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveClass('text-2xl');
  });

  it('applies large text style when specified', () => {
    render(<BaseView {...defaultProps} text="large" />);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveClass('text-4xl');
  });
});
