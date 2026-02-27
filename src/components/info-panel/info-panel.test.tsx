import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/info-panel/info-panel.stories';

const { Default, WithBaseBehavior } = composeStories(stories);

describe('InfoPanel. Snapshots', () => {
  it('Default ', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithBaseBehavior ', async () => {
    await WithBaseBehavior.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
