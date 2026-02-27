import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as Stories from '@controls/control-status/control-status.stories';

const { Default } = composeStories(Stories);

describe('ControlStatus. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
