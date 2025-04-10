import { describe, expect, it, vi } from 'vitest';

import { Footer } from '../footer';

import { render, screen } from '@/test/test-utils';

const handleOpenUrl = vi.fn();

describe('Footer', () => {
  it('should render the footer', () => {
    render(<Footer handleOpenUrl={handleOpenUrl} />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });
  // it('should click on footer links', () => {
  //   render(<Footer handleOpenUrl={handleOpenUrl} />);

  //   const footer = screen.getByTestId('footer');

  //   expect(footer).toBeInTheDocument();
  // });
  it('should click in footer links', async () => {
    const { user } = render(<Footer handleOpenUrl={handleOpenUrl} />);

    const socialLinks = [
      screen.getAllByTestId('linkedin'),
      screen.getAllByTestId('github')
    ];

    await user.click(socialLinks[0][0]);
    await user.click(socialLinks[1][0]);

    expect(socialLinks).toHaveLength(2);
    expect(handleOpenUrl).toHaveBeenCalledTimes(2);
  });
});
