import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as Stories from '@controls/control-label/control-label.stories';

const { Default } = composeStories(Stories);

describe('ControlLabel. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
