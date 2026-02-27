import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/dialog-article/dialog-article.stories';

const { Default, OnlyConfirm, OnlyCancel, WithoutButtons, WithBaseBehavior } = composeStories(stories);

describe('DialogArticle', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('OnlyConfirm', async () => {
    await OnlyConfirm.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('OnlyCancel', async () => {
    await OnlyCancel.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithoutButtons', async () => {
    await WithoutButtons.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithBaseBehavior', async () => {
    await WithBaseBehavior.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
