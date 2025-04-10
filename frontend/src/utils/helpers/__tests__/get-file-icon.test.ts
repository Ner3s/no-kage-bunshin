import { describe, it, expect, vi } from 'vitest';
import { File } from 'lucide-react';

import { getFileIcon } from '../get-file-icon';
import { FileIconMap, COLORS } from '@/utils/constants/file-icons';

describe('getFileIcon utility', () => {
  it('returns the correct icon for known file extensions', () => {
    // Test a few known extensions
    expect(getFileIcon('.jpg')).toBe(FileIconMap['.jpg']);
    expect(getFileIcon('.mp3')).toBe(FileIconMap['.mp3']);
    expect(getFileIcon('.mp4')).toBe(FileIconMap['.mp4']);
    expect(getFileIcon('.pdf')).toBe(FileIconMap['.pdf']);
    expect(getFileIcon('.zip')).toBe(FileIconMap['.zip']);
  });

  it('handles uppercase extensions by converting to lowercase', () => {
    expect(getFileIcon('.JPG')).toBe(FileIconMap['.jpg']);
    expect(getFileIcon('.PDF')).toBe(FileIconMap['.pdf']);
  });

  it('returns default icon for unknown file extensions', () => {
    const defaultIcon = getFileIcon('.unknown');

    expect(defaultIcon.Component).toBe(File);
    expect(defaultIcon.color).toBe(COLORS.GRAY);
  });

  it('returns default icon for empty extension', () => {
    const defaultIcon = getFileIcon('');

    expect(defaultIcon.Component).toBe(File);
    expect(defaultIcon.color).toBe(COLORS.GRAY);
  });
});
