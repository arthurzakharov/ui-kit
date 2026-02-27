import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-input/control-input.stories';

const { Default, DateMask } = composeStories(stories);

describe('ControlInput. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('DateMask', async () => {
    await DateMask.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
