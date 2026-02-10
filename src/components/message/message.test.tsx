import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from './message.stories';

const { Success, Question, Error, Info, WithAdditionalClassName } = composeStories(stories);

describe('Message. Snapshots', () => {
  it('Success ', async () => {
    await Success.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Question ', async () => {
    await Question.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Error ', async () => {
    await Error.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('Info ', async () => {
    await Info.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('WithAdditionalClassName ', async () => {
    await WithAdditionalClassName.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
