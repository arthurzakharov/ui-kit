import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/data-protected-label/data-protected-label.stories';

const { Default } = composeStories(stories);

describe('DataProtectedLabel. Snapshots', () => {
  it('Default ', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
