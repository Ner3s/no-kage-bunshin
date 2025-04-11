import React, { ReactNode } from 'react';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { LoadingTemplate } from '@/components/containers/loading';

import { LoadingClones } from '../loading-clones';

import { render, screen } from '@/test/test-utils';
import { RoutePaths } from '@/utils/constants/route-paths';

// Criamos uma variável de controle para o mock
let mockIsLoading = true;

// Mock do context completo incluindo o FileProvider
vi.mock('@/context/use-file', () => {
  const FileProvider = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
  };

  return {
    useFile: () => ({
      isLoading: mockIsLoading
    }),
    FileProvider
  };
});

// Mock do componente Loading
vi.mock('@/components/containers/loading', () => ({
  Loading: ({ isLoading, title, subtitle, goTo }: LoadingTemplate) => (
    <div data-testid="loading-component">
      <div>Loading: {isLoading ? 'true' : 'false'}</div>
      <div data-testid="title">{title}</div>
      <div data-testid="subtitle">{subtitle}</div>
      <div data-testid="goto">{goTo}</div>
    </div>
  )
}));

describe('LoadingClones component', () => {
  beforeEach(() => {
    // Definimos o valor padrão antes de cada teste
    mockIsLoading = true;
  });

  it('renders the Loading component with correct props', () => {
    render(<LoadingClones />);

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
    expect(screen.getByText('Loading: true')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent(
      'Scanning for duplicates'
    );
    expect(screen.getByTestId('subtitle')).toHaveTextContent(
      'This may take a few moments...'
    );
    expect(screen.getByTestId('goto')).toHaveTextContent(RoutePaths.CLONES);
  });

  it('passes the isLoading state from useFile to Loading component', () => {
    // Alteramos o mock para retornar isLoading como false
    mockIsLoading = false;

    render(<LoadingClones />);

    expect(screen.getByText('Loading: false')).toBeInTheDocument();
  });
});
