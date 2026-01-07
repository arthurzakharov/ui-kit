import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/hidden-input/hidden-input.stories';

const { Default, Radio, Checkbox, Checked, NotChecked, Disabled } = composeStories(stories);

describe('HiddenInput Snapshot', () => {
  it('Default', async () => {
    const { container } = render(<Default />);
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

  it('Checked', async () => {
    const { container } = render(<Checked />);
    expect(container).toMatchSnapshot();
  });

  it('NotChecked', async () => {
    const { container } = render(<NotChecked />);
    expect(container).toMatchSnapshot();
  });

  it('Disabled', async () => {
    const { container } = render(<Disabled />);
    expect(container).toMatchSnapshot();
  });
});
