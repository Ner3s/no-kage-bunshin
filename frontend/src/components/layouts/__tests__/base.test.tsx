import { ReactNode } from 'react';

import { describe, it, expect, vi } from 'vitest';

import { Base } from '../base';

import { render, screen } from '@/test/test-utils';

const mocks = vi.hoisted(() => ({
  handleOpenUrl: vi.fn()
}));

// Mock dependencies
vi.mock('@/hooks/use-browser', () => ({
  useBrowser: () => ({
    handleOpenUrl: mocks.handleOpenUrl
  })
}));

// Incluindo o FileProvider no mock
vi.mock('@/context/use-file', () => {
  const FileProvider = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  return {
    useFile: () => ({
      onSelectDirectory: vi.fn(),
      isLoading: false,
      folderSelected: '/test/folder',
      selectedClonesToRemove: [],
      onDeleteClones: vi.fn()
    }),
    FileProvider
  };
});

// Mock react-router's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Outlet: () => <div data-testid="outlet-content">Outlet Content</div>
  };
});

describe('Base layout component', () => {
  it('renders correctly with header and footer', () => {
    render(<Base />);

    // Check that header is present
    expect(screen.getByText('No Kage Bunshin')).toBeInTheDocument();
    expect(screen.getByText('Select Folder')).toBeInTheDocument();

    // Check that outlet is rendered
    expect(screen.getByTestId('outlet-content')).toBeInTheDocument();

    // Check that footer is present
    expect(screen.getByText('Develop by @AlanNer3s')).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', async () => {
    const { user } = render(<Base />);

    await user.click(screen.getByText('No Kage Bunshin'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to loading clones page when select folder button is clicked', async () => {
    const { user } = render(<Base />);

    await user.click(screen.getByText('Select Folder'));
    expect(mockNavigate).toHaveBeenCalledWith('/loading-clones');
  });

  it('displays social links in footer', () => {
    render(<Base />);

    const socialLinks = [
      screen.getAllByTestId('linkedin'),
      screen.getAllByTestId('github')
    ];

    expect(socialLinks).toHaveLength(2);
  });
});
