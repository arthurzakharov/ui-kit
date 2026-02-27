import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/certifications/certifications.stories';

const { Default, WithBaseBehavior } = composeStories(stories);

describe('Certifications. Snapshots', () => {
  it('Default ', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithBaseBehavior ', async () => {
    await WithBaseBehavior.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
