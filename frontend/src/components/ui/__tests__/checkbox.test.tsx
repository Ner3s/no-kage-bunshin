import { describe, it, expect } from 'vitest';

import { Checkbox } from '../checkbox';

import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';

describe('Checkbox component', () => {
  it('renders correctly with default props', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('peer');
  });

  it('renders with label when provided', () => {
    const label = 'Accept terms';
    render(<Checkbox label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('can be checked and unchecked', async () => {
    const { user } = render(<Checkbox label="Check me" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('applies custom class names', () => {
    render(
      <Checkbox
        className="custom-class"
        labelClassName="label-class"
        label="Custom Class"
      />
    );

    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
    expect(screen.getByText('Custom Class')).toHaveClass('label-class');
  });

  it('renders with circle shape when specified', () => {
    render(<Checkbox shape="circle" />);

    expect(screen.getByRole('checkbox')).toHaveClass('rounded-full');
    expect(screen.getByRole('checkbox')).not.toHaveClass('rounded');
  });

  it('supports disabled state', () => {
    render(<Checkbox disabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('passes additional props to the input element', () => {
    render(
      <Checkbox data-testid="custom-checkbox" aria-label="Special checkbox" />
    );

    const checkbox = screen.getByTestId('custom-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-label', 'Special checkbox');
  });
});
