import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@utils/content/content.stories';
import { Content } from '@utils/content/content.component';

const { HtmlString, PlainString, ReactNode, EmptyStringAlwaysRender, EmptyString } = composeStories(stories);

describe('Content. Snapshots', () => {
  it('HtmlString ', async () => {
    await HtmlString.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('PlainString ', async () => {
    await PlainString.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('ReactNode ', async () => {
    await ReactNode.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('EmptyStringAlwaysRender ', async () => {
    await EmptyStringAlwaysRender.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });

  it('EmptyString ', async () => {
    await EmptyString.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});

describe('Content', () => {
  it('returns null when no children', () => {
    const { container } = render(<Content />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when children is an empty string', () => {
    const { container } = render(<Content children="" />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when children is false', () => {
    const { container } = render(<Content children={false} />);
    expect(container.firstChild).toBeNull();
  });
});
