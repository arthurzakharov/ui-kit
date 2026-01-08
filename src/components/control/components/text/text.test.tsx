import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/text/text.stories';

const { DefaultValues, WithoutValue, Enabled, Disabled, StateIdle, StateError, StateSuccess, Interactive } =
  composeStories(stories);

describe('Text Snapshot', () => {
  it('DefaultValues', async () => {
    const { container } = render(<DefaultValues />);
    expect(container).toMatchSnapshot();
  });

  it('WithoutValue', async () => {
    const { container } = render(<WithoutValue />);
    expect(container).toMatchSnapshot();
  });

  it('Enabled', async () => {
    const { container } = render(<Enabled />);
    expect(container).toMatchSnapshot();
  });

  it('Disabled', async () => {
    const { container } = render(<Disabled />);
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

  it('Interactive', async () => {
    const { container } = render(<Interactive />);
    expect(container).toMatchSnapshot();
  });
});
