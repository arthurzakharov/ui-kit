import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/box/box.stories';

const { Default, Focused, Checked, StateIdle, StateError, StateSuccess, WithCustomClassName } = composeStories(stories);

describe('Box Snapshot', () => {
  it('Default', async () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });

  it('Focused', async () => {
    const { container } = render(<Focused />);
    expect(container).toMatchSnapshot();
  });

  it('Checked', async () => {
    const { container } = render(<Checked />);
    expect(container).toMatchSnapshot();
  });

  it('StateIdle', async () => {
    const { container } = render(<StateIdle />);
    expect(container).toMatchSnapshot();
  });

  it('StateError', async () => {
    const { container } = render(<StateError />);
    expect(container).toMatchSnapshot();
  });

  it('StateSuccess', async () => {
    const { container } = render(<StateSuccess />);
    expect(container).toMatchSnapshot();
  });

  it('WithCustomClassName', async () => {
    const { container } = render(<WithCustomClassName />);
    expect(container).toMatchSnapshot();
  });
});
