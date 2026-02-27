import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-checkbox/control-checkbox.stories';

const { Default, StateIdle, StateSuccess, StateError, StateErrorWithMessage } = composeStories(stories);

describe('ControlCheckbox. Snapshots', () => {
  it('Default', async () => {
    await Default.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('StateIdle', async () => {
    await StateIdle.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('StateSuccess', async () => {
    await StateSuccess.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('StateError', async () => {
    await StateError.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('StateErrorWithMessage', async () => {
    await StateErrorWithMessage.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
