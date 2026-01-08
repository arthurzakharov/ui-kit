import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/card-image/card-image.stories';

const { DefaultValues, Radio, Checkbox } = composeStories(stories);

describe('CardImage Snapshot', () => {
  it('DefaultValues', async () => {
    const { container } = render(<DefaultValues />);
    expect(container).toMatchSnapshot();
  });

  it('Radio', async () => {
    const { container } = render(<Radio />);
    expect(container).toMatchSnapshot();
  });

  it('Checkbox', async () => {
    const { container } = render(<Checkbox />);
    expect(container).toMatchSnapshot();
  });
});
