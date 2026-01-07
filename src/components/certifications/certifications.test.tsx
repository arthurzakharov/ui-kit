import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/certifications/certifications.stories';

const { Default, CustomOrder } = composeStories(stories);

describe('Button Snapshot', () => {
  it('Default', async () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });

  it('CustomOrder', async () => {
    const { container } = render(<CustomOrder />);
    expect(container).toMatchSnapshot();
  });
});
