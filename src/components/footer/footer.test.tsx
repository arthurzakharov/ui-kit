import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from './footer.stories';

const { Default, WithAdditionalClassName } = composeStories(stories);

describe('Footer. Snapshots', () => {
  it('Default ', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithAdditionalClassName ', async () => {
    await WithAdditionalClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
