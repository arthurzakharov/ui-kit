import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/loader/loader.stories';

const {
  ColorPrimary,
  ColorWhite,
  ColorSecondary,
  SizeXXS,
  SizeXS,
  SizeSM,
  SizeMD,
  SizeLG,
  SizeXL,
  SizeXXL,
  SizeXXXL,
  PaddingXXS,
  PaddingXS,
  PaddingSM,
  PaddingMD,
  PaddingLG,
  PaddingXL,
  PaddingXXL,
  PaddingXXXL,
  WithAdditionalClassName,
} = composeStories(stories);

describe('Loader. Snapshots', () => {
  it('ColorPrimary ', async () => {
    await ColorPrimary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ColorWhite ', async () => {
    await ColorWhite.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ColorSecondary ', async () => {
    await ColorSecondary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeXXS ', async () => {
    await SizeXXS.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeXS', async () => {
    await SizeXS.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeSM ', async () => {
    await SizeSM.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeMD ', async () => {
    await SizeMD.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeLG ', async () => {
    await SizeLG.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeXL ', async () => {
    await SizeXL.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeXXL ', async () => {
    await SizeXXL.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SizeXXXL ', async () => {
    await SizeXXXL.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingXXS ', async () => {
    await PaddingXXS.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingXS ', async () => {
    await PaddingXS.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingSM ', async () => {
    await PaddingSM.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingMD ', async () => {
    await PaddingMD.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingLG ', async () => {
    await PaddingLG.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingXL ', async () => {
    await PaddingXL.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingXXL ', async () => {
    await PaddingXXL.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PaddingXXXL ', async () => {
    await PaddingXXXL.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithAdditionalClassName ', async () => {
    await WithAdditionalClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
