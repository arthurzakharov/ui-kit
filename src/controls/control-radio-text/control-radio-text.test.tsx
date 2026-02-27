import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-radio-text/control-radio-text.stories';

const {
  SizeBodyExtraSmall,
  SizeBodySmall,
  SizeBody,
  SizeBodyLarge,
  ColorPrimary,
  ColorSecondary,
  ColorAccentPrimary,
  ColorAccentSecondary,
  Checked,
  OneLine,
  WithCustomClassName,
} = composeStories(stories);

describe('ControlRadioText. Snapshots', () => {
  it('SizeBodyExtraSmall', async () => {
    await SizeBodyExtraSmall.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeBodySmall', async () => {
    await SizeBodySmall.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeBody', async () => {
    await SizeBody.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeBodyLarge', async () => {
    await SizeBodyLarge.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ColorPrimary', async () => {
    await ColorPrimary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ColorSecondary', async () => {
    await ColorSecondary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ColorAccentPrimary', async () => {
    await ColorAccentPrimary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ColorAccentSecondary', async () => {
    await ColorAccentSecondary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Checked', async () => {
    await Checked.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('OneLine', async () => {
    await OneLine.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithCustomClassName', async () => {
    await WithCustomClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
