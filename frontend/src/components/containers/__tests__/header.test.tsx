import { describe, it, expect, vi } from 'vitest';

import { Header } from '../header';

import { render, screen } from '@/test/test-utils';

describe('Header component', () => {
  const defaultProps = {
    onSelectDirectory: vi.fn(),
    goToHome: vi.fn(),
    handleOnDeleteClones: vi.fn(),
    selectedClonesToRemove: []
  };

  it('renders correctly with default props', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText('No Kage Bunshin')).toBeInTheDocument();
    expect(screen.getByText('Select Folder')).toBeInTheDocument();
    expect(screen.getAllByTestId('btn-delete')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
  });

  it('displays selected folder when provided', () => {
    const folderPath = '/path/to/selected/folder';
    render(<Header {...defaultProps} folderSelected={folderPath} />);

    expect(screen.getByText(`📁 ${folderPath}`)).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(<Header {...defaultProps} isLoading={true} />);

    expect(screen.getByText('Scanning...')).toBeInTheDocument();
    expect(screen.queryByText('Select Folder')).not.toBeInTheDocument();
  });

  it('enables delete button when clones are selected', async () => {
    render(
      <Header {...defaultProps} selectedClonesToRemove={['file1', 'file2']} />
    );

    const deleteButton = screen.getAllByTestId('btn-delete')[0];
    expect(deleteButton).not.toBeDisabled();
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onSelectDirectory when select folder button is clicked', async () => {
    const onSelectDirectory = vi.fn();
    const { user } = render(
      <Header {...defaultProps} onSelectDirectory={onSelectDirectory} />
    );

    await user.click(screen.getAllByTestId('btn-select-folder')[0]);
    expect(onSelectDirectory).toHaveBeenCalledTimes(1);
  });

  it('calls goToHome when logo is clicked', async () => {
    const goToHome = vi.fn();
    const { user } = render(<Header {...defaultProps} goToHome={goToHome} />);

    await user.click(screen.getByText('No Kage Bunshin'));
    expect(goToHome).toHaveBeenCalledTimes(1);
  });

  it('calls handleOnDeleteClones when delete button is clicked', async () => {
    const handleOnDeleteClones = vi.fn();
    const { user } = render(
      <Header
        {...defaultProps}
        selectedClonesToRemove={['file1', 'file2']}
        handleOnDeleteClones={handleOnDeleteClones}
      />
    );

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(handleOnDeleteClones).toHaveBeenCalledTimes(1);
  });
});
