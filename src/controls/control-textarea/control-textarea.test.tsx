import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as Stories from '@controls/control-textarea/control-textarea.stories';

const { Default } = composeStories(Stories);

describe('ControlTextarea. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
