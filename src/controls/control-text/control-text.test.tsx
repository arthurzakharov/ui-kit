import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-text/control-text.stories';

const { Default, WithError } = composeStories(stories);

describe('ControlText. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithError', async () => {
    await WithError.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
