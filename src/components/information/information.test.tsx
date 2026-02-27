import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/information/information.stories';

const { Default, WithCustomClassName } = composeStories(stories);

describe('Information. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithCustomClassName', async () => {
    await WithCustomClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
