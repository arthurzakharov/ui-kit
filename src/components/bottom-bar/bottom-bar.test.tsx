import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/bottom-bar/bottom-bar.stories';

const { WithoutMessage, WithMessage } = composeStories(stories);

describe('BottomBar. Snapshots', () => {
  it('WithoutMessage ', async () => {
    await WithoutMessage.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithMessage ', async () => {
    await WithMessage.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
