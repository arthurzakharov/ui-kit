import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-radio/control-radio.stories';

const { OrientationVertical, OrientationHorizontal, ErrorState, ErrorStateWithMessage, SuccessState } =
  composeStories(stories);

describe('ControlRadio. Snapshots', () => {
  it('OrientationVertical', async () => {
    await OrientationVertical.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('OrientationHorizontal', async () => {
    await OrientationHorizontal.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ErrorState', async () => {
    await ErrorState.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ErrorStateWithMessage', async () => {
    await ErrorStateWithMessage.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('SuccessState', async () => {
    await SuccessState.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
