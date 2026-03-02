import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/sidebar/sidebar.stories';

const { Default, WithUserPanel, WithActionArea, WithBaseBehavior } = composeStories(stories);

describe('Sidebar. Snapshots', () => {
  it('Default ', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithUserPanel ', async () => {
    await WithUserPanel.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithActionArea ', async () => {
    await WithActionArea.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithBaseBehavior ', async () => {
    await WithBaseBehavior.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
