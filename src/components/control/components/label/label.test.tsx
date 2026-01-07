import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/label/label.stories';

const { Default, PositionIdle, PositionActive, StateIdle, StateError, StateSuccess } = composeStories(stories);

describe('Button Snapshot', () => {
  it('Default', async () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });

  it('PositionIdle', async () => {
    const { container } = render(<PositionIdle />);
    expect(container).toMatchSnapshot();
  });

  it('PositionActive', async () => {
    const { container } = render(<PositionActive />);
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
});
