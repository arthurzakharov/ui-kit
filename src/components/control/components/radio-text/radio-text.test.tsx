import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/radio-text/radio-text.stories';

const { DefaultValues, SizeMedium, SizeLarge, Checked, OneLine, WithHtmlContent } = composeStories(stories);

describe('RadioText Snapshot', () => {
  it('DefaultValues', async () => {
    const { container } = render(<DefaultValues />);
    expect(container).toMatchSnapshot();
  });

  it('SizeMedium', async () => {
    const { container } = render(<SizeMedium />);
    expect(container).toMatchSnapshot();
  });

  it('SizeLarge', async () => {
    const { container } = render(<SizeLarge />);
    expect(container).toMatchSnapshot();
  });

  it('Checked', async () => {
    const { container } = render(<Checked />);
    expect(container).toMatchSnapshot();
  });

  it('OneLine', async () => {
    const { container } = render(<OneLine />);
    expect(container).toMatchSnapshot();
  });

  it('WithHtmlContent', async () => {
    const { container } = render(<WithHtmlContent />);
    expect(container).toMatchSnapshot();
  });
});
