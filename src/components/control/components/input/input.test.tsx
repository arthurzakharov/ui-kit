import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/input/input.stories';

const { Default, AllKeysPassed, Disabled, Password, Autofill } = composeStories(stories);

describe('Input Snapshot', () => {
  it('Default', async () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });

  it('AllKeysPassed', async () => {
    const { container } = render(<AllKeysPassed />);
    expect(container).toMatchSnapshot();
  });

  it('Disabled', async () => {
    const { container } = render(<Disabled />);
    expect(container).toMatchSnapshot();
  });

  it('Password', async () => {
    const { container } = render(<Password />);
    expect(container).toMatchSnapshot();
  });

  it('Autofill', async () => {
    const { container } = render(<Autofill />);
    expect(container).toMatchSnapshot();
  });
});
