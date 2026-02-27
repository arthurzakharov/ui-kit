import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-dropdown/control-dropdown.stories';

const { Default } = composeStories(stories);

describe('ControlDropdown. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
