import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as Stories from '@controls/control-radio-label/control-radio-label.stories';

const { RadioIdle, RadioError, RadioSuccess, CheckboxIdle, CheckboxError, CheckboxSuccess } = composeStories(Stories);

describe('ControlRadioLabel. Snapshots', () => {
  it('RadioIdle', async () => {
    await RadioIdle.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('RadioError', async () => {
    await RadioError.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('RadioSuccess', async () => {
    await RadioSuccess.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('CheckboxIdle', async () => {
    await CheckboxIdle.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('CheckboxError', async () => {
    await CheckboxError.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('CheckboxSuccess', async () => {
    await CheckboxSuccess.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
