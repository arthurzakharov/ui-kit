import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/card-text/card-text.stories';

const { DefaultValues, Radio, Checkbox } = composeStories(stories);

describe('CardText Snapshot', () => {
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
