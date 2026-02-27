import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-button/control-button.stories';

const { Default, WithBlurAfterClick, WithInfo, FullWidth, Disabled, Loading, WithCustomClassName } =
  composeStories(stories);

describe('ControlButton. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithBlurAfterClick', async () => {
    await WithBlurAfterClick.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithInfo', async () => {
    await WithInfo.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('FullWidth', async () => {
    await FullWidth.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Disabled', async () => {
    await Disabled.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Loading', async () => {
    await Loading.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithCustomClassName', async () => {
    await WithCustomClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
