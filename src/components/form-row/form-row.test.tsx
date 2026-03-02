import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/form-row/form-row.stories';

const { OneChild, TwoChildren, ThreeChildren } = composeStories(stories);

describe('FormRow. Snapshots', () => {
  it('OneChild', async () => {
    await OneChild.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('TwoChildren', async () => {
    await TwoChildren.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ThreeChildren', async () => {
    await ThreeChildren.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
