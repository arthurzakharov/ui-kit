import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@components/message/message.stories';

const { Success, Question, Error, Info, WithBaseBehavior } = composeStories(stories);

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

  it('WithBaseBehavior ', async () => {
    await WithBaseBehavior.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
