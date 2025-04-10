import { describe, it, expect } from 'vitest';

import { CheckboxCustom } from '../checkbox-custom';

import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';

describe('CheckboxCustom component', () => {
  it('renders correctly with default props', () => {
    render(<CheckboxCustom />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('peer');
    expect(checkbox).toHaveClass('hidden');
  });

  it('renders with children', () => {
    render(
      <CheckboxCustom>
        <span data-testid="custom-content">Custom Content</span>
      </CheckboxCustom>
    );

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('can be checked and unchecked', async () => {
    const { user } = render(
      <CheckboxCustom>
        <span>Click me</span>
      </CheckboxCustom>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(screen.getByText('Click me'));
    expect(checkbox).toBeChecked();

    await user.click(screen.getByText('Click me'));
    expect(checkbox).not.toBeChecked();
  });

  it('passes additional props to the input element', () => {
    render(
      <CheckboxCustom
        data-testid="custom-checkbox"
        aria-label="Special checkbox"
      >
        <span>Custom checkbox</span>
      </CheckboxCustom>
    );

    const checkbox = screen.getByTestId('custom-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-label', 'Special checkbox');
  });

  it('generates a unique ID when not provided', () => {
    const { container } = render(<CheckboxCustom />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toMatch(/^checkbox-[a-z0-9]+$/);
  });

  it('uses provided ID when specified', () => {
    render(<CheckboxCustom id="test-checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toBe('test-checkbox');
  });
});
