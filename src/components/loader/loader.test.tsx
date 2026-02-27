import { composeStories } from '@storybook/react';
import { cleanup, render, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Loader } from '@components/loader/loader.component';
import { getLoaderSize } from '@components/loader/loader.utils';
import * as stories from '@components/loader/loader.stories';

const { CustomSize, CustomColor, WithPadding, WithBaseBehavior } = composeStories(stories);

afterEach(() => {
  cleanup();
});

const SIZE_TO_PIXELS = [
  { size: 'xxs', pixels: '16' },
  { size: 'xs', pixels: '24' },
  { size: 'sm', pixels: '32' },
  { size: 'md', pixels: '40' },
  { size: 'lg', pixels: '48' },
  { size: 'xl', pixels: '56' },
  { size: 'xxl', pixels: '64' },
  { size: 'xxxl', pixels: '72' },
] as const;

describe('Loader. Snapshots', () => {
  it('CustomSize ', async () => {
    await CustomSize.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('CustomColor ', async () => {
    await CustomColor.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithPadding ', async () => {
    await WithPadding.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithBaseBehavior ', async () => {
    await WithBaseBehavior.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});

describe('Loader. Size mapping', () => {
  it.each(SIZE_TO_PIXELS)('getLoaderSize maps $size to $pixels px', ({ size, pixels }) => {
    expect(getLoaderSize(size)).toBe(Number(pixels));
  });

  it.each(SIZE_TO_PIXELS)('maps $size to $pixels px', ({ size, pixels }) => {
    const { container } = render(<Loader color="accent-primary" size={size} />);

    const icon = within(container).getByTestId('loader-icon');

    expect(icon.getAttribute('width')).toBe(pixels);
    expect(icon.getAttribute('height')).toBe(pixels);
  });
});
