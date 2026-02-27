import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@controls/control-choice/control-choice.stories';

const { TypeRadioUnchecked, TypeRadioChecked, TypeCheckboxUnchecked, TypeCheckboxChecked, WithCustomClassName } =
  composeStories(stories);

describe('ControlChoice. Snapshots', () => {
  it('TypeRadioUnchecked', async () => {
    await TypeRadioUnchecked.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('TypeRadioChecked', async () => {
    await TypeRadioChecked.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('TypeCheckboxUnchecked', async () => {
    await TypeCheckboxUnchecked.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('TypeCheckboxChecked', async () => {
    await TypeCheckboxChecked.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithCustomClassName', async () => {
    await WithCustomClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
