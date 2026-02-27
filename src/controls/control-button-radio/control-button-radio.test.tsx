import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-button-radio/control-button-radio.stories';

const { Default } = composeStories(stories);

describe('ControlButtonRadio. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
