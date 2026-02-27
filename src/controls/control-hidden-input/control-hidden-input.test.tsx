import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-hidden-input/control-hidden-input.stories';

const { Default } = composeStories(stories);

describe('ControlHiddenInput. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
