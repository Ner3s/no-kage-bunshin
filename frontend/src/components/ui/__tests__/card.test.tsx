import { describe, it, expect, vi } from 'vitest';

import { Card } from '../card';

import { render, screen } from '@/test/test-utils';

// Mock the dependencies
vi.mock('@/utils/helpers/get-file-icon', () => ({
  getFileIcon: () => ({
    Component: () => <svg data-testid="file-icon" />,
    color: '#123456'
  })
}));

// Mock the entities
const mockOriginal = {
  filename: 'original.jpg',
  path: '/path/to/original.jpg',
  fileExtension: '.jpg',
  size: 1024,
  humanSize: '1 KB',
  lastModified: '2023-01-01'
};

const mockDuplicates = [
  {
    filename: 'duplicate1.jpg',
    path: '/path/to/duplicate1.jpg',
    fileExtension: '.jpg',
    size: 1024,
    humanSize: '1 KB',
    lastModified: '2023-01-02',
    selected: false
  },
  {
    filename: 'duplicate2.jpg',
    path: '/path/to/duplicate2.jpg',
    fileExtension: '.jpg',
    size: 1024,
    humanSize: '1 KB',
    lastModified: '2023-01-03',
    selected: false
  }
];

describe('Card component', () => {
  it('renders the card with original file and duplicates', () => {
    render(
      <Card
        original={mockOriginal}
        duplicate={mockDuplicates}
        hash="test-hash"
        callbackClones={() => {}}
      />
    );

    // Check original file info
    expect(screen.getByText(/original\.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/2 Copies/i)).toBeInTheDocument();
    expect(screen.getByTestId('file-icon')).toBeInTheDocument();

    // Check duplicate files
    expect(screen.getByText('duplicate1.jpg')).toBeInTheDocument();
    expect(screen.getByText('duplicate2.jpg')).toBeInTheDocument();
    expect(screen.getByText('/path/to/duplicate1.jpg')).toBeInTheDocument();
    expect(screen.getByText('/path/to/duplicate2.jpg')).toBeInTheDocument();
    expect(screen.getAllByText('1 KB')).toHaveLength(2);
  });

  it('shows "Copy" for single duplicate', () => {
    render(
      <Card
        original={mockOriginal}
        duplicate={[mockDuplicates[0]]}
        hash="test-hash"
        callbackClones={() => {}}
      />
    );

    expect(screen.getByText(/(1 Copy)/i)).toBeInTheDocument();
  });

  it('calls callbackClones when "Select All" is clicked', async () => {
    const mockCallback = vi.fn();
    const { user } = render(
      <Card
        original={mockOriginal}
        duplicate={mockDuplicates}
        hash="test-hash"
        callbackClones={mockCallback}
      />
    );

    await user.click(screen.getByText('Select All'));

    expect(mockCallback).toHaveBeenCalledWith({
      duplicates: mockDuplicates.map((d) => ({ ...d, selected: true })),
      hash: 'test-hash',
      original: mockOriginal
    });
  });

  it('calls callbackClones when individual duplicate is selected', async () => {
    const mockCallback = vi.fn();
    const { user } = render(
      <Card
        original={mockOriginal}
        duplicate={mockDuplicates}
        hash="test-hash"
        callbackClones={mockCallback}
      />
    );

    // Get the first checkbox (associated with the first duplicate)
    const checkboxes = screen.getAllByRole('checkbox');
    const firstDuplicateCheckbox = checkboxes[1]; // index 0 is "Select All"

    await user.click(firstDuplicateCheckbox);

    expect(mockCallback).toHaveBeenCalledWith({
      duplicates: [{ ...mockDuplicates[0], selected: true }, mockDuplicates[1]],
      hash: 'test-hash',
      original: mockOriginal
    });
  });
});
