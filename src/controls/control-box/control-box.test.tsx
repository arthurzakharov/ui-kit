import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-box/control-box.stories';

const { Idle, Error, Success, Focused, Checked } = composeStories(stories);

describe('ControlBox. Snapshots', () => {
  it('Idle', async () => {
    await Idle.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Error', async () => {
    await Error.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Success', async () => {
    await Success.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Focused', async () => {
    await Focused.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Checked', async () => {
    await Checked.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
