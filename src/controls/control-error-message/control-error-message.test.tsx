import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as Stories from '@controls/control-error-message/control-error-message.stories';

const { Default } = composeStories(Stories);

describe('ControlErrorMessage. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
